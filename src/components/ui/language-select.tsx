import { Language } from "@/data/questionnaires";
import Image from "next/image";
import { useState } from "react";

type LanguageOption = {
  code: Language
  label: string
  flag: string
}

const languages: LanguageOption[] = [
  { code: 'fr', label: 'Français', flag: '/flags/fr.svg' },
  { code: 'en', label: 'English', flag: '/flags/en.svg' },
  { code: 'jp', label: '日本語', flag: '/flags/jp.svg' },
];

export function LanguageSelect({ language, setLanguage }: { language: Language, setLanguage: (lang: Language) => void }) {
  const [open, setOpen] = useState(false)
  const current = languages.find(l => l.code === language)!

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 border rounded-md bg-white shadow-sm text-sm hover:bg-gray-50"
        aria-label="Changer de langue / Change language"
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          <Image src={current.flag} alt={current.label} width={20} height={20} className="rounded-full" />
          <span>{current.label}</span>
        </div>
        <span>▾</span>
      </button>

      {open && (
        <ul
          className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg text-sm overflow-hidden"
          role="listbox"
        >
          {languages.map(l => (
            <li
              key={l.code}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              role="option"
              aria-selected={l.code === current.code}
              onClick={() => {
                setLanguage(l.code)
                setOpen(false)
              }}
            >
              <Image src={l.flag} alt={l.label} width={20} height={20} className="rounded-full" />
              <span>{l.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
