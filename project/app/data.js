/* ============================================================
   Hum App — mock data (JP-first, matches LP world)
   ============================================================ */
window.HUM_DATA = {
  user: { name: "あなた", initial: "Y" },

  // ---- Today: live status + recent ----
  now: {
    state: "listening", // listening | dispatching | idle
    headline: "聞いています",
    sub: "話しかければ、Claudeにタスクを渡します",
  },
  agenda: [
    { time: "14:30", title: "デザインレビュー", tag: "Calendar", soon: true },
    { time: "17:00", title: "牛乳を買う", tag: "Reminder", soon: false },
    { time: "明日 10:00", title: "1on1 — 佐藤さん", tag: "Calendar", soon: false },
  ],
  captures: [
    { id: "c1", time: "たった今", text: "新機能のオンボーディング、3ステップに減らすアイデア", src: "voice", icon: "spark" },
    { id: "c2", time: "12分前", text: "API移行は来週の水曜までに完了させる", src: "voice", icon: "spark" },
    { id: "c3", time: "1時間前", text: "会議：Q3ロードマップ — 要点を3つに整理済み", src: "meeting", icon: "doc" },
    { id: "c4", time: "今朝 8:24", text: "通勤中：ポッドキャストの「集中の作法」をあとで聴く", src: "voice", icon: "spark" },
  ],

  // ---- Dispatch: scripted Claude agent runs ----
  // each run: user utterance -> Claude plan -> tool calls (some need approval) -> result
  dispatch: {
    intro: [
      { role: "ai", text: "おはようございます。今日のタスク、声で渡してください。" },
    ],
    runs: [
      {
        id: "r1",
        you: "さっきの会議、要点だけまとめて。決まったことはカレンダーにも入れて。",
        plan: "会議の文字起こしを取得 → 要約 → 決定事項を抽出 → カレンダー登録（承認制）",
        steps: [
          { kind: "tool", tool: "memory.search", server: "Hum Memory", args: "query: \"Q3ロードマップ 会議\"", status: "ok", result: "文字起こし 42分・参加者4名 を取得" },
          { kind: "think", text: "要点を3つに整理。アクション2件を検出。" },
          { kind: "tool", tool: "calendar.createEvent", server: "Google Calendar", args: "「API移行レビュー」7/9 15:00", status: "approval",
            approveResult: "イベントを作成しました（7/9 15:00）", denyResult: "カレンダー登録をスキップしました" },
        ],
        summary: {
          title: "Q3ロードマップ 会議",
          points: ["オンボーディングを3ステップに簡素化", "API移行は7/9までに完了", "課金画面の刷新はQ4へ延期"],
          actions: ["@あなた：移行スケジュールを共有", "@佐藤：課金要件を再定義"],
        },
      },
      {
        id: "r2",
        you: "来週の出張、ホテルとフライトの候補を3つ調べて、比較表にして。",
        plan: "Web検索（並列サブエージェント）→ 価格と立地で比較 → 表に整形",
        steps: [
          { kind: "subagents", text: "サブエージェント3体を並列起動：フライト / ホテル / 現地交通" },
          { kind: "tool", tool: "web.search", server: "Web", args: "羽田→福岡 7/14 往復", status: "ok", result: "3便を取得（ANA / JAL / SKY）" },
          { kind: "tool", tool: "web.search", server: "Web", args: "博多 駅近 ホテル 7/14", status: "ok", result: "条件に合う宿 5件" },
          { kind: "think", text: "価格・移動時間・評価で上位3件に絞り込み。" },
        ],
        table: {
          cols: ["", "便/宿", "価格", "メモ"],
          rows: [
            ["✈️", "ANA 241", "¥28,400", "8:00発・最速"],
            ["✈️", "SKY 013", "¥16,900", "9:15発・最安"],
            ["🏨", "博多グリーン", "¥11,200/泊", "駅徒歩2分"],
          ],
        },
      },
    ],
  },

  // ---- Memory ----
  memoryFilters: ["すべて", "アイデア", "会議", "リマインド", "通勤"],
  memory: [
    { id:"m1", time:"たった今", cat:"アイデア", text:"オンボーディングを3ステップに減らす。最初の価値到達までを短く。", src:"voice" },
    { id:"m2", time:"12分前", cat:"リマインド", text:"API移行は来週水曜まで。テスト環境を先に用意。", src:"voice" },
    { id:"m3", time:"1時間前", cat:"会議", text:"Q3ロードマップ会議の要点と決定事項。", src:"meeting" },
    { id:"m4", time:"今朝 8:24", cat:"通勤", text:"「集中の作法」をあとで聴く。深い作業は午前に寄せる。", src:"voice" },
    { id:"m5", time:"昨日 21:10", cat:"アイデア", text:"ヒーロー動画、会話オーバーレイは左下2行が一番きれい。", src:"voice" },
    { id:"m6", time:"昨日 18:02", cat:"リマインド", text:"母の誕生日プレゼントを今週中に注文。", src:"voice" },
    { id:"m7", time:"月曜", cat:"会議", text:"採用面接の振り返り。次は実技課題を追加する。", src:"meeting" },
    { id:"m8", time:"日曜", cat:"アイデア", text:"週次レビューのテンプレを固定化したい。", src:"voice" },
  ],

  // ---- Meeting Notes ----
  meetings: [
    { id:"mt1", title:"Q3ロードマップ", date:"今日 13:00", dur:"42分", people:4, decided:3,
      summary:"オンボーディング簡素化、API移行の期限確定、課金刷新のQ4延期を合意。",
      points:["オンボーディングを3→ステップに簡素化","API移行は7/9までに完了","課金画面の刷新はQ4へ延期","計測ダッシュボードを今週中に用意"],
      decisions:["移行期限：7/9（水）","課金刷新：Q4にリスケ"],
      actions:[{who:"あなた",what:"移行スケジュールを共有",done:false},{who:"佐藤",what:"課金要件を再定義",done:false},{who:"田中",what:"計測ダッシュボード作成",done:true}] },
    { id:"mt2", title:"採用面接 振り返り", date:"月曜 16:30", dur:"28分", people:3, decided:2,
      summary:"面接プロセスに実技課題を追加。評価基準のばらつきを是正。",
      points:["実技課題を選考に追加","評価シートの基準を明文化","一次面接は45分に短縮"],
      decisions:["実技課題を次回から導入","評価シート改定"],
      actions:[{who:"あなた",what:"課題セットを用意",done:false},{who:"鈴木",what:"評価シート改定",done:false}] },
    { id:"mt3", title:"デザイン定例", date:"先週 金 11:00", dur:"35分", people:5, decided:1,
      summary:"ランディングは動画主役の方向で確定。会話オーバーレイのトーンを統一。",
      points:["動画ファーストのLPで合意","会話は左下2行・黒/白で切替","ダウンロードCTAを2つに整理"],
      decisions:["動画主役の構成で進行"],
      actions:[{who:"あなた",what:"ヒーローLPを実装",done:true}] },
  ],

  // ---- Connectors (MCP) ----
  connectors: [
    { id:"cal", name:"Google Calendar", desc:"予定の閲覧・作成", status:"connected", scope:"読み取り・書き込み", letter:"C", hue:"#4285F4" },
    { id:"gmail", name:"Gmail", desc:"メールの検索・下書き", status:"connected", scope:"読み取り・下書き", letter:"M", hue:"#EA4335" },
    { id:"slack", name:"Slack", desc:"メッセージの送信・検索", status:"connected", scope:"送信・読み取り", letter:"S", hue:"#611f69" },
    { id:"drive", name:"Google Drive", desc:"ファイルの検索・要約", status:"review", scope:"読み取りのみ", letter:"D", hue:"#1FA463" },
    { id:"github", name:"GitHub", desc:"Issue・PRの操作", status:"disconnected", scope:"—", letter:"G", hue:"#8b8b8b" },
    { id:"notion", name:"Notion", desc:"ページの作成・検索", status:"disconnected", scope:"—", letter:"N", hue:"#9b9b9b" },
  ],
};
