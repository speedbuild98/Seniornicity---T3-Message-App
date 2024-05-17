'use client'
import { api } from "~/trpc/react";
import { usePathname } from "next/navigation";
import Message from "./Message";
import ChatInput from "./ChatInput";
import { useEffect } from "react";

export default function ChatConversation() {
  const userId = usePathname().split("/")[2] ?? '';

  const { data: conversation, refetch } = api.chat.createConversation.useQuery({ userId });

  useEffect(() => {
    const interval = setInterval(() => {
      void refetch()
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <>
      <div className="w-full relative py-6 px-4 flex flex-col justify-start items-stretch gap-4 mb-auto pb-[80px]">
        {conversation?.messages.map((message) => (
          <Message key={message.id} message={message} receiverId={userId} />
        ))}
      </div>
      <ChatInput refetch={refetch} />
    </>
  )
}
