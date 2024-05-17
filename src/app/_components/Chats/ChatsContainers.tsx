'use client'
import { api } from "~/trpc/react";
import ChatCard from "./ChatCard";
import NewChatModal from "./NewChatModal";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import { type Conversation } from "@prisma/client";

export default function ChatsContainers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredChats, setFilteredChats] = useState<Conversation[]>([]);
  const { data: chats, isLoading, refetch } = api.chat.getConversations.useQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      void refetch()
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (chats) {
      setFilteredChats(chats.filter((chat) => chat?.participants?.some((participant) => participant?.name?.toLowerCase().includes(searchTerm.toLowerCase()))));
    }
  }, [chats, searchTerm]);

  return (
    <>
      <SearchBar onSearch={setSearchTerm} />
      <div className="flex flex-col justify-start items-center gap-4 w-full">
        <NewChatModal />
        {isLoading ?
          (<progress className="progress progress-primary w-56"></progress>) :
          (filteredChats.length === 0 ? <p>No chats found</p> :
            filteredChats.map((chat) => (
              <ChatCard key={chat.id} chat={chat} />
            ))
          )
        }
      </div>
    </>
  )
}
