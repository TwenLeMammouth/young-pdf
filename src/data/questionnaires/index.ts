
import { getSCSSummary, getBigFiveSummary } from "@/utils/summaries"
import { bigFive120 } from "@/data/questions-bf120"
import { sections_scs } from "@/data/questions-scs"

export type Language = 'fr' | 'en' | 'jp'

export type Question = {
  number: number
  text: Record<Language, string>
}

export type Section = {
  title: Record<Language, string>
  color?: string
  questions: Question[]
}

export type QuestionnaireDefinition = {
  id: string
  title: Record<Language, string>
  scaleMax: number
  instructions: Record<Language, string>
  ratingScale: Record<Language, string[]>
  sections: Section[]
  getSummary?: (responses: number[], lang: Language, allQuestions: { number: number }[]) => string
}

export const questionnaires: Record<string, QuestionnaireDefinition> = {
  scs: {
    id: "scs",
    title: {
      fr: "Auto-compassion",
      en: "Self-compassion",
      jp: "セルフ・コンパッション"
    },
    scaleMax: 5,
    instructions: {
      fr: "Veuillez indiquer à quelle fréquence vous vous comportez de la manière décrite dans chaque énoncé.",
      en: "Please indicate how often you behave in the stated manner.",
      jp: "以下の文にどのくらい当てはまるかを選んでください。"
    },
    ratingScale: {
      fr: [
        "Presque jamais",
        "Rarement",
        "Parfois",
        "Souvent",
        "Presque toujours"
      ],
      en: [
        "Almost never",
        "Rarely",
        "Sometimes",
        "Often",
        "Almost always"
      ],
      jp: [
        "ほとんどない",
        "たまにある",
        "ときどきある",
        "よくある",
        "ほぼ常にある"
      ]
    },
    sections: sections_scs,
    getSummary: getSCSSummary
  },

  bigfive: {
    id: "bigfive",
    title: {
      fr: "Big Five",
      en: "Big Five",
      jp: "ビッグファイブ"
    },
    scaleMax: 5,
    instructions: {
      fr: "Veuillez indiquer dans quelle mesure vous êtes d'accord avec chaque énoncé.",
      en: "Please indicate the extent to which you agree with each statement.",
      jp: "各文にどの程度同意するかを示してください。"
    },
    ratingScale: {
      fr: [
        "Pas du tout d'accord",
        "Plutôt pas d'accord",
        "Neutre",
        "Plutôt d'accord",
        "Tout à fait d'accord"
      ],
      en: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree"
      ],
      jp: [
        "まったく同意しない",
        "あまり同意しない",
        "どちらともいえない",
        "やや同意する",
        "非常に同意する"
      ]
    },
    sections: bigFive120.flatMap(factor => factor.sections),
    getSummary: getBigFiveSummary
  }
}
