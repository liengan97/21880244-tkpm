import { ReactNode } from "react"
import Loading from "./Loading"

type ContextBoxProps = {
  children: ReactNode
  loading?: boolean
}

export default function ContentBox({ loading, children }: ContextBoxProps) {
  if (loading) {
    return <Loading />
  }

  return (
    // <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72 bg-gray-100 h-[calc(100vh-71px)]">
    <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72 h-[calc(100vh-71px)]">
      {children}
    </div>
  )
}

type HeaderProps = {
  name: string
}

export function Header({ name }: HeaderProps) {
  return (
    <h1 className="block text-xl font-bold text-gray-800 sm:text-2xl pb-8">{name}</h1>
  )
}