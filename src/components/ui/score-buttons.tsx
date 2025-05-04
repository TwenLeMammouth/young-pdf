'use client'

import { FC } from "react"

interface ScoreButtonsProps {
  value: number
  onChange: (newValue: number) => void
  max?: number
}

const activeColors: { [key: number]: string } = {
  1: "bg-[#E02A43] border-[#E02A43]",
  2: "bg-[#F17621] border-[#F17621]",
  3: "bg-[#FEBA17] border-[#FEBA17]",
  4: "bg-[#59CFD9] border-[#59CFD9]",
  5: "bg-[#2A8EB7] border-[#2A8EB7]",
  6: "bg-neutral-900 border-neutral-900"
}

export const ScoreButtons: FC<ScoreButtonsProps> = ({ value, onChange, max = 6 }) => {
  return (
    <div className="flex gap-3 justify-center my-2 flex-wrap">
      {Array.from({ length: max }, (_, i) => i + 1).map((score) => {
        const isActive = value === score
        const baseColorClass = isActive
          ? `${activeColors[score] || "bg-neutral-800 border-neutral-800"} text-white`
          : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"

        const activeShadow = isActive
          ? "shadow-[inset_0_0_3px_rgba(0,0,0,0.2),_inset_0_0_6px_rgba(255,255,255,0.2)]"
          : "shadow"

        return (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            aria-label={`Score ${score}`}
            aria-pressed={value === score}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold
              transition-all duration-150 border-1
              ${baseColorClass} ${activeShadow}
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300
              active:scale-95`}
          >
            {score}
          </button>
        )
      })}
    </div>
  )
}
