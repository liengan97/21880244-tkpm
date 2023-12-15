import { type } from "os"

type Props = {
  children: any,
  disabled?: boolean
  onClick?: () => void,
  type?: string
}

export default function Button({ type, children, disabled, onClick }: Props) {
  return (
    <button
      type={type ? type : 'button'}
      disabled={disabled}
      onClick={onClick}
      className="text-white bg-blue-500 font-medium rounded text-sm px-5 py-3"
    >
      {children}
    </button>
  )
}