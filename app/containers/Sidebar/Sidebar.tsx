import { ReactNode } from "react"

export type Props = {
    children: ReactNode
}

export default function Sidebar({ children }: Props) {
    return (
        <div className="flex flex-row  w-full items-start justify-center h-20 rounded-t-3xl bg-slate-800">
            {children}
        </div>
    )
}