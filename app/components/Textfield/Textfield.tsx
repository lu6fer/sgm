import { useEffect, useState, ReactNode } from "react";


export type TextfieldProps = {
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  appendAdornment?: ReactNode
  prependAdornment?: ReactNode
}

export default function Textfield({ onChange, placeholder, value = "", appendAdornment: AppendAdornment, prependAdornment: PrependAdornment }: TextfieldProps) {

  const [valueState, setValueState] = useState(value);

  useEffect(() => {
    setValueState(value);
  }, [value]);
  console.log(valueState);

  /**
   * Handle input change
   * @param event 
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueState(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="p-1 flex bg-slate-800 items-center justify-center shadow-lg  border-2 border-slate-900 rounded-lg w-full  leading-tight ">
      {PrependAdornment && PrependAdornment}
      <input
        className="bg-slate-800 py-1 px-2 flex-1 leading-tight appearance-none focus:outline-none focus:shadow-outline h-full"
        type="text"
        placeholder={placeholder}
        value={valueState}
        onChange={handleChange}
      />
      {AppendAdornment && AppendAdornment}
    </div>
  );
}