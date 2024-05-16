import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { CHATS } from '~/utils/routes'

export default function ChatNavBar() {
  return (
    <nav className="bg-neutral sticky top-0 w-full px-5 py-2 flex flex-row justify-center items-center z-50">
      <Link href={CHATS} className="btn btn-square btn-sm btn-primary absolute left-5 top-4">
        <FaArrowLeft />
      </Link>
      <div className="flex flex-row items-center gap-4">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <Image src="/marce.jpg" alt="Marce" layout="responsive" width={48} height={48} />
          </div>
        </div>
        <span className="text-base font-bold">Marce Bokor</span>
      </div>
    </nav>
  )
}
