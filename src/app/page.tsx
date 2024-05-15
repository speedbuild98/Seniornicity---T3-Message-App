import { redirect } from 'next/navigation'
import { GiMagicHat } from "react-icons/gi";

import { getServerAuthSession } from "~/server/auth";
import { CHATS } from "~/utils/routes";
import Title from "./_components/General/Title";
import { AuthButton } from "./_components/Auth";
import { Layout } from "./_components/General";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    redirect(CHATS)
  }

  return (
    <Layout>
      <GiMagicHat size={100} />
      <Title text="Seniornicity App" />
      <AuthButton />
    </Layout>
  );
}
