import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { HOME } from "~/utils/routes";
import { Layout } from "../_components/General";
import { ChatsContainers } from "../_components/Chats";

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

  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col justify-start items-center p-5 gap-2">
        <ChatsContainers />
      </div>
    </Layout>
  );
}
