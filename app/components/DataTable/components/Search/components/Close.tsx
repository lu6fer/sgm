import { IoClose } from "react-icons/io5";

export type CloseProps = {
  value?: string
  onClick?: (value?: string) => void
}

export default function Close({ value = "", onClick }: CloseProps) {
  if (value === "") {
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  }

  return (
    <button
      onClick={handleClick}
      className="text-gray-100 border-l-2 border-slate-900 py-1 px-2 active:text-pink-500 hover:text-pink-500"
    >
      <IoClose size={24} />
    </button>
  )
}