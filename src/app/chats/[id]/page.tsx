import { ChatNavBar, ChatConversation, ChatInput } from "~/app/_components/Chats";
import { Layout } from "~/app/_components/General";

export default function page() {
  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col justify-between items-center bg-gradient-to-b from-success to-primary pb-[65px]">
        <ChatNavBar />
        <ChatConversation />
        <ChatInput />
      </div>
    </Layout>
  )
}
