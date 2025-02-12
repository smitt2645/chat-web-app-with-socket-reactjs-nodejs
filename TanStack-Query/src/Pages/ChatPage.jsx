import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Box, TextField, IconButton, Typography } from "@mui/material";
import { Send, AttachFile } from "@mui/icons-material";
import { io } from "socket.io-client";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const socket = useMemo(() => io("http://localhost:8000"), []);

  useEffect(() => {
    socket.on("receive-message", ({id,text}) => {
        console.log(data.text)
      setMessages((prevMessages) => [...prevMessages, { id: id, text: text, sender: id }]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = { id: null , text: input, sender: null };
    //   setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit("msg", input);
      setInput("");
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Chat Header */}
      <Box sx={{ p: 2, bgcolor: "primary.main", color: "white", display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar>U</Avatar>
        <Typography variant="h6">Chat with User</Typography>
      </Box>
      
      {/* Chat Body */}
      <Box sx={{ flex: 1, p: 2, overflowY: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
              bgcolor: msg.sender === "me" ? "#DCF8C6" : "#E0E0E0",
              p: 1.5,
              borderRadius: 2,
              maxWidth: "60%",
            }}
          >
            {msg.text}
          </Box>
        ))}
      </Box>
      
      {/* Chat Input */}
      <form onSubmit={handleSend}>
        <Box sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: "#F5F5F5" }}>
          <IconButton>
            <AttachFile />
          </IconButton>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton color="primary" type="submit">
            <Send />
          </IconButton>
        </Box>
      </form>
    </Box>
  );
};

export default ChatPage;
