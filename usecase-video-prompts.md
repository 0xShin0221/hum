# Hum — Use-Case Video Generation Prompts

## 表示仕様の理解（プロンプト設計の前提）

```
レイアウト: 2カラムグリッド（テキスト ＋ 動画、交互配置）
アスペクト比: 4:3（ヒーローの16:9とは別物）
表示幅: デスクトップで約560〜600px（ページ幅の半分）
役割: テキストが文脈を語る。動画はその"一瞬"を視覚的に裏付けるだけでよい
ループ: autoplay loop muted — 短くシームレスにつながればよい
```

つまり：
- 広角の風景ショットは不要。**人物がフレームの主役**
- **4:3（縦寄り）フレーミング**で、余白より人物密度を高く
- カメラ動きは最小限。動画が小さく表示されるため、激しい動きは潰れる
- 1本につき**1アクション・1シチュエーション**に絞る
- 長さは**4〜6秒**で十分（小カードのループ用）

---

## 全動画共通スタイル

```
Subject: Japanese person, late 20s–early 30s, casual or smart-casual
Earbuds: small wireless earbuds, one ear showing faint emerald LED (#12B76A)
Color grade: warm natural, slightly bright, low saturation shadows, no blue tones
Lens: 85mm equivalent, shallow DOF, background softly blurred
Camera: minimal movement — gentle breathing or very slow drift only
Aspect ratio: 4:3
Duration: 4–6 seconds, seamlessly loopable
Quality reference: Apple product lifestyle photography, not stock footage
```

---

## Scene 01 — 通勤（Commute）
**配置**: 奇数（テキスト右 / 動画左）

**見せたい一瞬**: 電車内で目を少し閉じ、口元がかすかに動く——声でメモしている瞬間

```
Medium close-up, 4:3 frame. Japanese person standing in a Tokyo 
subway car, gripping a handrail with one hand. Eyes close briefly, 
lips move almost imperceptibly — speaking a quiet thought hands-free. 
Small wireless earbuds, faint emerald LED on one ear. Soft window 
light from the side. Other passengers softly blurred in background. 
Minimal camera movement, gentle sway of the train. 85mm, shallow DOF. 
Warm natural tones. 4–6 seconds, loopable.
```

**NG**: 広い車内全景 / 笑顔でカメラ目線 / スマホ操作

---

## Scene 02 — 会議後（After Meeting）
**配置**: 偶数（テキスト左 / 動画右）

**見せたい一瞬**: 廊下を数歩歩きながら、視線をわずかに上に向け口を動かす——歩きながら指示している瞬間

```
Medium shot, 4:3 frame. Japanese professional walking through a 
modern office corridor, viewed from a slight angle. Face and upper 
body clearly visible. Small wireless earbuds, faint emerald LED. 
Lips move slightly mid-stride — dictating, not on a phone call. 
Eyes glance upward briefly as if recalling. Glass meeting room 
blurred behind them. Soft overhead office light. Almost no camera 
movement. 85mm, shallow DOF. 4–6 seconds, loopable.
```

**NG**: 会議室全景 / ノートPCやスマホ / 同僚との会話シーン

---

## Scene 03 — キッチン（Kitchen）
**配置**: 奇数（テキスト右 / 動画左）

**見せたい一瞬**: まな板で手を動かしたまま、顔だけ少し横を向いて一言話す——手を止めない

```
Medium close-up, 4:3 frame. Japanese person at a kitchen counter, 
both hands actively chopping vegetables or stirring a pot. They 
turn their head slightly to the side and speak a few words — 
completely hands-free — then immediately look back at what they're 
cooking. Small wireless earbuds, faint emerald LED visible. Warm 
kitchen light, slight steam in foreground. Shallow DOF, counter 
and food softly in mid-ground. Near-static camera, very gentle drift. 
4–6 seconds, loopable.
```

**NG**: スマホを見ている / 手が止まっている / 料理が主役になっている

---

## Scene 04 — 移動中（On the Move）
**配置**: 偶数（テキスト左 / 動画右）

**見せたい一瞬**: 歩きながら一言つぶやき、すぐに「あ、そうだ」という小さな表情変化——思い出した瞬間

```
Medium shot, 4:3 frame. Japanese person walking on a clean urban 
Tokyo sidewalk. Face and chest fill most of the 4:3 frame. They 
speak briefly mid-stride, then a subtle shift in expression — 
a micro-realization, like "ah, right." Small wireless earbuds, 
faint emerald LED on one ear. Soft city background, blurred 
storefronts and street. Gentle tracking alongside at shoulder height, 
minimal movement. Warm midday or golden hour light. 85mm, shallow DOF. 
4–6 seconds, loopable.
```

**NG**: 渋谷スクランブル交差点 / 観光地 / 雨 / 夜間 / スマホ操作

---

## ツール別メモ

| ツール | 推奨設定 |
|---|---|
| **Kling 1.6** | Professional mode / Motion: Low(1–2) / AR: 4:3 |
| **Runway Gen-3 Alpha** | Duration: 5s / Motion intensity: 2–3 / AR: 4:3 |
| **Sora** | Duration: 5s / Aspect ratio: 4:3 / Loop: ON |
| **Pika 1.5** | Style: Cinematic / Camera: Static or gentle drift / 4:3 |

**4本の統一性を出すコツ**: 同ツールで同一日に、同じシード値かキャラクター参照を使って生成する。

---

## 一貫性チェックリスト

- [ ] 全4本、アスペクト比が4:3になっているか
- [ ] 人物がフレームの主役（背景に埋もれていないか）
- [ ] 各動画に「話している」瞬間が1回入っているか
- [ ] イヤーバッドにエメラルドの光がうっすらあるか
- [ ] カメラ動きが控えめか（小カード表示で潰れない）
- [ ] ループポイントが不自然でないか
- [ ] テキスト・UI・ブランドロゴが映り込んでいないか

---

## HTML への組み込み

```
project/assets/case-commute.mp4       (4:3)
project/assets/case-after-meeting.mp4 (4:3)
project/assets/case-kitchen.mp4       (4:3)
project/assets/case-on-the-move.mp4   (4:3)
```

各 `.ph.case__media` を置き換え：

```html
<div class="case__media">
  <video autoplay loop muted playsinline style="width:100%;height:100%;object-fit:cover;">
    <source src="project/assets/case-commute.mp4" type="video/mp4" />
  </video>
</div>
```
