import { ReactNode } from "react"

export type Props = {
  children: ReactNode
}

export default function Sidebar({ children }: Props) {
  return (
    <div className="flex-shrink flex flex-row  w-full items-start justify-center rounded-t-3xl bg-slate-800 shadow-xl">
      {children}
    </div>
  )
}
