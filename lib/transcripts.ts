import type { Lang } from './i18n'

export interface TranscriptLine {
  r: 'you' | 'ai'
  t: string
}

export type TranscriptPattern = 'A' | 'B' | 'C'

export const HUM_TRANSCRIPTS: Record<Lang, Partial<Record<TranscriptPattern, TranscriptLine[]>>> = {
  ja: {
    A: [
      { r: 'you', t: '今日のアイデア、残しておいて' },
      { r: 'ai',  t: '保存したよ。あとで見返せるようにするね' },
      { r: 'you', t: 'さっきの会議、要点だけまとめて' },
      { r: 'ai',  t: '3つに整理したよ。次のアクションもある' },
      { r: 'you', t: 'これも追加して。あとでリマインドして' },
      { r: 'ai',  t: '了解。ちょうどいい時間に知らせるね' },
    ],
    B: [
      { r: 'you', t: 'いまの考え、メモしておいて' },
      { r: 'ai',  t: '記録したよ。夕方に思い出せるようにするね' },
      { r: 'you', t: '今の会議、3行でまとめて' },
      { r: 'ai',  t: '要点を整理したよ。決定事項も残してある' },
      { r: 'you', t: 'これ、買い物の前に思い出させて' },
      { r: 'ai',  t: '追加したよ。出かける前に知らせるね' },
    ],
    C: [
      { r: 'you', t: 'これ、覚えておいて' },
      { r: 'ai',  t: '保存したよ' },
      { r: 'you', t: '会議をまとめて' },
      { r: 'ai',  t: '要点を整理したよ' },
      { r: 'you', t: 'あとで思い出させて' },
      { r: 'ai',  t: '了解。通知するね' },
    ],
  },
  en: {
    A: [
      { r: 'you', t: "Keep today's idea for me" },
      { r: 'ai',  t: "Saved. I'll keep it for you to revisit later" },
      { r: 'you', t: 'Sum up the meeting — just the points' },
      { r: 'ai',  t: 'Sorted into three. Next actions are there too' },
      { r: 'you', t: 'Add this. Remind me later' },
      { r: 'ai',  t: "Got it. I'll tell you at just the right time" },
    ],
  },
  zh: {
    A: [
      { r: 'you', t: '把今天的想法留下来' },
      { r: 'ai',  t: '已保存。之后方便你回看' },
      { r: 'you', t: '刚才的会议，只说要点' },
      { r: 'ai',  t: '整理成三条了，还有后续行动' },
      { r: 'you', t: '把这个也加上，稍后提醒我' },
      { r: 'ai',  t: '好的，会在合适的时间通知你' },
    ],
  },
  ko: {
    A: [
      { r: 'you', t: '오늘 떠오른 아이디어, 남겨줘' },
      { r: 'ai',  t: '저장했어요. 나중에 다시 볼 수 있게요' },
      { r: 'you', t: '방금 회의, 요점만 정리해줘' },
      { r: 'ai',  t: '세 가지로 정리했어요. 다음 할 일도 있어요' },
      { r: 'you', t: '이것도 추가하고, 나중에 알려줘' },
      { r: 'ai',  t: '알겠어요. 딱 맞는 시간에 알려드릴게요' },
    ],
  },
}
