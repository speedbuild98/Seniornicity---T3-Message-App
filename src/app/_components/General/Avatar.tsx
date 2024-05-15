import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";

export default async function Avatar() {
  const session = await getServerAuthSession();

  return (
    <div className="h-full rounded-full bg-primary w-full max-w-24">
      {session?.user.image ? (
        <Image src={session?.user.image} width={100} height={100} alt="profile" />
      ) : (
        <div className="flex items-center justify-center h-full text-6xl font-bold text-white">
          {session?.user.name?.slice(0, 1).toUpperCase()}
        </div>
      )}
    </div>
  )
}
