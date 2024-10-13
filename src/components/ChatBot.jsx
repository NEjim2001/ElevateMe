import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TextField, Button } from "@mui/material";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import axios from "axios";

const Chatbot = () => {
  const [active, setActive] = useState(false);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatRef = useRef(null);
  const user = useSelector((state) => state.user.uid);

  const toggleChatbot = () => {
    setActive(!active);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage = { sender: "user", text: input };
    const newChatHistory = [...chatHistory, newMessage];

    try {
      const response = await axios.post(
        "https://uta-flask-website.vercel.app/api/chatbot/getReply",
        {
          message: newMessage.text,
        },
        {
          headers: {
            Authorization: user,
          },
        }
      );

      const botMessage = {
        sender: "bot",
        text: response.data,
      };

      setChatHistory([...newChatHistory, botMessage]);
      setInput("");
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className='fixed h-18 flex flex-row bottom-0 items-end right-0 m-8 z-10'>
      <motion.div
        className='rounded-lg bg-white flex flex-col justify-between shadow-lg relative'
        animate={{
          width: active ? 285 : 50,
          height: active ? 455 : 50,
          opacity: active ? 1 : 0,
        }}
        initial={false}
        transition={{ duration: 0.2, delay: active ? 0 : 0.3 }}
      >
        {active && (
          <XMarkIcon
            onClick={toggleChatbot}
            className='absolute top-3 right-3 h-5 w-5 text-gray-500 cursor-pointer p-2 bg-red-600 rounded-full size-10 z-10'
          />
        )}

        {active && (
          <motion.div
            className='flex flex-col justify-between h-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className='p-4 flex-1 overflow-y-auto' ref={chatRef}>
              {chatHistory.length === 0 ? (
                <p className='text-gray-500'>Start a conversation...</p>
              ) : (
                chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-300 text-black self-start"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))
              )}
            </div>

            {/* Chat input */}
            <form
              onSubmit={handleSendMessage}
              className='flex items-center p-2 border-t'
            >
              <TextField
                fullWidth
                variant='outlined'
                size='small'
                placeholder='Type a message...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type='submit' variant='contained' className='ml-2'>
                Send
              </Button>
            </form>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className='absolute flex bg-blue-500 h-12 w-12 rounded-full justify-center items-center shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
        onClick={toggleChatbot}
        whileHover={{ scale: active ? 1 : 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          opacity: active ? 0 : 1,
          pointerEvents: active ? "none" : "auto",
        }}
        initial={false}
        transition={{ duration: active ? 0.3 : 1.3 }}
        s
      >
        <ChatBubbleOvalLeftEllipsisIcon className='h-6 w-6 text-white' />
      </motion.div>
    </div>
  );
};

export default Chatbot;
