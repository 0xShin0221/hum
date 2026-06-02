# Hum — Use-Case Video Generation Prompts

4本のループ動画（各6〜8秒）。ヒーロー動画と同じトーンで統一する。

---

## Visual Style Reference（全動画共通）

ヒーロー動画から抽出したスタイル指針：

- **被写体**: 20代後半〜30代の日本人。清潔感のある私服またはオフィスカジュアル
- **イヤーバッド**: 両耳装着。片耳にごく微かなエメラルドグリーンの発光（#12B76A）
- **カラーグレード**: 明るめのナチュラル。彩度は控えめ。シャドウは青みゼロ。Apple TV広告に近いトーン
- **映像感**: 映画的なリアリズム。ストックフォト感ゼロ。ドキュメンタリー的な自然さ
- **カメラ**: 中望遠（85mm〜135mm相当）。被写界深度浅め。手持ちの微振動あり
- **解像度**: 1920×1080 / 60fps推奨（ループ用）
- **ループ**: 終端が始端に自然につながるようカット

---

## Scene 01 — 通勤（Commute）

**コンセプト**: 満員電車の中、アイデアが浮かんでHumに話しかける瞬間

### Sora / Runway Gen-3 / Kling 用プロンプト（英語）

```
A young Japanese professional, late 20s, standing in a moderately 
crowded Tokyo subway train during morning rush hour. Natural window 
light illuminates one side of their face. They wear small wireless 
earbuds with a faint emerald green LED glow. Eyes close slightly as 
they quietly speak — lips barely moving — as if dictating a thought. 
Other passengers slightly blurred in background. Handrail in foreground, 
soft bokeh city scenery through train window. Cinematic, warm natural 
light, shallow depth of field, 85mm lens aesthetic. Subtle handheld 
camera movement. Loopable 6–8 seconds. Apple commercial quality.
```

**スタイル強化タグ（Midjourney / Pika 等）**
```
cinematic, natural light, Tokyo commute, shallow DOF, warm tones, 
documentary realism, Apple ad aesthetic, 85mm portrait, handheld, 
subtle motion blur, no text, no UI overlay
```

**ネガティブプロンプト**
```
stock footage look, oversaturated, posed, studio lighting, 
artificial background, smiling at camera, text overlay, logo
```

---

## Scene 02 — 会議後（After Meeting）

**コンセプト**: 会議室を出て廊下を歩きながら、すぐに「まとめて」と話す

### Sora / Runway Gen-3 / Kling 用プロンプト（英語）

```
A Japanese professional in business casual attire walks briskly through 
a modern office corridor, just exiting a glass-walled meeting room 
visible in the background. They wear small wireless earbuds, one with 
a faint emerald green light. Their expression is focused, slightly 
relieved — post-meeting. They speak quietly as they walk, glancing 
slightly upward as if recalling information. Warm overhead office 
lighting, blurred colleagues and whiteboards in background. Smooth 
dolly-like camera movement following from the side. Cinematic, 
corporate-minimal aesthetic. 6–8 seconds, loopable.
```

**スタイル強化タグ**
```
cinematic office, natural overhead light, Tokyo workplace, 
post-meeting energy, shallow DOF, warm white tones, 
documentary style, 85mm, smooth tracking shot
```

**ネガティブプロンプト**
```
cheesy stock footage, fake smile, staged pose, bright colors, 
cluttered background, looking at camera, phone in hand
```

---

## Scene 03 — キッチン（Kitchen）

**コンセプト**: 料理中、両手がふさがったまま声でリマインドをセット

### Sora / Runway Gen-3 / Kling 用プロンプト（英語）

```
A person in a clean modern Japanese kitchen, casually dressed, 
chopping vegetables or stirring a pot. Both hands fully occupied. 
They wear small wireless earbuds with one faint emerald green LED. 
They turn their head slightly and speak a few words hands-free, 
then look back at what they're cooking — natural, effortless. 
Warm evening kitchen light, steam subtly rising. Shallow depth of 
field on the subject, cooking surface in mid-ground. Handheld 
camera, slight drift. Cinematic food-documentary aesthetic. 
6–8 seconds, seamlessly loopable.
```

**スタイル強化タグ**
```
cinematic kitchen, warm evening light, hands-free, cooking, 
Japanese home interior, shallow DOF, steam, natural motion, 
documentary warmth, 85mm, handheld drift
```

**ネガティブプロンプト**
```
stock photo kitchen, too bright, plastic look, 
looking at camera, phone usage, cluttered countertop, 
artificial lighting, smiling pose
```

---

## Scene 04 — 移動中（On the Move）

**コンセプト**: 街を歩きながら、ふと「あれ何だっけ」と記憶を呼び出す

### Sora / Runway Gen-3 / Kling 用プロンプト（英語）

```
A young Japanese person walking alone on a clean urban Tokyo sidewalk, 
mid-day or golden hour. Wireless earbuds in both ears, faint emerald 
LED on one. They walk at a natural pace, briefly speak a few words 
mid-stride — a casual "what was that again?" moment — then a slight 
look of recognition as if the answer arrived. City blur in background: 
storefronts, parked bikes, soft pedestrians. Camera tracks alongside 
at shoulder height, gentle parallax. Cinematic, slight lens flare, 
airy warm tones. 6–8 seconds, loopable.
```

**スタイル強化タグ**
```
cinematic street, Tokyo pedestrian, golden hour OR midday, 
city bokeh, tracking shot, shallow DOF, airy warm tones, 
lens flare subtle, earbuds, recall moment, documentary
```

**ネガティブプロンプト**
```
tourist shot, wide angle distortion, crowded Shibuya crossing, 
rain, nighttime, looking at camera, phone in hand, 
stock footage movement, fast cuts
```

---

## ツール別 使い方メモ

### Sora（OpenAI）
- プロンプトをそのまま貼り付け
- Duration: 6s または 8s
- Aspect ratio: 16:9
- 「Make loopable」オプションを有効にする

### Runway Gen-3 Alpha
- Text-to-Video モードで上記プロンプトを入力
- Motion intensity: 3〜4（控えめ）
- Duration: 8s
- Seeds: 全4本で同じSeedを試すと色調が揃いやすい

### Kling 1.6（推奨）
- 人物リアリズムが最も高い
- Professional mode を使う
- プロンプト末尾に `--ar 16:9 --style realistic` を追加
- 4本を生成後、同一モデルで Character consistency オプションを活用

### Pika 1.5
- 上記プロンプトの短縮版を使用（150字以内に絞る）
- Style preset: Cinematic
- Camera: Tracking / Dolly

---

## 一貫性チェックリスト

生成後、以下を確認して揃える：

- [ ] イヤーバッド形状が4本で統一されているか
- [ ] エメラルドの発光（#12B76A）が控えめにあるか
- [ ] 色温度がヒーロー動画と近いか（過度に青くないか）
- [ ] 人物は全員「話している」瞬間が含まれているか
- [ ] ループポイントで映像が自然につながるか
- [ ] テキスト・UI・ロゴが映り込んでいないか

---

## HTML への組み込み方

動画が完成したら `project/assets/` に以下の名前で配置：

```
project/assets/case-commute.mp4
project/assets/case-after-meeting.mp4
project/assets/case-kitchen.mp4
project/assets/case-on-the-move.mp4
```

`Hum.html` の各 `.ph.case__media` を以下に置き換え：

```html
<!-- Scene 01 の例 -->
<div class="case__media">
  <video autoplay loop muted playsinline>
    <source src="project/assets/case-commute.mp4" type="video/mp4" />
  </video>
</div>
```
