'use client'

import { InputHTMLAttributes } from "react"

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`border rounded p-2 ${props.className || ""}`}
    />
  )
}
