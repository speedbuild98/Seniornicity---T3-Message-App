import { type Message } from "@prisma/client";
import Image from "next/image";

interface MessageProps {
  setSelectedMessage: (message: Message) => void;
  receiverId: string;
  message: Message & {
    sender: {
      id: string;
      name: string | null;
      image: string | null;
    };
  };
}

export default function Message({
  setSelectedMessage,
  message,
  receiverId,
}: MessageProps) {
  const messageIsNotMine = message.sender.id !== receiverId;

  const handleSelectMessage = () => {
    if (messageIsNotMine) return;
    setSelectedMessage(message);
    window.deleteMessageModal.showModal()
  }


  return (
    <div className={`chat ${messageIsNotMine ? "chat-start" : "chat-end"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full bg-primary">
          {message.sender.image ?
            <Image src={message.sender.image} alt={message.sender.name ?? "user image"} layout="responsive" width={48} height={48} />
            : (
              <div className="flex items-center justify-center w-full h-full text-2xl text-white">
                {message.sender?.name?.charAt(0).toUpperCase() ?? "?"}
              </div>
            )
          }
        </div>
      </div>
      <div className="chat-header">
        {message.sender?.name?.split(" ")[0]}
        <time className="text-xs opacity-50 ml-2">
          {new Date(message.createdAt).toLocaleTimeString()}
        </time>
      </div>
      {messageIsNotMine ?
        (
          <div className={`chat-bubble pl-2 ${!messageIsNotMine && "cursor-pointer"}`} onClick={handleSelectMessage}>
            {message.content}
          </div>
        ) : (
          <div className="tooltip tooltip-top tooltip-warning" data-tip="Delete 🗑️">
            <div className={`chat-bubble pl-2 ${!messageIsNotMine && "cursor-pointer"}`} onClick={handleSelectMessage}>
              {message.content}
            </div>
          </div>
        )}
    </div>
  )
}

