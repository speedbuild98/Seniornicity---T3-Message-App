import { type Message } from "@prisma/client";

interface MessageProps {
  receiverId: string;
  message: Message & {
    sender: {
      id: string;
      name: string | null;
    };
  };
}

export default function Message({
  message,
  receiverId,
}: MessageProps) {

  const messageIsMine = message.sender.id !== receiverId;

  return (
    <div className={`w-1/2 max-w-sm bg-base-100 p-2 rounded-lg relative text-white flex flex-col justify-start items-start ${messageIsMine ? "self-end" : "self-start"}`}>
      <div className="flex items-center justify-between w-full text-xs text-primary">
        <p className={`text-sm ${!messageIsMine && "text-secondary"}`}>{message.sender.name?.split(" ")[0]}</p>
        <p className="text-xs text-gray-500">{new Date(message.createdAt).toLocaleTimeString()}</p>
      </div>
      {message.content}
      <div className={`bg-base-100 absolute
      ${messageIsMine ?
          "-bottom-1 -right-1 h-4 w-4 rounded-bl-[50px] rounded-tr-[50px]" :
          "-bottom-1 -left-1 h-4 w-4 rounded-br-[50px] rounded-tl-[50px]"}`}></div>
    </div>
  )
}

