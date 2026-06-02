/* ============================================================
   Hum — Tweaks panel (mounts into #tweaks-root)
   Drives the page through window.HumApp
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#12B76A",
  "conversation": "A",
  "transcriptPos": "right",
  "heroMode": "full",
  "readPanel": false,
  "motion": true
}/*EDITMODE-END*/;

const ACCENT_NAME = { "#12B76A": "emerald", "#2A6FDB": "blue", "#7C5CFC": "violet" };

function HumTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const A = () => window.HumApp || null;

  React.useEffect(() => { A() && A().setAccent(ACCENT_NAME[t.accent] || "emerald"); }, [t.accent]);
  React.useEffect(() => { A() && A().setTranscriptPattern(t.conversation); }, [t.conversation]);
  React.useEffect(() => { A() && A().setTranscriptPos(t.transcriptPos); }, [t.transcriptPos]);
  React.useEffect(() => { A() && A().setHeroMode(t.heroMode); }, [t.heroMode]);
  React.useEffect(() => { A() && A().setTranscriptPanel(t.readPanel); }, [t.readPanel]);
  React.useEffect(() => { document.documentElement.classList.toggle("no-motion", !t.motion); }, [t.motion]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Live transcript" />
      <TweakRadio label="Conversation" value={t.conversation} options={["A", "B", "C"]}
        onChange={(v) => setTweak("conversation", v)} />
      <TweakRadio label="Position" value={t.transcriptPos} options={["right", "left"]}
        onChange={(v) => setTweak("transcriptPos", v)} />
      <TweakToggle label="Readability panel" value={t.readPanel}
        onChange={(v) => setTweak("readPanel", v)} />

      <TweakSection label="Hero" />
      <TweakRadio label="Style" value={t.heroMode} options={["full", "cinematic"]}
        onChange={(v) => setTweak("heroMode", v)} />
      <TweakToggle label="Motion" value={t.motion}
        onChange={(v) => setTweak("motion", v)} />

      <TweakSection label="Brand" />
      <TweakColor label="Accent" value={t.accent}
        options={["#12B76A", "#2A6FDB", "#7C5CFC"]}
        onChange={(v) => setTweak("accent", v)} />
    </TweaksPanel>
  );
}

(function mountTweaks() {
  function go() {
    var el = document.getElementById("tweaks-root");
    if (!el || !window.ReactDOM) return;
    ReactDOM.createRoot(el).render(<HumTweaks />);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go);
  else go();
})();
