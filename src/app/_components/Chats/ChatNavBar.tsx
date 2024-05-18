'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { api } from '~/trpc/react'
import { CHATS } from '~/utils/routes'

export default function ChatNavBar() {
  const userId = usePathname().split("/")[2]!;
  const { data: user, isLoading } = api.user.getUserById.useQuery({ userId });

  return (
    isLoading ?
      <div className="skeleton bg-neutral sticky top-0 w-full h-16 rounded-none"></div>

      :

      <nav className="bg-neutral sticky top-0 w-full px-5 py-2 flex flex-row justify-center items-center z-50">
        <Link href={CHATS} className="btn btn-square btn-sm btn-primary absolute left-5 top-4">
          <FaArrowLeft />
        </Link>
        <div className="flex flex-row items-center gap-4">
          <div className="avatar">
            <div className="w-12 rounded-full bg-primary">
              {user?.image ?
                <Image src={user.image} alt={user.name ?? "user image"} layout="responsive" width={48} height={48} />
                : (
                  <div className="flex items-center justify-center w-full h-full text-2xl text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )
              }
            </div>
          </div>
          <span className="text-base font-bold">{user?.name}</span>
        </div>
      </nav>
  )
}
