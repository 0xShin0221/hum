# Hum — Use-Case Video Prompts

Generate in **16:9 / 1920×1080 / 6–8s loop**.  
Tools: Sora · Kling 1.6 (Professional, Motion: Low) · Runway Gen-3 (Motion: 3) · Pika 1.5 (Cinematic)

---

### Scene 01 — 通勤

Cinematic 16:9. A young Japanese professional stands in a moving Tokyo subway train, softly lit by morning window light. They stare gently ahead, lips barely moving — quietly capturing a thought hands-free through their wireless earbuds, one glowing faintly emerald green. Other passengers are softly blurred in the background. The train sways subtly. Handheld micro-movement, 85mm shallow depth of field, warm natural tones. No phone. No eye contact with camera. Apple commercial quality. 6–8 second seamless loop.

---

### Scene 02 — 会議後

Cinematic 16:9. A Japanese professional in smart-casual attire walks out of a glass-walled meeting room into a bright modern office corridor. Moving forward, they speak a few quiet words hands-free — wireless earbuds in, one with a faint emerald LED. Their expression is calm and focused, eyes slightly lifted as if recalling. Colleagues and whiteboards softly blurred behind glass. Warm overhead light, gentle tracking movement alongside the subject. 85mm, shallow DOF. Apple commercial quality. 6–8 second loop.

---

### Scene 03 — キッチン

Cinematic 16:9. A person stands at a clean Japanese kitchen counter in warm evening light, both hands actively cooking — chopping or stirring. Without pausing, they turn their head slightly and speak a few words into the air — completely hands-free via wireless earbuds, one glowing faint emerald. Steam drifts softly in the foreground. They immediately return their gaze to the cooking. Handheld micro-drift, 85mm, shallow DOF. Warm kitchen tones. Apple commercial quality. 6–8 second seamless loop.

---

### Scene 04 — 移動中

Cinematic 16:9. A young Japanese person walks alone on a clean Tokyo sidewalk in warm midday or golden-hour light. Mid-stride, they speak a quiet word or two — a brief "what was that?" — then a small natural expression shift as the answer arrives. Wireless earbuds in both ears, one with a faint emerald LED. City bokeh behind them: storefronts, parked bikes, soft pedestrians. Camera tracks gently alongside at shoulder height. 85mm, shallow DOF, warm airy tones. Apple commercial quality. 6–8 second loop.

---

### 組み込み

ファイル名: `case-commute.mp4` / `case-after-meeting.mp4` / `case-kitchen.mp4` / `case-on-the-move.mp4`  
配置先: `project/assets/`

```html
<div class="case__media" style="overflow:hidden;border-radius:var(--radius);">
  <video autoplay loop muted playsinline style="width:100%;height:100%;object-fit:cover;display:block;">
    <source src="project/assets/case-commute.mp4" type="video/mp4" />
  </video>
</div>
```
