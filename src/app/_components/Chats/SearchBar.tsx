import { FaMagnifyingGlass } from 'react-icons/fa6'

interface SearchBar {
  onSearch: (value: string) => void
}

export default function SearchBar({ onSearch }: SearchBar) {
  return (
    <label className="input input-bordered flex items-center gap-2 mb-10">
      <input
        type="text"
        className="grow"
        placeholder="Search chats"
        onChange={(e) => onSearch(e.target.value)}
      />
      <kbd className="kbd kbd-sm">
        <FaMagnifyingGlass />
      </kbd>
    </label>
  )
}
