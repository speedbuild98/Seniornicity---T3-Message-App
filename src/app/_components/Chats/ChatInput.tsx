import { IoMdSend } from "react-icons/io";

export default function ChatInput() {
  return (
    <div className="w-full bg-base-100 h-12 max-h-32 flex flex-col justify-start items-start">
      <label className="flex items-center gap-2 flex-shrink h-12 px-4 outline-none border-none input active:border-none active:outline-none focus:border-none focus:outline-none focus:ring-0 w-full">
        <input
          type="text"
          placeholder="Type a message..."
          autoFocus className="grow" />
        <button className="btn btn-primary btn-sm">
          <IoMdSend />
        </button>
      </label>
    </div>
  )
}
