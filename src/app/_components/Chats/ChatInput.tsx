'use client'
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { api } from "~/trpc/react";

interface ChatInputProps {
  refetch: () => void
}

export default function ChatInput({ refetch }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const receiverId = usePathname().split("/")[2]!;

  const createMessage = api.chat.sendMessage.useMutation({
    onSettled: () => setMessage(""),
    onSuccess: () => refetch()
  })

  const sendMessage = async () => {
    await createMessage.mutateAsync({ content: message, receiverId: receiverId })
  }

  return (
    <div className="w-full fixed bottom-[64px] bg-base-100 max-h-32 flex flex-col justify-start items-start">
      <label className="flex justify-center items-center gap-2 flex-shrink py-2 px-4 outline-none border-none input active:border-none active:outline-none focus:border-none focus:outline-none focus:ring-0 w-full">
        <input
          disabled={createMessage.isPending}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          autoFocus className="grow max-w-sm input input-bordered h-12" />
        <button className="btn btn-primary btn-sm w-10 h-10 text-white" onClick={sendMessage} disabled={createMessage.isPending || !message}>
          {createMessage.isPending ?
            <span className="loading loading-spinner loading-lg text-white"></span> : <IoMdSend />}
        </button>
      </label>
    </div>
  )
}
