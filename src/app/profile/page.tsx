import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import { HOME } from "~/utils/routes";
import { AuthButton } from "../_components/Auth";
import { Avatar, Layout, Subtitle, Title } from "../_components/General";

export const metadata = {
  title: "Seniornicity - Profile",
  description: "Built with create-t3-app by Gallardo dev",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect(HOME)
  }

  return (
    <Layout>
      <Avatar />
      <Title text={session?.user.name ?? ''} />
      <Subtitle text={session?.user.email ?? ''} />
      <AuthButton />
    </Layout>
  );
}
