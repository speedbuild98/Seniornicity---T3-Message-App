import Link from 'next/link'
import { GiMagicHat } from 'react-icons/gi'
import { HOME } from '~/utils/routes'

export default function Error404Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary to-black text-white gap-5">
      <GiMagicHat size={100} />
      <h1
        className="text-4xl font-bold text-center text-error"
      >
        Error 404
      </h1>
      <h2 className="text-lg font-bold text-center">
        Page not found
      </h2>
      <Link
        href={HOME}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        Home
      </Link>
    </main>
  )
}
