import { ReactNode } from "react"

export type CardProps = {
  children: ReactNode
}

export default function Card({ children }: CardProps) {
  return (
    <div className="relative max-h-full w-full bg-slate-800 rounded-xl p-4 shadow-lg min-h-min	overflow-auto">
      {children}
    </div>
  )
}
