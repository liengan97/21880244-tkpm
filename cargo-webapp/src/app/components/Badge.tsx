import React from "react"

type Props = {
  children: string,
  color?: string
}

export default function Badge({ color, children }: Props) {
  if (!color) {
    color = 'yellow';
  }

  return (
    <span className={`bg-${color}-100 text-${color}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded`}>{children}</span>
  )
}
