import "./Messenger.css";
import Header from "../../components/header/Header";
import ChatMenu from "../../components/chatMenu/ChatMenu";
import MessageBox from "../../components/message_box/MessageBox";
import ChatOnligne from "../../components/chatOnligne/ChatOnligne";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { io } from "socket.io-client";
// import axios from "axios";

import publicRequest from "../../axios";

export default function Messenger() {
  const { user } = useContext(AuthContext);
  console.log(user, "from ");

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onligneUsers, setOnligneUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnligneUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await publicRequest.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await publicRequest.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("send message", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await publicRequest.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      <Header />
      <section className="messenger">
        <div className="search_for_friend">
          <input type="text" placeholder="Search Friend..." />
          <div className="chat_menu_wrapper">
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => setCurrentChat(conversation)}
              >
                <ChatMenu conversation={conversation} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <section className="content">
          {currentChat ? (
            <article className="msg_box">
              <ul className="messages">
                {messages.map((message) => (
                  <div ref={scrollRef} key={message._id}>
                    <MessageBox
                      message={message}
                      own={message.sender === user._id}
                    />
                  </div>
                ))}
              </ul>
              <div className="area_send">
                <textarea
                  placeholder="Write Somthing..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="btn_send" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </article>
          ) : (
            <span className="no_conversation">
              Open Conversation to Start a Chat !
            </span>
          )}
        </section>

        <section className="right_messenger">
          <ul className="list_chat_onligne">
            <ChatOnligne
              onligneUsers={onligneUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </ul>
        </section>
      </section>
    </>
  );
}
