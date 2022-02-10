import { IconType } from "react-icons"

export type Props = {
    text: string,
    icon?: IconType
}

export default function Card({ text, icon: Icon }: Props) {
    return (
        <div className="w-full h-full border-r last:border-0 flex flex-col p-2 justify-center border-gray-100 shadow-2xl">
            <div className="flex-grow flex items-center justify-center">
                {Icon && <Icon className="text-gray-100 text-4xl" />}
            </div>
            <div className="align-middle text-center text-xs">
                {text}
            </div>
        </div >
    )
}