import { ReactNode } from "react"
import MenuItem from "./MenuItem"

type Props = {
  children: ReactNode
}

export default function Menu({ children }: Props) {
  return (
    <ul className="space-y-1.5">
      {children}
      {/* {children.items.forEach((element: typeof MenuItem) => {
        { element }
      })} */}
    </ul>
  )
}