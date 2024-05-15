import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { HOME } from "~/utils/routes";
import { Layout } from "../_components/General";
import { ChatCard, SearchBar } from "../_components/Chats";

export const metadata = {
  title: "Seniornicity - Chats",
  description: "Built with create-t3-app by Gallardo dev",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function ChatsPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect(HOME)
  }

  const chats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hello there!",
      lastMessageTime: "10:00 AM",
      avatar: "/marce.jpg",
    },
    {
      id: 2,
      name: "Jane Doe",
      lastMessage: "Hello there!",
      lastMessageTime: "10:00 AM",
      avatar: "/marce.jpg",
    },
    {
      id: 3,
      name: "John Doe",
      lastMessage: "Hello there!",
      lastMessageTime: "10:00 AM",
      avatar: "/marce.jpg",
    },
    {
      id: 4,
      name: "Jane Doe",
      lastMessage: "Hello there!",
      lastMessageTime: "10:00 AM",
      avatar: "/marce.jpg",
    },
    {
      id: 5,
      name: "John Doe",
      lastMessage: "Hello there!",
      lastMessageTime: "10:00 AM",
      avatar: "/marce.jpg",
    },
    {
      id: 6,
      name: "Jane Doe",
      lastMessage: "Hello there!",
      lastMessageTime: "10:00 AM",
      avatar: "/marce.jpg",
    },
    {
      id: 7,
      name: "John Doe",
      lastMessage: "Hello there!",
      lastMessageTime: "10:00 AM",
      avatar: "/marce.jpg",
    },
    {
      id: 8,
      name: "Jane Doe",
      lastMessage: "Hello there!",
      lastMessageTime: "10:00 AM",
      avatar: "/marce.jpg",
    },
  ]

  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col justify-start items-center p-5 gap-2">
        <SearchBar />
        {chats.map((chat) => (
          <ChatCard key={chat.id} chat={chat} />
        ))}
      </div>
    </Layout>
  );
}
