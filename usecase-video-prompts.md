# Hum — Use-Case Video Prompts

**ヒーロー動画と同一人物・同一世界観で揃える。**  
Generate: **16:9 / 1920×1080 / 6–8s seamless loop**

---

### Scene 01 — 通勤

A woman in her early 30s with a blonde chin-length bob sits in a modern train seat, wearing a beige trench coat over a white shirt. She looks out the large window with a calm, content expression as morning sunlight streams in from the side. White wireless earbuds in her ears — the left earbud stem glows bright emerald green. The train moves gently; she sways slightly with it. Seat fabric is dark navy blue. Background is softly blurred. Warm natural light, cinematic, premium commercial quality. 16:9, 6–8 second seamless loop.

---

### Scene 02 — 会議後

A woman in her early 30s with a blonde chin-length bob walks purposefully through a modern glass-walled office corridor, holding a laptop or documents against her chest. She wears a beige trench coat over a white shirt. The left earbud stem glows bright emerald green. Large floor-to-ceiling windows on one side flood the space with soft daylight. Colleagues are silhouetted or softly blurred in the background. Her expression is focused and calm. Smooth tracking camera movement alongside her. Cinematic, premium commercial quality. 16:9, 6–8 second seamless loop.

---

### Scene 03 — キッチン

A woman in her early 30s with a blonde chin-length bob stands at a luxury kitchen island in warm golden-hour light. She wears a light grey crew-neck sweater. White wireless earbuds in her ears — the left earbud stem glows bright emerald green. She chops vegetables on a wooden board with one hand while stirring a pan on the induction cooktop with the other. The induction cooktop emits a bright emerald green ring of light beneath the pan. Kitchen has warm oak wood cabinets, white marble backsplash, black built-in oven. Cinematic, premium commercial quality. 16:9, 6–8 second seamless loop.

---

### Scene 04 — 移動中

A woman in her early 30s with a blonde chin-length bob walks alone on a clean urban sidewalk in warm golden-hour light. She wears a light beige or cream casual outfit. White wireless earbuds in her ears — the left earbud stem glows bright emerald green. She walks at a natural pace, glancing slightly upward as if recalling something, then a quiet expression of recognition crosses her face. City background is softly blurred: storefronts, parked cars, soft pedestrians. Smooth camera tracks gently alongside at shoulder height. Cinematic, premium commercial quality. 16:9, 6–8 second seamless loop.

---

### ツール設定

| ツール | 設定 |
|---|---|
| **Kling 1.6** | Professional / Motion: Low / AR: 16:9 / 8s |
| **Runway Gen-3 Alpha** | Motion intensity: 3 / AR: 16:9 / 8s |
| **Sora** | AR: 16:9 / Duration: 8s / Loop: ON |

**同一キャラクターで揃えるには：** まず1枚のリファレンス画像（ヒーロー動画のスクリーンショット）をアップロードし、Image-to-Video または Character Reference 機能を使う。

---

### 組み込み

```
project/assets/case-commute.mp4
project/assets/case-after-meeting.mp4
project/assets/case-kitchen.mp4
project/assets/case-on-the-move.mp4
```

```html
<div class="case__media" style="overflow:hidden;border-radius:var(--radius);">
  <video autoplay loop muted playsinline
         style="width:100%;height:100%;object-fit:cover;display:block;">
    <source src="project/assets/case-commute.mp4" type="video/mp4" />
  </video>
</div>
```
