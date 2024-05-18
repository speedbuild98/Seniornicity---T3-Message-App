'use client'
import { api } from "~/trpc/react";
import ChatCard from "./ChatCard";
import NewChatModal from "./NewChatModal";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import { type Conversation } from "@prisma/client";
import DeleteChatModal from "./DeleteChatModal";

export default function ChatsContainers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [filteredChats, setFilteredChats] = useState<(Conversation & {
    messages: { content: string; createdAt: Date }[];
    participants: { id: string; name: string | null; image: string | null }[];
  })[]>([]);

  const { data: chats, isLoading, refetch } = api.chat.getConversations.useQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      void refetch()
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (!chats) return;
    setFilteredChats(chats.filter((chat) => {
      const participant = chat.participants[0];
      return participant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
    }));
  }, [chats, searchTerm]);

  return (
    <>
      <SearchBar onSearch={setSearchTerm} />
      <div className="flex flex-col justify-start items-center gap-4 w-full">
        <DeleteChatModal selectedChat={selectedChat} />
        <NewChatModal />
        {isLoading ?
          (<progress className="progress progress-primary w-56"></progress>) :
          (filteredChats.length === 0 ? <p>No chats found</p> :
            filteredChats.map((chat) => (
              <ChatCard key={chat.id} chat={chat} setSelectedChat={setSelectedChat} />
            ))
          )
        }
      </div>
    </>
  )
}
