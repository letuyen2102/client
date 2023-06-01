import React, { useEffect, useRef, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { Socket } from "socket.io-client";
import './Chat.module.css'
import axios from "axios";
import { UserInfor } from "../../slices/authSlice";
export interface MESSAGE {
    room: string,
    author: UserInfor,
    message: string,
    time: string
}
function Chat({ socket, username, room, setShowChat }: { socket: Socket, username: UserInfor, room: string, setShowChat: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState<MESSAGE[]>([]);
    const currentLoad = useRef(false)
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {

                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
            await axios.post('/myway/api/chats/createChat', { room: messageData.room, message: currentMessage, time: messageData.time })
        }
    };
    useEffect(() => {
        const getChats = async () => {
            const res = await axios.get(`/myway/api/chats/getConversation/${room}`)
            if (res.data.status === 'success') {
                setMessageList(res.data.chats)
            }
        }
        getChats()
    }, [])
    useEffect(() => {
        if (currentLoad.current === false) {
            socket.on("receive_message", (data) => {
                setMessageList((list) => [...list, data]);
            });
        }

        return () => {
            currentLoad.current = true
        }

    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
                <button onClick={() => { setShowChat(false) }}>X</button>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent, idx) => {
                        return (
                            <div
                                className="message"
                                id={username._id === messageContent.author._id ? "other" : "you"}
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
                <button onClick={sendMessage} style={{ backgroundColor: '#fff' }}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;
