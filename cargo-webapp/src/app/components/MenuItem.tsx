import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
  path: string
  children: string,
  icon?: JSX.Element,
  active?: boolean | false,
}

export default function MenuItem({ path, icon, children }: Props) {
  const pathName = usePathname();
  const css = () => {
    if (pathName === path) {
      return 'hover:bg-blue-600 bg-blue-500 text-white';
    }

    return 'hover:bg-gray-100';
  }

  return (
    <li>
      <Link
        href={path}
        className={`flex items-center gap-x-3.5 py-3 px-2.5 text-sm text-slate-700 rounded ${css()}`}
      >
        <span style={{color: pathName === path ? 'white': ''}}>{icon}</span>
        {children}
      </Link>
    </li>
  )
}
