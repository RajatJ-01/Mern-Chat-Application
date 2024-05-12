import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useGetConversations from "./useGetConversations";
import useConversation from "../zustand/useConversation";
const useNewUser = () => {
  const { socket } = useSocketContext();
  // const { conversations, setConversations } = useGetConversations();
  const { conversations, setConversations } = useConversation();

  useEffect(() => {
    socket?.on("newUser", (newUser) => {
      setConversations([...conversations, newUser]);
    });

    return () => socket?.off("newUser");
  }, [socket, conversations, setConversations]);
};

export default useNewUser;
