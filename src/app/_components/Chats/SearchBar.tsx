import { FaMagnifyingGlass } from 'react-icons/fa6'

export default function SearchBar() {
  return (
    <label className="input input-bordered flex items-center gap-2 mb-10">
      <input type="text" className="grow" placeholder="Search chats" />
      <kbd className="kbd kbd-sm">
        <FaMagnifyingGlass />
      </kbd>
    </label>
  )
}
