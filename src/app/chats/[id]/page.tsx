import { ChatNavBar } from "~/app/_components/Chats";
import { Layout } from "~/app/_components/General";


export default function page() {
  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col justify-start items-center">
        <ChatNavBar />
      </div>
    </Layout>
  )
}
