import { IconType } from "react-icons"

export type Props = {
    text: string,
    icon?: IconType
}

export default function Card({ text, icon: Icon }: Props) {
    return (
        <div className="w-full h-20 p-2 border-r last:border-0 flex flex-col justify-center border-gray-100 shadow-2xl group ">
            <div className="flex-grow flex items-center justify-center ">
                {Icon && <Icon size={32} className="text-gray-100  group-hover:text-pink-500 transition-colors duration-200" />}
            </div>
            <div className="align-middle text-center text-xs group-hover:text-pink-500">
                {text}
            </div>
        </div >
    )
}
