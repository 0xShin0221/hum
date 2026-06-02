# Hum — Use-Case Video Prompts

## 前提

ヒーロー動画と同じ質感・スタイルで生成する。
カード表示は `4:3` だが、動画は `16:9` で生成し `object-fit:cover` でトリミングされる。
**主役（人物・耳元）は必ずフレーム中央に配置すること。**

---

## ヒーロー動画のスタイル定義（全シーン共通）

```
- 自然光。明るめ・暖色系。影に青みなし
- 中望遠（85mm相当）。被写界深度浅め、背景は柔らかくボケる
- 手持ち微振動あり。ズームなし、静かなドリフトのみ
- 日本の都市・生活空間。ストックフォト感ゼロ
- イヤーバッド両耳装着。片耳にごく微かなエメラルドグリーンの光（#12B76A）
- 6〜8秒ループ。Apple広告クオリティ
- 解像度: 1920×1080 / 16:9 / 60fps
```

---

## Scene 01 — 通勤（Commute）

```
Cinematic 16:9. A young Japanese professional stands in a moving 
Tokyo subway train, softly lit by morning window light. They stare 
gently ahead, lips barely moving — quietly capturing a thought 
hands-free through their wireless earbuds, one glowing faintly 
emerald green. Other passengers are softly blurred in the background. 
The train sways subtly. Handheld micro-movement, 85mm shallow depth 
of field, warm natural tones. No phone. No eye contact with camera. 
Apple commercial quality. 6–8 second seamless loop.
```

---

## Scene 02 — 会議後（After Meeting）

```
Cinematic 16:9. A Japanese professional in smart-casual attire 
walks out of a glass-walled meeting room into a bright modern 
office corridor. Moving forward, they speak a few quiet words 
hands-free — wireless earbuds in, one with a faint emerald LED. 
Their expression is calm and focused, eyes slightly lifted as if 
recalling. Colleagues and whiteboards softly blurred behind glass. 
Warm overhead light, gentle tracking movement alongside the subject. 
85mm, shallow DOF. Apple commercial quality. 6–8 second loop.
```

---

## Scene 03 — キッチン（Kitchen）

```
Cinematic 16:9. A person stands at a clean Japanese kitchen counter 
in warm evening light, both hands actively cooking — chopping or 
stirring. Without pausing, they turn their head slightly and speak 
a few words into the air — completely hands-free via wireless earbuds, 
one glowing faint emerald. Steam drifts softly in the foreground. 
They immediately return their gaze to the cooking. Handheld micro-drift, 
85mm, shallow DOF. Warm kitchen tones. Apple commercial quality. 
6–8 second seamless loop.
```

---

## Scene 04 — 移動中（On the Move）

```
Cinematic 16:9. A young Japanese person walks alone on a clean 
Tokyo sidewalk in warm midday or golden-hour light. Mid-stride, 
they speak a quiet word or two — a brief "what was that?" — then 
a small natural expression shift as the answer arrives. Wireless 
earbuds in both ears, one with a faint emerald LED. City bokeh 
behind them: storefronts, parked bikes, soft pedestrians. Camera 
tracks gently alongside at shoulder height. 85mm, shallow DOF, 
warm airy tones. Apple commercial quality. 6–8 second loop.
```

---

## ツール別設定

| ツール | 設定 |
|---|---|
| **Kling 1.6** | Professional / Motion: Low / AR: 16:9 / 7s |
| **Runway Gen-3 Alpha** | Motion intensity: 3 / AR: 16:9 / 8s |
| **Sora** | AR: 16:9 / Duration: 8s / Loop: ON |
| **Pika 1.5** | Style: Cinematic / Camera: Gentle drift / 16:9 |

4本を同一ツール・同一セッションで生成すると色調が揃いやすい。

---

## HTMLへの組み込み

```
project/assets/case-commute.mp4
project/assets/case-after-meeting.mp4
project/assets/case-kitchen.mp4
project/assets/case-on-the-move.mp4
```

```html
<div class="case__media" style="overflow:hidden; border-radius:var(--radius);">
  <video autoplay loop muted playsinline
         style="width:100%; height:100%; object-fit:cover; display:block;">
    <source src="project/assets/case-commute.mp4" type="video/mp4" />
  </video>
</div>
```
