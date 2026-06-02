/* ============================================================
   Hum App — mobile (iOS frame, dark)
   ============================================================ */
const MD = window.HUM_DATA;
const MDD = MD.dispatch;

const M_TABS = [
  { id: "today", label: "Today", icon: "today" },
  { id: "dispatch", label: "Dispatch", icon: "dispatch" },
  { id: "memory", label: "Memory", icon: "memory" },
];

function MobileToday() {
  return (
    <div className="rise">
      <div className="m-listen">
        <div className="m-listen__state"><span className="dot" />Always listening</div>
        <h2>{MD.now.headline}</h2>
        <p>{MD.now.sub}</p>
        <span className="wave lg"><i/><i/><i/><i/><i/><i/><i/></span>
      </div>
      <div className="sec-label" style={{ margin: "4px 0 10px" }}>最近のキャプチャ</div>
      {MD.captures.slice(0, 4).map((c) => (
        <div className="m-cap" key={c.id}>
          <div className="m-cap__ico"><Icon name={c.icon} size={15} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="m-cap__time">{c.time}</div>
            <div className="m-cap__text">{c.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileDispatch() {
  const [items, setItems] = React.useState(() => MDD.intro.map((m, i) => ({ id: "i" + i, kind: "msg", ...m })));
  const [busy, setBusy] = React.useState(false);
  const [used, setUsed] = React.useState([]);
  const ref = React.useRef(null);
  const idRef = React.useRef(0);
  const nid = () => "m" + (++idRef.current);

  React.useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; });

  function runDone(run) {
    setItems((it) => [...it, { id: nid(), kind: "msg", role: "ai", text: run.closing || "完了しました。" }]);
    setBusy(false);
  }
  function startRun(run) {
    setBusy(true); setUsed((u) => [...u, run.id]);
    setItems((it) => [...it, { id: nid(), kind: "msg", role: "you", text: run.you }, { id: nid(), kind: "run", run }]);
  }

  return (
    <React.Fragment>
      <div className="m-body" ref={ref}>
        <div className="m-thread">
          {items.map((it) => it.kind === "msg" ? (
            <div className={"msg msg--" + it.role + " rise"} key={it.id}>
              <div className="msg__who">{it.role === "ai" ? <span className="dot" style={{ width: 6, height: 6 }} /> : null}{it.role === "ai" ? "Hum" : "YOU"}</div>
              <div className="msg__bubble">{it.text}</div>
            </div>
          ) : <AgentRun key={it.id} run={it.run} onDone={runDone} />)}
        </div>
      </div>
      <div className="m-composer">
        <div className="suggest">
          {MDD.runs.map((r) => (
            <button key={r.id} className="chip" disabled={busy || used.includes(r.id)} onClick={() => startRun(r)}>
              {r.you.length > 22 ? r.you.slice(0, 22) + "…" : r.you}
            </button>
          ))}
        </div>
        <div className="inputbar">
          <button className="mic-btn live"><Icon name="mic" size={17} /></button>
          <input placeholder="タスクを声で渡す…" readOnly />
          <button className="send-btn" disabled><Icon name="send" size={17} /></button>
        </div>
      </div>
    </React.Fragment>
  );
}

function MobileMemory() {
  const [filter, setFilter] = React.useState("すべて");
  const items = MD.memory.filter((m) => filter === "すべて" || m.cat === filter);
  return (
    <div className="rise">
      <div className="searchbar" style={{ marginBottom: 12 }}>
        <Icon name="search" size={16} /><input placeholder="記憶を検索…" readOnly />
      </div>
      <div className="filters" style={{ marginBottom: 14 }}>
        {MD.memoryFilters.slice(0, 4).map((f) => (
          <button key={f} className={"filter" + (filter === f ? " on" : "")} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      {items.map((m) => (
        <div className="m-mem" key={m.id}>
          <div className="m-mem__top"><span className="m-mem__cat">{m.cat}</span><span className="m-mem__time">{m.time}</span></div>
          <div className="m-mem__text">{m.text}</div>
        </div>
      ))}
    </div>
  );
}

function HumMobile() {
  const [tab, setTab] = React.useState("dispatch");
  const meta = { today: ["Today", "今日の状況"], dispatch: ["Dispatch", "Claude にタスクを渡す"], memory: ["Memory", "すべての記憶"] }[tab];
  return (
    <IOSDevice dark width={390} height={780}>
      <div className="m-root">
        <div className="m-head">
          <span className="wave"><i/><i/><i/><i/><i/></span>
          <div>
            <div className="m-head__title">{meta[0]}</div>
            <div className="m-head__sub">{meta[1]}</div>
          </div>
          <span className="dot" />
        </div>

        {tab === "dispatch"
          ? <MobileDispatch />
          : <div className="m-body">{tab === "today" ? <MobileToday /> : <MobileMemory />}</div>}

        <div className="m-tabs">
          {M_TABS.map((t) => (
            <button key={t.id} className={"m-tab" + (tab === t.id ? " on" : "")} onClick={() => setTab(t.id)}>
              <span className="m-tab__ico"><Icon name={t.icon} size={19} /></span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </IOSDevice>
  );
}

Object.assign(window, { HumMobile });
