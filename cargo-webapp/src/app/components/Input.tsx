'use client'

import { ChangeEvent, ChangeEventHandler, useRef, useState } from "react"

type Props = {
  id?: string,
  value?: any,
  onChange?: any,
  placeholder?: string,
  required?: boolean,
  disabled?: string,
  type?: string
}

export default function Input({ id, type, value, onChange, placeholder, required, disabled, ...resProps }: Props) {
  const [currentVal, setCurrentVal] = useState('');
  const inputRef = useRef<any>();

  const valueChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.value;
    setCurrentVal(newVal);
    if (onChange) {
      onChange(inputRef.current.value);
    }
  }

  return (
    <input
      id={id}
      type={type ?? "text"}
      value={value ? value : currentVal}
      ref={inputRef}
      required={required}
      placeholder={placeholder}
      onChange={valueChangedHandler}
      disabled={disabled}
      height='46px'
      {...resProps}
      // className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
      // className="py-3 px-4 block w-full border border-gray-300 rounded text-sm focus:border-blue-500 focus:ring-blue-500 w-80"
      className="py-3 px-3 block w-full border border-gray-300 rounded text-sm focus:border-blue-500 focus:ring-blue-500"
    />
  )
}