'use client'
import { api } from "~/trpc/react";
import { usePathname } from "next/navigation";
import Message from "./Message";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";
import DeleteMessageModal from "./DeleteMessageModal";
import { type Message as MessageType } from "@prisma/client";

declare global {
  interface Window {
    deleteMessageModal: {
      showModal: () => void;
    };
  }
}

export default function ChatConversation() {
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);
  const userId = usePathname().split("/")[2] ?? '';

  const { data: conversation, refetch } = api.chat.createConversation.useQuery({ userId });

  useEffect(() => {
    const interval = setInterval(() => {
      void refetch()
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight + 112, behavior: "instant" })
  }, [conversation?.messages.length]);

  return (
    <>
      <div className="w-full relative py-6 px-4 flex flex-col justify-start items-stretch gap-4 mb-auto pb-[80px]">
        {conversation?.messages.map((message) => (
          <Message key={message.id} message={message} receiverId={userId} setSelectedMessage={setSelectedMessage} />
        ))}
      </div>
      <ChatInput refetch={refetch} />
      <DeleteMessageModal selectedMessage={selectedMessage} />
    </>
  )
}
