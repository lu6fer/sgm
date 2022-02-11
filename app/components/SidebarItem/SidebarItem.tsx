import { IconType } from "react-icons"
import { Link, useLocation } from "remix"
import clx from "classnames";

export type SidebarItemProps = {
  text: string,
  to: string,
  icon?: IconType
}

export default function SidebarItem({ to, text, icon: Icon }: SidebarItemProps) {
  const { pathname } = useLocation();
  const active = pathname.startsWith(to);

  return (
    <Link to={to} title={text} aria-label={text} >
      <div className="w-full h-20 p-2 border-r last:border-0 flex flex-col justify-center border-gray-100 shadow-2xl group ">
        <div className="flex-grow flex items-center justify-center ">
          {Icon && <Icon size={32} className={clx("text-gray-100  group-hover:text-pink-500 transition-colors duration-200", {
            "text-pink-500": active
          })} />}
        </div>
        <div className={clx("align-middle text-center text-xs group-hover:text-pink-500", {
          "text-pink-500": active
        })}>
          {text}
        </div>
      </div >
    </Link>
  )
}
