import { redirect } from "next/navigation";
import { GiMagicHat } from "react-icons/gi";

import { getServerAuthSession } from "~/server/auth";
import { HOME } from "~/utils/routes";
import { AuthButton } from "../_components/Auth";
import { Layout } from "../_components/General";

export const metadata = {
  title: "Seniornicity - Stats",
  description: "Built with create-t3-app by Gallardo dev",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function StatsPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect(HOME)
  }

  return (
    <Layout>
      <GiMagicHat size={100} />
      <h1 className="text-4xl font-bold text-center">
        Stats
      </h1>
      {session?.user.name}
      <AuthButton />
    </Layout>
  );
}
