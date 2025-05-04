import { uiLabels } from "@/data/uiLabels"

export function RatingScaleModal({
  open,
  onClose,
  language,
  scale
}: {
  open: boolean
  onClose: () => void
  language: 'fr' | 'en' | 'jp'
  scale: string[]
}) {
  if (!open) return null

  const colors = [
    "bg-[#E02A43] text-white",   // 1
    "bg-[#F17621] text-white",   // 2
    "bg-[#FEBA17] text-black",   // 3
    "bg-[#59CFD9] text-black",   // 4
    "bg-[#2A8EB7] text-white",   // 5
    "bg-neutral-800 text-white"  // 6 (si utilisé)
  ]

  return (
    <div
      className="fixed inset-0 flex items-end justify-center z-50 bg-black/30"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rating-title"
    >
      <div className="bg-white rounded-t-2xl p-6 shadow-xl w-full max-w-md animate-fade-in-up">
        <h3 id="rating-title" className="font-bold text-xl mb-4">
          {uiLabels.ratingScaleTitle[language]}
        </h3>

        <ul className="flex flex-wrap justify-center gap-4 text-sm">
          {scale.map((label, idx) => (
            <li key={idx} className={`px-4 py-2 rounded-md shadow-sm ${colors[idx] || "bg-gray-200"}`}>
              <span className="font-bold">{idx + 1}.</span> {label}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600"
          >
            {uiLabels.close[language]}
          </button>
        </div>
      </div>
    </div>
  )
}
