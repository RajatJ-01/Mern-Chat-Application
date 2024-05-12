import Conversation from "./Conversation";
import { useEffect, useRef } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emoji";
import useNewUser from "../../hooks/useNewUser";
import useConversation from "../../zustand/useConversation";
const Conversations = () => {
  const { loading } = useGetConversations();
  const { conversations } = useConversation();
  useNewUser();
  const lastUserRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastUserRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [conversations]);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <div key={conversation._id} ref={lastUserRef}>
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1}
          />
        </div>
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Conversations;
