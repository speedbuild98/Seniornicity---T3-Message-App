import Image from "next/image";
import Link from "next/link";
import { CHATS } from "~/utils/routes";

interface ChatCardProps {
  chat: {
    id: number;
    name: string;
    lastMessage: string;
    lastMessageTime: string;
    avatar: string;
  };
}

export default function ChatCard({ chat }: ChatCardProps) {

  const { id, name, lastMessage, lastMessageTime, avatar } = chat;

  return (
    <Link href={`${CHATS}/${id}`} className="flex justify-between items-center py-2 px-3 w-full rounded-md bg-base-100 transition-all duration-200 ease-in-out hover:scale-105">
      <div className="flex flex-row items-center justify-start gap-4">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <Image src={avatar} alt={name} layout="responsive" width={48} height={48} />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-base font-bold">{name}</h1>
          <p className="text-xs">{lastMessage}</p>
        </div>
      </div>
      <p className="text-xs">
        {lastMessageTime}
      </p>
    </Link>
  )
}
