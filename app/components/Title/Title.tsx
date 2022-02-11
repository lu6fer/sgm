export type TitleProps = {
  title: String
}

export default function Title({ title }: TitleProps) {
  return (
    <div className="text-2xl font-bold text-gray-100 pb-4">
      {title}
    </div>
  )
}
