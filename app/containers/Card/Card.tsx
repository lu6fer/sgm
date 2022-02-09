import { IconType } from "react-icons"

export type Props = {
    text: string,
    icon?: IconType
}

export default function Card({ text, icon }: Props) {
    return (
        <div className="w-full h-full p-4 border-r last:border-0 flex flex-col justify-center border-gray-100">
            <div className="align-middle text-center">
                {text}
            </div>
        </div>
    )
}