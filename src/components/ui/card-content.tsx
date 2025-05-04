'use client'

import { ReactNode } from "react"

export function CardContent({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  )
}
