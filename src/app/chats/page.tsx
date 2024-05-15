import { redirect } from "next/navigation";
import { GiMagicHat } from "react-icons/gi";

import { getServerAuthSession } from "~/server/auth";
import { HOME } from "~/utils/routes";
import { AuthButton } from "../_components/Auth";

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary to-black text-white gap-5">
      <GiMagicHat size={100} />
      <h1 className="text-4xl font-bold text-center">
        Chat
      </h1>
      {session?.user.name}
      <AuthButton />
    </main>
  );
}
