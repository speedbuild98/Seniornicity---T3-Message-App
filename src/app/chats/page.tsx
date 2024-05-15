import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { HOME } from "~/utils/routes";
import { AuthButton } from "../_components/Auth";
import { Layout } from "../_components/General";

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
      {session?.user.name}
      <AuthButton />
    </Layout>
  );
}
