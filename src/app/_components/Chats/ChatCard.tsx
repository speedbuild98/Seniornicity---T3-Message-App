import { type Conversation } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { CHATS } from "~/utils/routes";

declare global {
  interface Window {
    deleteChatModal: {
      showModal: () => void;
    };
  }
}

interface ChatCardProps {
  chat: Conversation & {
    messages: { content: string; createdAt: Date }[];
    participants: { id: string; name: string | null; image: string | null }[];
  };
  setSelectedChat: (chat: Conversation) => void;
}

export default function ChatCard({ chat, setSelectedChat }: ChatCardProps) {

  if (!chat.participants[0]) return null

  const handleSelectChat = () => {
    setSelectedChat(chat);
    window.deleteChatModal.showModal()
  }

  return (
    <div className="flex flex-row justify-center items-center w-full gap-4">
      <Link href={`${CHATS}/${chat.participants[0]?.id}`} className="flex justify-between items-center py-2 px-3 w-full max-w-xs rounded-md bg-base-100 transition-all duration-200 ease-in-out hover:scale-105">
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="avatar">
            <div className="w-12 rounded-full bg-primary">
              {chat.participants[0].image ?
                <Image src={chat.participants[0].image} alt={chat.participants[0].name ?? "user image"} layout="responsive" width={48} height={48} />
                : (
                  <div className="flex items-center justify-center w-full h-full text-2xl text-white">
                    {chat.participants[0].name?.charAt(0).toUpperCase() ?? "?"}
                  </div>
                )
              }
            </div>
          </div>
          <div className="flex flex-col items-start justify-start">
            {chat.participants[0].name && <h1 className="text-base font-bold">{chat.participants[0].name.split(" ")[0]}</h1>}
            {chat.messages[0] && <p className="text-xs line-clamp-1 max-w-32">{chat.messages[0].content}</p>}
          </div>
        </div>
        <p className="text-xs">
          {chat.messages[0] && new Date(chat.messages[0].createdAt).toLocaleTimeString()}
        </p>
      </Link>
      <button className="btn btn-error btn-sm text-white"
        onClick={() => handleSelectChat()}
      ><FaTrash /></button>
    </div>
  )
}
