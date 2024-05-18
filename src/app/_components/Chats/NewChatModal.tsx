'use client'
import { type User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import { api } from "~/trpc/react";
import { CHATS } from "~/utils/routes";

declare global {
  interface Window {
    newChatModal: {
      showModal: () => void;
    };
  }
}

export default function NewChatModal() {
  const { data: users } = api.user.getAllUsers.useQuery();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    setSearch(searchText);
    if (searchText.length === 0) {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(users?.filter((user) =>
      (user.name?.toLowerCase().includes(searchText) ??
        user.email?.toLowerCase().includes(searchText))
      ) ?? []);
    }
  };

  return (
    <>
      <button className="btn btn-primary text-white" onClick={() => window.newChatModal.showModal()}>New chat<FaPlus /></button>
      <dialog id="newChatModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box pt-10 flex flex-col justify-start items-center gap-4">
          <form method="dialog">
            <button onClick={() => setSearch("")}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="w-full bg-base-100 h-12 flex flex-col justify-start items-start">
            <label className="flex items-center gap-2 flex-shrink h-12 px-4 input input-bordered input-primary w-full">
              <input
                onChange={handleSearch}
                value={search}
                type="text"
                placeholder="Search users..."
                autoFocus
                className="grow"
              />
              <FaMagnifyingGlass />
            </label>
          </div>
          {filteredUsers?.length === 0 && search.length > 0 ? <p className="mt-2 text-gray-300">No users found</p> :
            filteredUsers?.map((user) => (
              <Link key={user.id} href={`${CHATS}/${user.id}`} className="flex justify-between items-center py-2 px-3 w-full rounded-md bg-base-300">
                <div className="flex flex-row items-center justify-start gap-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full bg-primary">
                      {user.image ?
                        <Image src={user.image} alt={user.name ?? "user image"} layout="responsive" width={48} height={48} />
                        : (
                          <div className="flex items-center justify-center w-full h-full text-2xl text-white">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                        )
                      }
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <h1 className="text-base font-bold">{user.name}</h1>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </dialog>
    </>
  )
}