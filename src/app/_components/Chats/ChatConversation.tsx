import MessageReceived from "./MessageReceived";
import MessageSent from "./MessageSent";

export default function ChatConversation() {
  return (
    <div className="w-full relative py-6 px-4 flex flex-col justify-start items-stretch gap-4 mb-auto">
      <MessageReceived />
      <MessageSent />
    </div>
  )
}
