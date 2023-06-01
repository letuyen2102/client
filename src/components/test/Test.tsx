import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react"
import React, { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { hideLoader } from "../../slices/loaderSlice";
import { Socket } from "socket.io-client";
import axios from "axios";

interface MESSAGE_DATA {
    senderId: string,
    receiverId: string,
    message: string,
    timestamp: Date
}
const Test123: React.FC<{ socket: Socket, room: string }> = (props) => {
    const handleLoginAndCart = useSelector((state: RootState) => state.auth)
    const handleLoader = useSelector((state: RootState) => state.loader)
    const dispatch = useDispatch()
    const currentRan = useRef(false)
    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState<MESSAGE_DATA[]>([])
    console.log(messageList)
    const sendMessage = async () => {
        const messageData = {
            senderId: handleLoginAndCart.user._id,
            receiverId: '',
            message: message,
            time: new Date(Date.now()).getHours()
                + ":"
                + new Date(Date.now()).getMinutes()
        }
        console.log("hahaahhaha")
        await props.socket.emit("send_message", messageData)
    }
    // useEffect(() => {
    //     const getConversations = async () => {
    //         dispatch(hideLoader())
    //         const res = await axios.get(`/myway/api/chats/messages/${handleLoginAndCart.user._id}/:receiverId`)
    //         dispatch(hideLoader())
    //         setMessageList(res.data.messages)
    //     }
    //     getConversations()
    // }, [props.socket])
    return (
        <div style={{ position: "relative", height: "400px" }}>
            <button onClick={event => {
                sendMessage()
            }}>CLICCKCK</button>
            <MainContainer>
                <ChatContainer>
                    <MessageList>
                        <Message
                            model={{
                                message: "Hello my friend",
                                sentTime: "just now",
                                sender: "Joe",
                                direction: "outgoing",
                                position: 'first'
                            }}
                        />
                        <Message
                            model={{
                                message: "Hello my friend",
                                sentTime: "just now",
                                sender: "Joe",
                                direction: "incoming",
                                position: 'first'
                            }}
                        />

                    </MessageList>
                    <MessageInput placeholder="Type message here" onSubmit={event => { event.preventDefault(); sendMessage() }} />
                </ChatContainer>
            </MainContainer>
        </div>
    );
}

export default Test123