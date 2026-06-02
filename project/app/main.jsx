/* ============================================================
   Hum App — desktop shell + router
   ============================================================ */
const NAV = [
  { id: "today", label: "Today", icon: "today", title: "Today", sub: "今日の状況とキャプチャ" },
  { id: "dispatch", label: "Dispatch", icon: "dispatch", title: "Dispatch", sub: "声でタスクを渡すと、Claude が実行します", badge: "AI" },
  { id: "memory", label: "Memory", icon: "memory", title: "Memory", sub: "話したことは、すべて記憶に" },
  { id: "notes", label: "Meeting Notes", icon: "notes", title: "Meeting Notes", sub: "会議を自動で要約・議事録化" },
  { id: "connectors", label: "Connectors", icon: "connectors", title: "Connectors", sub: "MCP でアプリと安全に接続" },
];

function Sidebar({ active, onNav }) {
  return (
    <aside className="side">
      <div className="side__brand">
        <span className="wave"><i/><i/><i/><i/><i/></span>
        <span>Hum</span>
      </div>
      <nav className="nav">
        {NAV.map((n) => (
          <button key={n.id} className={"nav__item" + (active === n.id ? " on" : "")} onClick={() => onNav(n.id)}>
            <Icon name={n.icon} size={18} />
            <span>{n.label}</span>
            {n.badge ? <span className="badge">{n.badge}</span> : null}
          </button>
        ))}
      </nav>
      <div className="side__spacer" />
      <div className="side__status">
        <div className="row" style={{ marginBottom: 6 }}>
          <span className="dot" />
          <span className="label">Always listening</span>
        </div>
        <div className="row"><span className="tag-mono">Agent SDK · Opus</span></div>
      </div>
      <div className="side__user">
        <span className="avatar">Y</span>
        <div style={{ flex: 1, fontSize: 13 }}>あなた</div>
        <Icon name="chevron" size={15} style={{ color: "var(--text-3)", transform: "rotate(90deg)" }} />
      </div>
    </aside>
  );
}

function HumDesktop() {
  const [active, setActive] = React.useState("dispatch");
  const meta = NAV.find((n) => n.id === active);
  const screen = {
    today: <TodayScreen />, dispatch: <DispatchScreen />, memory: <MemoryScreen />,
    notes: <MeetingsScreen />, connectors: <ConnectorsScreen />,
  }[active];

  return (
    <div className="win">
      <div className="win__bar">
        <div className="lights"><i className="r" /><i className="y" /><i className="g" /></div>
        <div className="win__title">Hum</div>
      </div>
      <Sidebar active={active} onNav={setActive} />
      <div className="main">
        <div className="head">
          <div>
            <h1>{meta.title}</h1>
            <div className="sub">{meta.sub}</div>
          </div>
          {active === "today" ? <button className="btn btn--ghost btn--sm"><Icon name="bell" size={15} />通知</button> : null}
          {active === "memory" ? <span className="pill"><Icon name="memory" size={13} /><span className="mono">{window.HUM_DATA.memory.length} 件の記憶</span></span> : null}
          {active === "connectors" ? <span className="pill"><span className="dot" /><span className="mono">3 connected</span></span> : null}
        </div>
        {active === "dispatch"
          ? <DispatchScreen />
          : <div className="body scroll">{screen}</div>}
      </div>
    </div>
  );
}

Object.assign(window, { HumDesktop, NAV });
