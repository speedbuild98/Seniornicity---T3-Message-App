'use client'
import { type Conversation } from "@prisma/client";
import { useRef } from "react";
import { api } from "~/trpc/react";

interface DeleteChatModalProps {
  selectedChat: Conversation | null;
}

export default function DeleteChatModal({
  selectedChat
}: DeleteChatModalProps) {

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const deleteChat = api.chat.deleteConversation.useMutation({
    onSuccess: () => {
      const closeButton = closeButtonRef.current;
      if (closeButton) {
        closeButton.click();
      }
    }
  });

  const handleDeleteChat = async () => {
    if (!selectedChat) return
    await deleteChat.mutateAsync({ conversationId: selectedChat?.id })
  }

  return (
    <dialog id="deleteChatModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button ref={closeButtonRef} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Delete Chat</h3>
        <p className="py-4">Are you sure you want to delete this chat?</p>
        <div className="flex justify-center gap-4 items-center">
          <button onClick={() => { closeButtonRef.current?.click() }}
            className="btn btn-ghost h-14">Cancel</button>
          <button className="btn btn-error h-14 w-20 text-white" disabled={deleteChat.isPending} onClick={() => handleDeleteChat()}>
            {deleteChat.isPending ? <span className="loading loading-spinner loading-sm text-white"></span> : "Delete"}
          </button>
        </div>
      </div>
    </dialog>
  )
}
