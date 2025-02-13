import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Layout from "./Layout/Layout";
import {io} from "socket.io-client"
import { useEffect } from "react";
import ChatPage from "./Pages/ChatPage";
function App() {
  const socket = io('http://localhost:8000')
  useEffect(()=>{
    socket.on('connect',()=>{
      console.log(`you are connected with my web application`)
    })
    socket.on('event1',(e)=>{
      console.log("new message :",e)
    })
    socket.on('event2',(e)=>{
      console.log("new message from:",e)
    });
    return () =>{
      socket.disconnect();
    };
  },[])
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/chat",
          element: <ChatPage/>,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
