
import type { Language } from "@/data/questionnaires"

type FacetKey =
  | 'selfKindness'
  | 'selfJudgment'
  | 'commonHumanity'
  | 'isolation'
  | 'mindfulness'
  | 'overIdentification'

export function getSCSSummary(responses: number[], language: Language, allQuestions: { number: number }[]): string {
  const facets: { key: FacetKey; label: Record<Language, string> }[] = [
    { key: 'selfKindness', label: { fr: 'Bienveillance envers soi-même', en: 'Self-Kindness', jp: '自分への優しさ' } },
    { key: 'selfJudgment', label: { fr: 'Auto-jugement', en: 'Self-Judgment', jp: '自己批判' } },
    { key: 'commonHumanity', label: { fr: 'Humanité commune', en: 'Common Humanity', jp: '共通の人間性' } },
    { key: 'isolation', label: { fr: 'Isolement', en: 'Isolation', jp: '孤立' } },
    { key: 'mindfulness', label: { fr: 'Pleine conscience', en: 'Mindfulness', jp: 'マインドフルネス' } },
    { key: 'overIdentification', label: { fr: 'Sur-identification', en: 'Over-Identification', jp: '過剰同一化' } },
  ]

  const facetQuestionNumbers: Record<FacetKey, number[]> = {
    selfKindness: [5, 12, 19, 23, 26],
    selfJudgment: [1, 8, 11, 16, 21],
    commonHumanity: [3, 7, 10, 15],
    isolation: [4, 13, 18, 25],
    mindfulness: [9, 14, 17, 22],
    overIdentification: [2, 6, 20, 24],
  }

  const descriptions: Record<Language, Record<FacetKey, string>> = {
    fr: {
      selfKindness: "Votre capacité à être doux et compréhensif avec vous-même lorsque vous souffrez. Un score élevé indique une attitude bienveillante face à vos faiblesses.",
      selfJudgment: "Votre tendance à vous critiquer sévèrement lorsque vous échouez. Un score élevé peut refléter une autocritique excessive.",
      commonHumanity: "Votre aptitude à reconnaître que l'imperfection fait partie de l'expérience humaine. Un bon score reflète une connexion aux autres dans la souffrance.",
      isolation: "Votre propension à vous sentir seul face à vos difficultés. Un score élevé peut indiquer un sentiment de déconnexion.",
      mindfulness: "Votre capacité à accueillir vos émotions avec équilibre. Un score élevé suggère une bonne conscience émotionnelle sans jugement.",
      overIdentification: "Votre tendance à vous laisser submerger par vos émotions négatives. Un score élevé peut indiquer une faible régulation émotionnelle."
    },
    en: {
      selfKindness: "Your ability to be gentle and understanding with yourself in moments of suffering. A high score reflects a kind internal attitude.",
      selfJudgment: "Your tendency to harshly criticize yourself when you fail. A high score may reflect excessive self-criticism.",
      commonHumanity: "Your ability to recognize that imperfection is part of the human experience. A good score reflects feeling connected to others.",
      isolation: "Your tendency to feel alone in your struggles. A high score may indicate a sense of disconnection.",
      mindfulness: "Your ability to hold emotions in balanced awareness. A high score suggests strong emotional presence without overreaction.",
      overIdentification: "Your tendency to get overwhelmed by your negative emotions. A high score can indicate emotional entanglement."
    },
    jp: {
      selfKindness: "困難な時に自分に対して優しく理解を持って接する能力です。高いスコアは、思いやりのある内面を示します。",
      selfJudgment: "失敗した時に自分を厳しく批判する傾向です。高いスコアは、過度な自己批判の可能性があります。",
      commonHumanity: "不完全さが人間の一部であることを理解する力です。高いスコアは、他者とのつながりを反映します。",
      isolation: "困難な時に孤独を感じる傾向です。高いスコアは、孤立感が強いことを示す場合があります。",
      mindfulness: "感情をバランスよく受け入れる能力です。高いスコアは、冷静な感情の意識を示します。",
      overIdentification: "ネガティブな感情に圧倒されやすい傾向です。高いスコアは、感情への過剰な同一化を示します。"
    }
  }

  const questionIndexMap = new Map<number, number>()
  allQuestions.forEach((q, idx) => {
    questionIndexMap.set(q.number, idx)
  })

  const sortedFacets = [...facets].sort((a, b) => {
    const aFirst = facetQuestionNumbers[a.key][0]
    const bFirst = facetQuestionNumbers[b.key][0]
    const aIndex = questionIndexMap.get(aFirst) ?? Infinity
    const bIndex = questionIndexMap.get(bFirst) ?? Infinity
    return aIndex - bIndex
  })

  return sortedFacets.map(f => {
    const indices = facetQuestionNumbers[f.key]
    const values = indices.map(num => {
      const index = questionIndexMap.get(num)
      return index !== undefined ? responses[index] : 0
    })

    const avg = values.reduce((a, b) => a + b, 0) / values.length
    const rounded = Math.round(avg * 100) / 100

    return `${f.label[language]} (${rounded}/5): ${descriptions[language][f.key]}`
  }).join("\n\n")
}


type FactorKey = 'Neuroticism' | 'Extraversion' | 'Openness' | 'Agreeableness' | 'Conscientiousness'

const factorLabels: Record<Language, Record<FactorKey, string>> = {
  fr: {
    Neuroticism: "Névrosisme",
    Extraversion: "Extraversion",
    Openness: "Ouverture",
    Agreeableness: "Agréabilité",
    Conscientiousness: "Conscience"
  },
  en: {
    Neuroticism: "Neuroticism",
    Extraversion: "Extraversion",
    Openness: "Openness",
    Agreeableness: "Agreeableness",
    Conscientiousness: "Conscientiousness"
  },
  jp: {
    Neuroticism: "神経症傾向",
    Extraversion: "外向性",
    Openness: "開放性",
    Agreeableness: "協調性",
    Conscientiousness: "誠実性"
  }
}

const traitDescriptions: Record<Language, Record<FactorKey, string>> = {
  fr: {
    Neuroticism: "Une note élevée indique une tendance à l'anxiété, la nervosité et la vulnérabilité face au stress.",
    Extraversion: "Une note élevée reflète une personne sociable, énergique et affirmée.",
    Openness: "Une note élevée suggère une imagination vive, de la curiosité intellectuelle et un goût pour la nouveauté.",
    Agreeableness: "Une note élevée indique une tendance à être compatissant(e), coopératif(ve) et confiant(e).",
    Conscientiousness: "Une note élevée suggère de la discipline, du sens de l'organisation et de la fiabilité."
  },
  en: {
    Neuroticism: "A high score indicates a tendency toward anxiety, nervousness, and vulnerability to stress.",
    Extraversion: "A high score reflects a sociable, energetic, and assertive personality.",
    Openness: "A high score suggests imagination, intellectual curiosity, and an openness to novelty.",
    Agreeableness: "A high score indicates a compassionate, cooperative, and trusting nature.",
    Conscientiousness: "A high score suggests discipline, organization, and reliability."
  },
  jp: {
    Neuroticism: "高いスコアは、不安、神経質、ストレスへの脆弱性を示します。",
    Extraversion: "高いスコアは、社交的でエネルギッシュかつ自己主張が強い性格を示します。",
    Openness: "高いスコアは、想像力、知的好奇心、新しいものへの関心を示します。",
    Agreeableness: "高いスコアは、思いやりがあり、協力的で信頼できる性格を示します。",
    Conscientiousness: "高いスコアは、規律、組織力、信頼性を示します。"
  }
}

export function getBigFiveSummary(responses: number[], language: Language): string {
  const facetsPerFactor = 6
  const questionsPerFacet = 4

  const factorScores: Record<FactorKey, number> = {
    Neuroticism: 0,
    Extraversion: 0,
    Openness: 0,
    Agreeableness: 0,
    Conscientiousness: 0
  }

  Object.keys(factorScores).forEach((factor, i) => {
    const start = i * facetsPerFactor * questionsPerFacet
    const end = start + facetsPerFactor * questionsPerFacet
    const factorResponses = responses.slice(start, end)
    const average = factorResponses.reduce((acc, r) => acc + r, 0) / factorResponses.length
    factorScores[factor as FactorKey] = parseFloat(average.toFixed(2))
  })

  return Object.entries(factorScores)
    .map(([factor, score]) => {
      const f = factor as FactorKey
      return `${factorLabels[language][f]} ${score}/5 :\n${traitDescriptions[language][f]}`
    })
    .join("\n\n")
}
