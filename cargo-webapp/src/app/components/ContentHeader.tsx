import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function ContentHeader({ children }: Props) {
  return (
    <h1 className="block text-xl font-bold text-gray-800 sm:text-2xl pb-8">{children}</h1>
  )
}