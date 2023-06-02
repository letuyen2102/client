import React, { useEffect, useRef, useState } from 'react'
import { UserInfor } from '../../slices/authSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { hideLoader, showLoader } from '../../slices/loaderSlice'
import axios from 'axios'
import { Loader } from '@chatscope/chat-ui-kit-react'
import { Image } from '@chakra-ui/react'
import Chat from '../../components/Chat/Chat'
import { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import ScrollToBottom from "react-scroll-to-bottom";

import styles from './AdminChat.module.css'
export interface MESSAGE {
    room: string,
    author: UserInfor,
    message: string,
    time: string
}
const AdminChat = ({ socket }: { socket: Socket }) => {
    const [count, setCount] = useState<boolean[]>([])
    const [users, setUsers] = useState<UserInfor[]>([])
    const dispatch = useDispatch()
    const handleLoader = useSelector((state: RootState) => state.loader)
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageListUser, setMessageListUser] = useState<MESSAGE[]>([]);
    const currentLoad = useRef(false)
    const [room, setRoom] = useState("")
    const [name, setName] = useState("")
    const [showChat, setShowChat] = useState(false)
    const joinRoom = (rm: string) => {
        socket.emit("join_room", rm)
    }
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {

                room: room,
                author: handleLoginAndCart.user,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_message", messageData);
            setMessageListUser((list) => [...list, messageData]);
            setCurrentMessage("");
            await axios.post('/myway/api/chats/createChat', { room: messageData.room, message: currentMessage, time: messageData.time })
        }
    };
    useEffect(() => {
        const getAllUsers = async () => {
            dispatch(hideLoader())
            const res = await axios.get('/myway/api/users')
            setUsers(res.data.data.users)
            setCount(Array(res.data.data.users.length).fill(false))
            dispatch(showLoader())
        }
        const getChats = async () => {
            const res = await axios.get(`/myway/api/chats/getConversation/${room}`)
            if (res.data.status === 'success') {
                setMessageListUser(res.data.chats)
            }
        }
        if (room) {
            getChats()
        }
        getAllUsers()
    }, [room])
    useEffect(() => {
        if (currentLoad.current === false) {
            socket.on("receive_message", (data) => {
                setMessageListUser((list) => [...list, data]);
            });
        }

        return () => {
            currentLoad.current = true
        }

    }, [socket]);
    return (
        <div style={{ marginTop: '50px' }}>
            {handleLoader.loader && <Loader />}
            <div className='row'>
                <div className='col-lg-3'>
                    <ScrollToBottom className="message-container">

                        <ul>
                            {
                                users && users.length > 0 && users.map((each, idx) => {
                                    return (
                                        <li key={idx} className={styles.chatEach} onClick={event => {
                                            setRoom(each._id)
                                            joinRoom(each._id)
                                            setShowChat(true)
                                            setName(each.name)
                                        }}>
                                            <Image
                                                borderRadius='50%'
                                                boxSize='50px'
                                                src={`${each.photo}`}
                                                alt='Dan Abramov'
                                            />
                                            <p>{each.name}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </ScrollToBottom>
                </div>

                <div className='col-lg-9'>
                    {showChat && <div className="chat-window">
                        <div className="chat-header">
                            <p>Live Chat</p>
                            <p>{name}</p>

                        </div>
                        <div className="chat-body">
                            <ScrollToBottom className="message-container">
                                {messageListUser.map((messageContent, idx) => {
                                    return (
                                        <div
                                            className="message"
                                            id={room !== messageContent.author._id ? "other" : "you"}
                                            key={idx}
                                        >
                                            <div>
                                                <div className="message-content">
                                                    <p>{messageContent.message}</p>
                                                </div>
                                                <div className="message-meta">
                                                    <p id="time">{messageContent.time}</p>
                                                    <p id="author">{messageContent.author.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </ScrollToBottom>
                        </div>
                        <div className="chat-footer">
                            <input
                                type="text"
                                value={currentMessage}
                                placeholder="Hey..."
                                onChange={(event) => {
                                    setCurrentMessage(event.target.value);
                                }}
                                onKeyPress={(event) => {
                                    event.key === "Enter" && sendMessage();
                                }}
                            />
                            <button onClick={sendMessage}>&#9658;</button>
                        </div>
                    </div>}
                </div>
            </div>

        </div>
    )
}

export default AdminChat