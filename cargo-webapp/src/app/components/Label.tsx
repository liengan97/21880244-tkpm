type Props = {
  htmlFor: string,
  children: string,
  className?: string,
  styles?: Object,
  required?: boolean
}

export default function Label({ required, htmlFor, children, className, styles }: Props) {
  return (
    <label
      style={styles}
      htmlFor={htmlFor}
      className={`${required ? 'lbl-required' : ''} block text-base mb-2 ${className}`}
    >
      {children}
    </label>
  )
}