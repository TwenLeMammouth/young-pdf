import { useEffect, useState } from "react"
import { uiLabels } from "@/data/uiLabels"
import type { Language } from "@/data/questionnaires"
import { LanguageSelect } from "@/components/ui/language-select"

export function DisclaimerModal({
  onClose,
  language,
  setLanguage,
}: {
  onClose: () => void
  language: Language
  setLanguage: (lang: Language) => void
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 transition-opacity animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center animate-fade-in-up space-y-4">
        <div className="flex justify-center mx-8">
          <LanguageSelect language={language} setLanguage={setLanguage} />
        </div>
        <h2 className="text-lg font-bold">{uiLabels.disclaimerTitle[language]}</h2>
        <p className="text-sm whitespace-pre-line text-gray-700">
          {uiLabels.disclaimer[language]}
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition"
        >
          {language === "fr" ? "J'ai compris" : language === "en" ? "I understand" : "理解しました"}
        </button>
      </div>
    </div>
  )
}
