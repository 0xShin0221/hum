/* ============================================================
   Hum App — Dispatch screen (live Claude agent runs)
   ============================================================ */
const DD = window.HUM_DATA.dispatch;

/* ---- one agent run: reveals steps, pauses for approval ---- */
function AgentRun({ run, onDone }) {
  const [revealed, setRevealed] = React.useState(0);
  const [appr, setAppr] = React.useState({});
  const [done, setDone] = React.useState(false);
  const steps = run.steps;

  React.useEffect(() => {
    if (done) return undefined;
    if (revealed > 0) {
      const last = steps[revealed - 1];
      if (last.kind === "tool" && last.status === "approval" && !appr[revealed - 1]) {
        return undefined; // wait for the user's decision
      }
    }
    if (revealed < steps.length) {
      const t = setTimeout(() => setRevealed((r) => r + 1), revealed === 0 ? 450 : 920);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setDone(true); onDone(run); }, 650);
    return () => clearTimeout(t);
  }, [revealed, appr, done]);

  function nodeClass(step, idx) {
    if (step.kind === "tool" && step.status === "approval" && !appr[idx]) return "wait";
    return "ok";
  }

  return (
    <div className="run rise">
      <div className="run__head">
        {done ? <span className="step__node ok" style={{ width: 18, height: 18 }}><Icon name="check" size={12} /></span>
              : <span className="run__spinner" />}
        <span className="run__title">{done ? "完了" : "Claude が実行中"}</span>
        <span style={{ flex: 1 }} />
        <span className="tag-mono">{steps.filter((s) => s.kind === "tool").length} tool calls</span>
      </div>

      <div className="run__plan"><b>Plan</b>{run.plan}</div>

      <div className="steps">
        {steps.slice(0, revealed).map((s, i) => {
          const isLast = i === revealed - 1;
          return (
            <React.Fragment key={i}>
              <div className="step rise">
                <div className="step__rail">
                  <span className={"step__node " + nodeClass(s, i)}>
                    {s.kind === "tool" && s.status === "approval" && !appr[i]
                      ? <Icon name="shield" size={10} />
                      : s.kind === "subagents" ? <Icon name="layers" size={10} />
                      : s.kind === "think" ? <Icon name="bolt" size={10} />
                      : <Icon name="check" size={11} />}
                  </span>
                  {i < revealed - 1 || !isLast ? <span className="step__line" /> : null}
                </div>
                <div className="step__body">
                  {s.kind === "tool" ? (
                    <React.Fragment>
                      <div className="step__tool">
                        <span className="step__name">{s.tool}</span>
                        <span className="step__server">· {s.server}</span>
                      </div>
                      <div className="step__args">{s.args}</div>
                      {s.status === "ok" && s.result ? <div className="step__result">{s.result}</div> : null}
                    </React.Fragment>
                  ) : s.kind === "subagents" ? (
                    <div className="step__sub"><span className="subdots"><i/><i/><i/></span>{s.text}</div>
                  ) : (
                    <div className="step__think">{s.text}</div>
                  )}
                </div>
              </div>

              {/* approval gate */}
              {s.kind === "tool" && s.status === "approval" && isLast && !appr[i] ? (
                <div className="approval rise">
                  <div className="approval__top"><Icon name="shield" size={13} />承認が必要 — {s.server}</div>
                  <div className="approval__txt">{s.tool}（{s.args}）を実行します。よろしいですか？</div>
                  <div className="approval__btns">
                    <button className="btn btn--accent btn--sm" onClick={() => setAppr((a) => ({ ...a, [i]: "approved" }))}>
                      <Icon name="check" size={14} />承認して実行
                    </button>
                    <button className="btn btn--ghost btn--sm" onClick={() => setAppr((a) => ({ ...a, [i]: "denied" }))}>
                      <Icon name="x" size={14} />スキップ
                    </button>
                  </div>
                </div>
              ) : null}
              {s.kind === "tool" && s.status === "approval" && appr[i] ? (
                <div className={"resolved " + (appr[i] === "denied" ? "deny" : "")}>
                  <span className="ico"><Icon name={appr[i] === "denied" ? "x" : "check"} size={14} /></span>
                  {appr[i] === "denied" ? s.denyResult : s.approveResult}
                </div>
              ) : null}
            </React.Fragment>
          );
        })}
      </div>

      {done && run.summary ? (
        <div className="result rise">
          <h4>{run.summary.title} — 要点</h4>
          <ul>{run.summary.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
          <h4 style={{ marginTop: 16 }}>アクション</h4>
          <ul className="act">{run.summary.actions.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      ) : null}
      {done && run.table ? (
        <div className="result rise">
          <h4>比較表</h4>
          <table className="rtable"><tbody>
            {run.table.rows.map((row, i) => (
              <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
            ))}
          </tbody></table>
        </div>
      ) : null}
    </div>
  );
}

/* ---- the screen ---- */
function DispatchScreen() {
  const [items, setItems] = React.useState(() => DD.intro.map((m, i) => ({ id: "i" + i, kind: "msg", ...m })));
  const [text, setText] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [usedRuns, setUsedRuns] = React.useState([]);
  const threadRef = React.useRef(null);
  const idRef = React.useRef(0);
  const nid = () => "x" + (++idRef.current);

  React.useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  });

  function runDone(run) {
    setItems((it) => [...it, { id: nid(), kind: "msg", role: "ai", text: run.closing || "完了しました。続けて指示できます。" }]);
    setBusy(false);
  }

  function startRun(run) {
    setBusy(true);
    setUsedRuns((u) => [...u, run.id]);
    setItems((it) => [
      ...it,
      { id: nid(), kind: "msg", role: "you", text: run.you },
      { id: nid(), kind: "run", run },
    ]);
  }

  async function freeSend(value) {
    const v = value.trim();
    if (!v || busy) return;
    setText("");
    setBusy(true);
    setItems((it) => [...it, { id: nid(), kind: "msg", role: "you", text: v }]);
    // lightweight live run: save to memory, then reply (real Claude if available)
    const liteRun = {
      id: "lite" + nid(), you: v, plan: "内容を理解 → Hum Memory に保存 → 確認",
      steps: [
        { kind: "think", text: "依頼を解釈しています…" },
        { kind: "tool", tool: "memory.save", server: "Hum Memory", args: "“" + (v.length > 24 ? v.slice(0, 24) + "…" : v) + "”", status: "ok", result: "保存しました" },
      ],
      closing: null,
    };
    setItems((it) => [...it, { id: nid(), kind: "run", run: liteRun }]);
    let reply = "保存したよ。あとで見返せるようにするね。";
    try {
      if (window.claude && window.claude.complete) {
        const p = "あなたは音声アシスタント「Hum」。次のユーザー依頼に、短く自然な日本語1文で、保存・対応した旨だけを答えて（22字程度、語尾はやわらかく）。依頼：" + v;
        const r = await window.claude.complete(p);
        if (r && r.trim()) reply = r.trim().split("\n")[0].slice(0, 60);
      }
    } catch (e) { /* fallback keeps default */ }
    liteRun.closing = reply;
  }

  return (
    <div className="disp">
      <div className="thread scroll" ref={threadRef}>
        {items.map((it) => it.kind === "msg" ? (
          <div className={"msg msg--" + it.role + " rise"} key={it.id}>
            <div className="msg__who">
              {it.role === "ai" ? <span className="dot" style={{ width: 6, height: 6 }} /> : null}
              {it.role === "ai" ? "Hum" : "YOU"}
            </div>
            <div className="msg__bubble">{it.text}</div>
          </div>
        ) : (
          <AgentRun key={it.id} run={it.run} onDone={runDone} />
        ))}
      </div>

      <div className="composer">
        <div className="suggest">
          {DD.runs.map((r) => (
            <button key={r.id} className="chip" disabled={busy || usedRuns.includes(r.id)} onClick={() => startRun(r)}>
              {r.you.length > 30 ? r.you.slice(0, 30) + "…" : r.you}
            </button>
          ))}
        </div>
        <div className="inputbar">
          <button className={"mic-btn" + (busy ? "" : " live")} title="音声入力"><Icon name="mic" size={18} /></button>
          <input
            placeholder="Claude にタスクを渡す… 例：明日の予定をまとめて"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") freeSend(text); }}
          />
          <button className="send-btn" disabled={!text.trim() || busy} onClick={() => freeSend(text)}><Icon name="send" size={18} /></button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DispatchScreen, AgentRun });
