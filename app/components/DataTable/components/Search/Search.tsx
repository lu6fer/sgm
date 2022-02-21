import { useState } from "react";
import Textfield from "~/components/Textfield/Textfield";
import { FaSearch } from "react-icons/fa";
import Close from "./components/Close";


export type SearchProps = {
  onChange?: (value: string) => void
  value?: string
}


export default function Search({ onChange, value = "" }: SearchProps) {
  const [search, setSearch] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  }

  const handleClear = () => {
    setSearch("");
    if (onChange) {
      onChange("");
    }
  }

  return (
    <div className="mb-6">
      <Textfield
        placeholder="Rechercher"
        prependAdornment={<FaSearch size={24} className="text-gray-500 py-1 px-2" />}
        appendAdornment={<Close value={search} onClick={handleClear} />}
        onChange={handleChange}
        value={value}
      />
    </div>
  )
}