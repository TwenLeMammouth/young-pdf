'use client'

import { ReactNode, ForwardedRef, forwardRef } from "react"

export const Card = forwardRef(function Card(
  { children, className = "" }: { children: ReactNode, className?: string },
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  )
})
