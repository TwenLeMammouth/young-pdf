import { Language, Section } from "./questionnaires"

export type SCSQuestion = {
  number: number
  subscale: 'selfKindness' | 'selfJudgment' | 'commonHumanity' | 'isolation' | 'mindfulness' | 'overIdentification'
  text: Record<Language, string>
}

const subscaleTitles: Record<string, Record<Language, string>> = {
  selfKindness: {
    fr: "Bienveillance envers soi",
    en: "Self-Kindness",
    jp: "自己への優しさ"
  },
  selfJudgment: {
    fr: "Auto-jugement",
    en: "Self-Judgment",
    jp: "自己批判"
  },
  commonHumanity: {
    fr: "Humanité partagée",
    en: "Common Humanity",
    jp: "共通の人間性"
  },
  isolation: {
    fr: "Isolement",
    en: "Isolation",
    jp: "孤立"
  },
  mindfulness: {
    fr: "Pleine conscience",
    en: "Mindfulness",
    jp: "マインドフルネス"
  },
  overIdentification: {
    fr: "Sur-identification",
    en: "Over-Identification",
    jp: "過剰な同一化"
  }
}

export const scsQuestions: SCSQuestion[] = [
  {
    number: 1,
    subscale: "selfJudgment",
    text: {
      fr: "Je désapprouve et juge mes propres défauts et insuffisances.",
      en: "I’m disapproving and judgmental about my own flaws and inadequacies.",
      jp: "自分自身の欠点や不十分なところについて，不満に思っているし，批判的である。 "
    }
  },
  {
    number: 2,
    subscale: "overIdentification",
    text: {
      fr: "Lorsque je me sens mal, j'ai tendance à être obsédé(e) et à focaliser sur tout ce qui neva pas.",
      en: "When I’m feeling down I tend to obsess and fixate on everything that’s wrong.",
      jp: "気分が落ち込んだときには，間違ったことすべてについて，くよくよと心配し，こだわる傾向にある。 "
    }
  },
  {
    number: 3,
    subscale: "commonHumanity",
    text: {
      fr: "Quand les choses vont mal pour moi, je vois ces difficultés comme faisant partie de la vie que chacun traverse.",
      en: "When things are going badly for me, I see the difficulties as part of life that everyone goes through.",
      jp: "自分にとって物事が悪い方向に向かっているとき，そうした困難は誰もが経験するような人生の一場面に過ぎないと考える。 "
    }
  },
  {
    number: 4,
    subscale: "isolation",
    text: {
      fr: "Quand je pense à mes insuffisances, je me sens différent(e) et coupé(e) du reste du monde.",
      en: "When I think about my inadequacies, it tends to make me feel more separate and cut off from the rest of the world.",
      jp: "自分の不十分なところについて考えると，自分以外の世界から切り離され，排除されたような気分になりがちである。 "
    }
  },
  {
    number: 5,
    subscale: "selfKindness",
    text: {
      fr: "J'essaye d'être aimant(e) envers moi-même quand je souffre.",
      en: "I try to be loving towards myself when I’m feeling emotional pain.",
      jp: "感情的な苦痛を感じているとき，自分自身にやさしくする。"
    }
  },
  {
    number: 6,
    subscale: "overIdentification",
    text: {
      fr: "Quand j'échoue à quelque chose d'important pour moi, je suis envahi(e) par un sentiment de ne pas être à la hauteur.",
      en: "When I fail at something important to me I become consumed by feelings of inadequacy.",
      jp: "自分にとって重要なことを失敗したとき，無力感で頭がいっぱいになる。"
    }
  },
  {
    number: 7,
    subscale: "commonHumanity",
    text: {
      fr: "Quand je me sens déprimé(e), je me rappelle qu'il y a beaucoup d'autres personnes dans le monde qui ressentent la même chose.",
      en: "When I'm down, I remind myself that there are lots of other people in the world feeling like I am.",
      jp: "気分がどん底のときには，自分と同じような気持ちになっている人が世界には大勢いるということを思い出すようにする。 "
    }
  },
  {
    number: 8,
    subscale: "selfJudgment",
    text: {
      fr: "Quand les choses vont vraiment mal, j'ai tendance à être dur(e) envers moi-même.",
      en: "When times are really difficult, I tend to be tough on myself.",
      jp: "本当につらいとき，自分自身に批判的になる傾向がある。"
    }
  },
  {
    number: 9,
    subscale: "mindfulness",
    text: {
      fr: "Quand quelque chose me contrarie, j'essaye de garder mes émotions en équilibre.",
      en: "When something upsets me I try to keep my emotions in balance.",
      jp: "何かで苦しい思いをしたときには，感情を適度なバランスに保つようにする。"
    }
  },
  {
    number: 10,
    subscale: "commonHumanity",
    text: {
      fr: "Quand je ne me sens pas à la hauteur d'une quelconque façon, j'essaye de me rappeler que ce sentiment est partagé par la plupart des gens.",
      en: "When I feel inadequate in some way, I try to remind myself that feelings of inadequacy are shared by most people.",
      jp: "自分自身にどこか不十分なところがあると感じると，多くの人も不十分であるという気持ちを共有していることを思い出すようにする。"
    }
  },
  {
    number: 11,
    subscale: "selfJudgment",
    text: {
      fr: "Je suis intolérant(e) et impatient(e) envers les aspects de ma personnalité que je n'aime pas.",
      en: "I’m intolerant and impatient towards those aspects of my personality I don't like.",
      jp: "自分のパーソナリティの好きでないところについては，やさしくなれないし，いらだちを感じる。"
    }
  },
  {
    number: 12,
    subscale: "selfKindness",
    text: {
      fr: "Quand je traverse une période très difficile, je me donne le soin et la tendresse dont j'ai besoin.",
      en: "When I’m going through a very hard time, I give myself the caring and tenderness I need.",
      jp: "苦労を経験しているとき，必要とする程度に自分自身をいたわり，やさしくする。"
    }
  },
  {
    number: 13,
    subscale: "isolation",
    text: {
      fr: "Quand je me sens mal, j'ai tendance à avoir l'impression que les autres sont plus heureux que moi.",
      en: "When I’m feeling down, I tend to feel like most other people are probably happier than I am.",
      jp: "気分が落ち込んだとき，多くの人がおそらく自分より幸せであるという気持ちになりがちである。"
    }
  },
  {
    number: 14,
    subscale: "mindfulness",
    text: {
      fr: "Quand quelque chose de douloureux se produit, j'essaye d'avoir une vision équilibrée de la situation.",
      en: "When something painful happens I try to take a balanced view of the situation.",
      jp: "何か苦痛を感じることが起こったとき，その状況についてバランスのとれた見方をするようにする。"
    }
  },
  {
    number: 15,
    subscale: "commonHumanity",
    text: {
      fr: "J'essaye de voir mes défauts comme faisant partie de la condition humaine.",
      en: "I try to see my failings as part of the human condition.",
      jp: "自分の失敗は，人間のありようの１つであると考えるようにしている。"
    }
  },
  {
    number: 16,
    subscale: "selfJudgment",
    text: {
      fr: "Quand je vois des aspects de moi-même que je n'aime pas, je me critique.",
      en: "When I see aspects of myself that I don’t like, I get down on myself.",
      jp: "自分自身について自分が好きでない点について考えたとき，自分自身を批判的に考えてしまう。"
    }
  },
  {
    number: 17,
    subscale: "mindfulness",
    text: {
      fr: "Quand j'échoue à quelque chose d'important pour moi j'essaye de garder les choses en perspective.",
      en: "When I fail at something important to me I try to keep things in perspective.",
      jp: "自分にとって大切なことを失敗したときは，偏りがないように物事をとらえるようにする。"
    }
  },
  {
    number: 18,
    subscale: "isolation",
    text: {
      fr: "Quand c'est vraiment difficile pour moi, j'ai tendance à penser que la vie est plus facile pour les autres.",
      en: "When I’m really struggling, I tend to feel like other people must be having an easier time of it.",
      jp: "自分が悪戦苦闘しているときに，他の人はもっと楽をしているに違いないという気持ちになりやすい。"
    }
  },
  {
    number: 19,
    subscale: "selfKindness",
    text: {
      fr: "Je suis bienveillant(e) envers moi-même quand je souffre.",
      en: "I’m kind to myself when I’m experiencing suffering.",
      jp: "苦しみを経験しているとき，自分自身にやさしくする。"
    }
  },
  {
    number: 20,
    subscale: "overIdentification",
    text: {
      fr: "Quand quelque chose me perturbe, je me laisse emporter par mes sentiments.",
      en: "When something upsets me I get carried away with my feelings.",
      jp: "何かで苦痛を感じているとき，感情で頭がいっぱいになってしまう。"
    }
  },
  {
    number: 21,
    subscale: "selfJudgment",
    text: {
      fr: "Je suis dur(e) envers moi-même quand je ressens de la souffrance.",
      en: "I can be a bit cold-hearted towards myself when I'm experiencing suffering. ",
      jp: "自分が苦しんでいるとき，自分自身に少し冷たい気持ちになることがある。"
    }
  },
  {
    number: 22,
    subscale: "mindfulness",
    text: {
      fr: "Quand je suis déprimé(e), je cherche à approcher mes sentiments avec curiosité et ouverture.",
      en: "When I'm feeling down I try to approach my feelings with curiosity and openness.",
      jp: "気分が落ち込んでいるとき，自分の感情に関心を持ち，心を開いて対処しようとする。"
    }
  },
  {
    number: 23,
    subscale: "selfKindness",
    text: {
      fr: "Je suis tolérant(e) avec mes propres défauts et insuffisances.",
      en: "I’m tolerant of my own flaws and inadequacies. ",
      jp: "自分自身の欠点と不十分なところについては，やさしい目で見るようにしている。"
    }
  },
  {
    number: 24,
    subscale: "overIdentification",
    text: {
      fr: "Quand quelque chose de douloureux se produit, j'ai tendance à donner une importance hors de proportion à l'incident.",
      en: "When something painful happens I tend to blow the incident out of proportion. ",
      jp: "何か苦痛を感じることが起こったとき，その出来事を大げさに考える傾向がある。"
    }
  },
  {
    number: 25,
    subscale: "isolation",
    text: {
      fr: "Quand j'échoue à quelque chose d'important pour moi, j'ai tendance à me sentir seul(e) dans mon échec.",
      en: "When I fail at something that's important to me, I tend to feel alone in my failure.",
      jp: "自分にとって大切な何かに失敗したとき，自分の失敗の中でひとりぼっちでいるように感じる傾向がある。"
    }
  },
  {
    number: 26,
    subscale: "selfKindness",
    text: {
      fr: "J'essaye d'être compréhensif(ve) et patient(e) envers les aspects de ma personnalité que je n'aime pas.",
      en: "I try to be understanding and patient towards those aspects of my personality I don't like.",
      jp: "自分のパーソナリティの好きでないところについては理解し，やさしい目で見るようにしている。 "
    }
  }
]

export const sections_scs: Section[] = Object.values(
  scsQuestions.reduce((acc, q) => {
    const key = q.subscale
    if (!acc[key]) {
      acc[key] = {
        title: subscaleTitles[key],
        questions: []
      }
    }
    acc[key].questions.push({
      number: q.number,
      text: q.text
    })
    return acc
  }, {} as Record<string, Section>)
)