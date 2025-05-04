'use client'

import { FC } from 'react'

interface ShareButtonsProps {
  language: 'fr' | 'en' | 'jp'
}

export const ShareButtons: FC<ShareButtonsProps> = ({ language }) => {
  const text =
    language === 'fr'
      ? "J'ai terminé un test sur MindTracker !"
      : language === 'en'
      ? "I just completed a test on MindTracker!"
      : "MindTrackerでテストを完了しました！"

  const url = typeof window !== 'undefined' ? window.location.href : ''

  const buttonStyle = "w-14 h-14 flex items-center justify-center rounded-lg shadow hover:scale-105 transition cursor-pointer text-white"

  return (
    <div className="mt-4 flex gap-4 justify-center">
      {/* Facebook */}
      <div
        onClick={() =>
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        }
        className={`${buttonStyle} bg-[#1877F2]`}
        title="Partager sur Facebook"
      >
        <svg width="24" height="24" fill="currentColor">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46H15.7c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12" />
        </svg>
      </div>

      {/* Twitter (X) */}
      <div
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            '_blank'
          )
        }
        className={`${buttonStyle} bg-black`}
        title="Partager sur X"
      >
        <svg width="22" height="22" fill="currentColor">
          <path d="M20 2 13.38 9.05 21 21h-5.6l-5.26-7.71L5 21H3.5l7.13-8.15L3 2h5.66l4.63 6.78L17.24 2z" />
        </svg>
      </div>

      {/* LinkedIn */}
      <div
        onClick={() =>
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            '_blank'
          )
        }
        className={`${buttonStyle} bg-[#0077B5]`}
        title="Partager sur LinkedIn"
      >
        <svg width="22" height="22" fill="currentColor">
          <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 7h5v14H0V7zm7.5 0H12v2.21c.65-1.24 2.26-2.21 4.5-2.21 4.42 0 5 2.91 5 6.71V21h-5v-6.32c0-1.51-.03-3.46-2.11-3.46-2.11 0-2.43 1.65-2.43 3.35V21h-5V7z" />
        </svg>
      </div>
    </div>
  )
}
