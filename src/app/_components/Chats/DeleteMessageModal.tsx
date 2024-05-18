'use client'
import { type Message } from "@prisma/client";
import { useRef } from "react";
import { api } from "~/trpc/react";

interface DeleteMessageModalProps {
  selectedMessage: Message | null;
}

export default function DeleteMessageModal({
  selectedMessage,
}: DeleteMessageModalProps) {

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const deleteMessage = api.chat.deleteMessage.useMutation({
    onSuccess: () => {
      const closeButton = closeButtonRef.current;
      if (closeButton) {
        closeButton.click();
      }
    }
  });

  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;
    await deleteMessage.mutateAsync({ messageId: selectedMessage.id });
  }

  return (
    <dialog id="deleteMessageModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button ref={closeButtonRef} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Message Chat</h3>
        <p className="py-4">Are you sure you want to delete this message?</p>
        <div className="flex justify-center gap-4 items-center">
          <button onClick={() => { closeButtonRef.current?.click() }}
            className="btn btn-ghost h-14">Cancel</button>
          <button className="btn btn-error h-14 w-20 text-white" disabled={deleteMessage.isPending} onClick={() => handleDeleteMessage()}>
            {deleteMessage.isPending ? <span className="loading loading-spinner loading-sm text-white"></span> : "Delete"}
          </button>
        </div>
      </div>
    </dialog>
  )
}
