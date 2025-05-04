'use client'

import { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'muted'
}

export function Button({ children, variant = 'default', className = '', ...props }: Props) {
  let base =
    "px-4 py-2 rounded font-semibold transition duration-150 focus:outline-none focus:ring-2"

  let styles = ""

  switch (variant) {
    case 'default':
      styles = "bg-[#0F425C] text-white hover:bg-blue-700 focus:ring-blue-400"
      break
    case 'destructive':
      styles = "bg-neutral-800 text-white hover:bg-yellow-700 focus:ring-yellow-400"
      break
    case 'muted':
      styles = "bg-gray-300 text-gray-700 cursor-not-allowed opacity-60"
      break
  }

  return (
    <button
      {...props}
      disabled={variant === 'muted' || props.disabled}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  )
}
