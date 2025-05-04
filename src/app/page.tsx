'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card-content"
import { ScoreButtons } from "@/components/ui/score-buttons"
import { jsPDF } from "jspdf"
import addNotoSansJPRegular from "@/lib/fonts/NotoSansJP-normal"
import addNotoSansJPBold from "@/lib/fonts/NotoSansJP-bold"

import { DisclaimerModal } from '@/components/popup/disclaimer'
import { RatingScaleModal } from '@/components/popup/rating-scale'
import { LanguageSelect } from '@/components/ui/language-select'
import { ShareButtons } from '@/components/ui/share-buttons'

import { questionnaires } from "@/data/questionnaires"
import { uiLabels } from "@/data/uiLabels"
import type { Language, QuestionnaireDefinition } from "@/data/questionnaires"

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [selectedTest, setSelectedTest] = useState<keyof typeof questionnaires>('scs')
  const currentTest: QuestionnaireDefinition = questionnaires[selectedTest]

  const [name, setName] = useState("")
  const [date] = useState(() => (new Date()).toLocaleDateString("fr-FR"))
  const [language, setLanguage] = useState<Language>('fr')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [responsesByTest, setResponsesByTest] = useState<{ [key: string]: number[] }>({})
  const questionRefs = useRef<(HTMLDivElement | null)[]>([])
  const [showScale, setShowScale] = useState(false)

  const allQuestions = currentTest.sections.flatMap(section => section.questions)
  const totalQuestions = allQuestions.length
  const responses = responsesByTest[selectedTest] || Array(totalQuestions).fill(0)
  const isAllAnswered = responses.every(r => r > 0)

  useEffect(() => {
    addNotoSansJPRegular(jsPDF.API)
    addNotoSansJPBold(jsPDF.API)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("responses")
      if (saved) setResponsesByTest(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("responses", JSON.stringify(responsesByTest))
  }, [responsesByTest])

  const handleChange = (index: number, value: number, doScroll = true) => {
    const updated = [...responses]
    updated[index] = value
    setResponsesByTest(prev => ({ ...prev, [selectedTest]: updated }))
    setActiveIndex(index)

    if (doScroll) {
      const next = questionRefs.current[index + 1]
      if (next) {
        next.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  const handleReset = () => {
    const reset = Array(totalQuestions).fill(0)
    setResponsesByTest(prev => ({ ...prev, [selectedTest]: reset }))
  }

  // Fonctions de tests
    // useEffect(() => {
    //   window.fillAll = (val = currentTest.scaleMax) => {
    //     const filled = Array(totalQuestions).fill(val)
    //     setResponsesByTest(prev => ({ ...prev, [selectedTest]: filled }))
    //   }
    //   window.resetAll = () => {
    //     const reset = Array(totalQuestions).fill(0)
    //     setResponsesByTest(prev => ({ ...prev, [selectedTest]: reset }))
    //   }
    //   window.resetOne = (i: number) => handleChange(i, 0, false)
    // }, [selectedTest, totalQuestions, currentTest.scaleMax, handleChange])

  const generatePDF = async () => {
    const doc = new jsPDF()

    const fontFamily = language === "jp" ? "NotoSansJP" : "helvetica"
    
    const loadImage = (src: string): Promise<HTMLImageElement> =>
      new Promise((resolve) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve(img)
      })
  
    const logo = await loadImage("/MindTracker.png")
    const badge = await loadImage("/ColorBrain.png")
  
    // Dimensions pour les images (ajuste à ta guise)
    const logoWidth = 70
    const logoHeight = 10
    const badgeWidth = 25
    const badgeHeight = 25
  
    // Position en haut à droite
    const pageWidth = doc.internal.pageSize.getWidth()
    doc.addImage(logo, 'PNG', pageWidth - logoWidth - 10, 10, logoWidth, logoHeight)
    doc.addImage(badge, 'PNG', pageWidth - badgeWidth - 85, 5, badgeWidth, badgeHeight)

    doc.setFontSize(14);
    doc.setFont(fontFamily, "bold")
    
    doc.text(`${currentTest.title[language]}`, 10, 30)
    doc.setFontSize(12)
    doc.setFont(fontFamily, "normal")
    
    doc.text(`${uiLabels.name[language]}: ${name || "___________"}    ${uiLabels.date[language]}: ${date}`, 10, 38)
  
    let y = 55
  
    // Résumé
    if (currentTest.getSummary) {
      const summary = currentTest.getSummary(responses, language, allQuestions)
      const summaryBlocks = summary.split("\n\n");
    
      doc.setFont(fontFamily, "bold")
      doc.text(language === 'fr' ? 'Résumé' : language === 'en' ? 'Summary' : '要約', 10, y);
      y += 8;
  
      summaryBlocks.forEach(block => {
        const [title, ...rest] = block.split(":")
        const content = rest.join(":").trim()
      
        // Extrait le score moyen entre parenthèses, par ex : "(3.25/5)"
        const match = title.match(/\(([\d.]+)\/5\)/)
        const avg = match ? parseFloat(match[1]) : null
      
        // Définit la couleur du titre
        if (avg !== null) {
          if (avg <= 1.5) doc.setTextColor(224, 42, 67)      // rouge
          else if (avg <= 2.5) doc.setTextColor(241, 118, 33) // orange
          else if (avg <= 3.5) doc.setTextColor(254, 186, 23) // jaune
          else if (avg <= 4.5) doc.setTextColor(89, 207, 217) // bleu clair
          else doc.setTextColor(42, 142, 183)                // bleu foncé
        } else {
          doc.setTextColor(0, 0, 0) // couleur par défaut (noir)
        }
      
        doc.setFont(fontFamily, "normal")
        doc.text(`${title.trim()}:`, 10, y)
        y += 5
      
        doc.setTextColor(0, 0, 0)
        // doc.setFont("helvetica", "normal")
        const wrapped = doc.splitTextToSize(content, 180)
        doc.text(wrapped, 10, y)
        y += wrapped.length * 8
      
        if (y > 270) {
          doc.addPage()
          y = 20
        }
      })
      
  
      // Ajout d’un espace ou saut de page avant les questions
      if (y > 260) {
        doc.addPage();
        y = 20;
      } else {
        doc.setDrawColor(180); // couleur gris clair
        doc.line(10, y, 200, y); // ligne horizontale de x=10 à x=200 à la position y
        y += 10; // un peu d'espace après la ligne
      }
    }
  
    // Questions
    allQuestions.forEach((q, index) => {
      const text = `${q.number}. ${q.text[language]} - ${uiLabels.answer[language]}: ${responses[index]}`
      const wrapped = doc.splitTextToSize(text, 180)
      doc.text(wrapped, 10, y)
      y += wrapped.length * 6 + 2
  
      if (y > 280) {
        doc.addPage()
        y = 20
      }
    })
  
    const safeName = name ? name.replace(/[^a-zA-Z0-9-_]/g, "_") : "anonyme"
    doc.save(`${selectedTest}-${uiLabels.results[language]}-${safeName}-${language}.pdf`)
  }

  return (
    <div className="p-4 max-w-4xl mx-auto pb-96">

      {showDisclaimer && 
        <DisclaimerModal 
          onClose={() => setShowDisclaimer(false)} 
          language={language} 
          setLanguage={setLanguage} 
        />
      }

      <div className="w-full mb-6">
        <div className="w-full bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl shadow sm:p-6 p-2 text-center flex flex-col items-center">
          <div className="flex w-full items-center justify-between gap-4">
            <button 
              className="w-12 h-12 text-7xl text-gray-500 hover:text-gray-800 transition"
              aria-label={language === 'fr' ? "Test précédent" : language === 'en' ? "Previous test" : "前のテスト"} 
              onClick={() => {
                const keys = Object.keys(questionnaires) as Array<keyof typeof questionnaires>
                const index = keys.indexOf(selectedTest)
                const prev = (index - 1 + keys.length) % keys.length
                setSelectedTest(keys[prev])
            }}>‹</button>
            <h1 className="sm:text-3xl text-lg font-extrabold text-blue-900 tracking-tight">
              {currentTest.title[language]}
            </h1>
            <h1 className="sr-only">
              {currentTest.title[language]}
            </h1>
            <button 
              className="w-12 h-12 text-7xl text-gray-500 hover:text-gray-800 transition"
              aria-label={language === 'fr'? "Test suivant": language === 'en'? "Next test": "次のテスト"}
              onClick={() => {
                const keys = Object.keys(questionnaires) as Array<keyof typeof questionnaires>
                const index = keys.indexOf(selectedTest)
                const next = (index + 1) % keys.length
                setSelectedTest(keys[next])
            }}>›</button>
          </div>
          <p className="text-sm text-blue-700 mt-2 italic">
            {language === 'fr' ? "Choisissez un test à compléter" : language === 'en' ? "Choose a test to complete" : "テストを選択してください"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap-reverse gap-4 mb-4">
        <div className="flex-1 min-w-[200px] w-50">
          <label htmlFor="username" className="block text-xs font-bold mb-1">{uiLabels.name[language]}</label>
          <input id="username" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div className="flex-1 min-w-[200px] w-40">
          <label htmlFor="date" className="block text-xs font-bold mb-1">{uiLabels.date[language]}</label>
          <input id="date" type="text" value={date} disabled className="w-full border rounded p-2 bg-gray-50 text-gray-700" />
        </div>
        <div className="flex-1 min-w-[200px] w-50">
          <label className="block text-xs font-bold mb-1">{uiLabels.language[language]}</label>
          <LanguageSelect  language={language} setLanguage={setLanguage} />
        </div>
      </div>

      <div className="mt-4 bg-white p-4 rounded shadow text-gray-700">
        <section aria-labelledby="instructions-title">
          <h2 id="instructions-title" className="font-bold text-lg mb-2">
            {language === 'fr' ? "Instructions" : language === 'en' ? "Instructions" : "説明"}
          </h2>
          <p className="whitespace-pre-line">{currentTest.instructions[language]}</p>
        </section>
        <section aria-labelledby="rating-title" className="mt-6">
          <h3 id="rating-title" className="text-lg font-semibold mb-4">
            {uiLabels.ratingScaleTitle[language]}
          </h3>
          <ul className="flex flex-wrap justify-center gap-4 text-sm">
            {currentTest.ratingScale[language].map((label, idx) => {
              const colors = [
                "bg-[#E02A43] text-white",   // 1 - rouge
                "bg-[#F17621] text-white",   // 2 - orange
                "bg-[#FEBA17] text-white",   // 3 - jaune
                "bg-[#59CFD9] text-white",   // 4 - bleu clair
                "bg-[#2A8EB7] text-white",   // 5 - bleu foncé
              ]
              const color = colors[idx] || "bg-gray-200"

              return (
                <li key={idx} className={`px-4 py-2 rounded-md shadow-sm ${color}`}>
                  <span className="font-bold">{idx + 1}.</span> {label}
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      {currentTest.sections.map((section, secIndex) => (
        <div key={secIndex} className="rounded-lg p-6 mb-4 bg-white shadow">
          <h2 className="text-xl font-semibold mb-4">{section.title[language]}</h2>
          {section.questions.map(q => {
            const index = allQuestions.findIndex(qq => qq.number === q.number)
            return (
              <Card
                key={`${index}-${responses[index]}`}
                ref={el => { questionRefs.current[index] = el }}
                className={`mb-2 border border-blue-100 rounded-xl bg-white hover:bg-blue-50 shadow-md ${index === activeIndex ? "ring-2 ring-blue-400" : ""}`}
              >
                <CardContent className="p-4 space-y-2">
                  <p className="text-lg">{q.number}. {q.text[language]}</p>
                  <ScoreButtons
                    value={responses[index]}
                    onChange={(val) => handleChange(index, val, true)}
                    max={currentTest.scaleMax}
                  />
                </CardContent>
              </Card>
            )
          })}
        </div>
      ))}

      <div className="flex flex-col items-center gap-4 mt-10">
        {isAllAnswered && currentTest.getSummary && (
          <div className="w-full mt-8 bg-white border border-blue-200 rounded-xl p-6 shadow text-gray-800">
            <h2 className="text-xl font-bold mb-2">
              {language === 'fr' ? 'Résumé de vos réponses' : language === 'en' ? 'Summary of your responses' : '回答の要約'}
            </h2>

            <div className="space-y-4 mt-6">
              {currentTest.getSummary(responses, language, allQuestions)
                .split("\n\n")
                .map((para, idx) => {
                  const [title, ...rest] = para.split(":")
                  const content = rest.join(":").trim()

                  const match = title.match(/\(([\d.]+)\/5\)/)
                  const avg = match ? parseFloat(match[1]) : null

                  let color = "text-gray-800"
                  if (avg !== null) {
                    if (avg <= 1.5) color = "text-[#E02A43]"      // rouge
                    else if (avg <= 2.5) color = "text-[#F17621]" // orange
                    else if (avg <= 3.5) color = "text-[#FEBA17]" // jaune
                    else if (avg <= 4.5) color = "text-[#59CFD9]" // bleu clair
                    else color = "text-[#2A8EB7]"                 // bleu foncé
                  }

                  return (
                    <p key={idx} className="leading-relaxed text-md">
                      <span className={`font-semibold underline ${color}`}>
                        {title.trim()}:
                      </span>{" "}
                      <span className="text-gray-700">{content}</span>
                    </p>
                  )
                })}
            </div>

            <p className="mt-8 leading-relaxed text-md text-gray-800 whitespace-pre-line">
              {language === 'fr' ?
                'Vous avez terminé toutes les questions. Vous pouvez maintenant télécharger vos réponses en PDF.' :
                language === 'en' ?
                'You have completed all questions. You can now download your responses as a PDF.' :
                'すべての質問に回答しました。PDFとして回答をダウンロードできます。'}
            </p>
          </div>
        )}

        <div className="flex flex-wrap w-full justify-between gap-4">
          <Button variant="destructive" onClick={handleReset} className="w-50 flex-1 min-w-[200px]">
            {language === 'fr' ? 'Réinitialiser' : language === 'en' ? 'Reset' : 'リセット'}
          </Button>

          <Button
            onClick={() => {
              if (isAllAnswered) {
                generatePDF()
              } else {
                alert(
                  language === 'fr'
                    ? "Veuillez répondre à toutes les questions avant de télécharger."
                    : language === 'en'
                    ? "Please answer all questions before downloading."
                    : "すべての質問に答えてからダウンロードしてください。"
                )
              }
            }}
            variant={isAllAnswered ? "default" : "muted"}
            className="w-50 flex-1 min-w-[200px]"
          >
            {uiLabels.pdfDownload[language]}
          </Button>

          <div className="w-50 flex-1 min-w-[200px]">
            <LanguageSelect language={language} setLanguage={setLanguage} />
          </div>
        </div>

        {isAllAnswered && 
          <div className="flex flex-col w-full justify-between mt-4">
            <h1 className="text-center font-bold">Share on :</h1>
            <ShareButtons language={language} />
          </div>
        }
        
      </div>

      {showScale && (
        <RatingScaleModal
          open={showScale}
          onClose={() => setShowScale(false)}
          language={language}
          scale={currentTest.ratingScale[language]}
        />
      )}
      <button
        className="fixed bottom-6 right-6 z-40 bg-white shadow-lg rounded-full px-5 py-3 border border-blue-300 font-semibold text-blue-700 hover:bg-blue-50 transition"
        onClick={() => setShowScale(true)}
      >
        {uiLabels.scaleButton[language]}
      </button>
    </div>
  )
}
