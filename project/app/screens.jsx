/* ============================================================
   Hum App — screens: Today, Memory, Meetings, Connectors
   ============================================================ */
const D = window.HUM_DATA;

/* ---------------- TODAY ---------------- */
function TodayScreen() {
  return (
    <div className="rise">
      <div className="today-hero">
        <div className="listen">
          <div className="listen__orb" />
          <div className="listen__state"><span className="dot" />Always listening</div>
          <h2>{D.now.headline}</h2>
          <p>{D.now.sub}</p>
          <div className="listen__wave"><span className="wave lg"><i/><i/><i/><i/><i/><i/><i/><i/></span></div>
        </div>
        <div className="card agenda">
          <h3>今日の予定</h3>
          {D.agenda.map((a, i) => (
            <div className="agenda__row" key={i}>
              <span className="agenda__time">{a.time}</span>
              <span className="agenda__title">{a.title}</span>
              {a.soon ? <span className="dot" /> : null}
              <span className="pill"><span className="mono">{a.tag}</span></span>
            </div>
          ))}
        </div>
      </div>

      <div className="sec-label">最近のキャプチャ</div>
      <div className="captures">
        {D.captures.map((c) => (
          <div className="cap" key={c.id}>
            <div className="cap__ico"><Icon name={c.icon} size={16} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="cap__time">{c.time}</div>
              <div className="cap__text">{c.text}</div>
            </div>
            <span className="tag-mono">{c.src === "meeting" ? "MEETING" : "VOICE"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- MEMORY ---------------- */
function MemoryScreen() {
  const [filter, setFilter] = React.useState("すべて");
  const [q, setQ] = React.useState("");
  const items = D.memory.filter((m) =>
    (filter === "すべて" || m.cat === filter) &&
    (q === "" || m.text.includes(q))
  );
  return (
    <div className="rise">
      <div className="searchbar">
        <Icon name="search" size={17} />
        <input placeholder="記憶を自然な言葉で検索…  例：API 移行" value={q} onChange={(e) => setQ(e.target.value)} />
        <span className="tag-mono">{items.length} 件</span>
      </div>
      <div className="filters">
        {D.memoryFilters.map((f) => (
          <button key={f} className={"filter" + (filter === f ? " on" : "")} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="mem-grid">
        {items.map((m) => (
          <div className="mem" key={m.id}>
            <div className="mem__top">
              <span className="mem__cat">{m.cat}</span>
              <span className="mem__time">{m.time}</span>
            </div>
            <div className="mem__text">{m.text}</div>
            <div className="mem__src"><Icon name={m.src === "meeting" ? "doc" : "mic"} size={12} />{m.src === "meeting" ? "会議から" : "音声から"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- MEETINGS ---------------- */
function MeetingsScreen() {
  const [sel, setSel] = React.useState(D.meetings[0].id);
  const mt = D.meetings.find((m) => m.id === sel);
  return (
    <div className="mt-grid rise">
      <div className="mt-list scroll">
        {D.meetings.map((m) => (
          <button key={m.id} className={"mt-item" + (m.id === sel ? " on" : "")} onClick={() => setSel(m.id)}>
            <h4>{m.title}</h4>
            <div className="meta"><span>{m.date}</span><span>{m.dur}</span><span>{m.people}名</span></div>
            <div className="sum">{m.summary}</div>
          </button>
        ))}
      </div>
      <div className="mt-detail scroll" key={mt.id}>
        <div className="dhead rise">
          <h2>{mt.title}</h2>
          <div className="dmeta">
            <span className="pill"><Icon name="clock" size={13} /><span className="mono">{mt.date} · {mt.dur}</span></span>
            <span className="pill"><Icon name="user" size={13} />{mt.people}名</span>
            <span className="pill"><span className="dot idle" style={{ background: "var(--amber)" }} />決定 {mt.decided}件</span>
          </div>
        </div>
        <div className="block">
          <h4>要点</h4>
          <ul>{mt.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div className="block">
          <h4>決定事項</h4>
          <ul className="dec">{mt.decisions.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
        <div className="block">
          <h4>アクション</h4>
          {mt.actions.map((a, i) => (
            <div className={"act-row" + (a.done ? " done" : "")} key={i}>
              <span className={"act-check" + (a.done ? " done" : "")}>{a.done ? <Icon name="check" size={13} /> : null}</span>
              <span className="act-who">@{a.who}</span>
              <span className="act-what">{a.what}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- CONNECTORS ---------------- */
function ConnectorsScreen() {
  const [conns, setConns] = React.useState(D.connectors);
  const labels = { connected: "接続済み", review: "確認待ち", disconnected: "未接続" };
  function toggle(id) {
    setConns((cs) => cs.map((c) => c.id === id
      ? { ...c, status: c.status === "disconnected" ? "connected" : "disconnected", scope: c.status === "disconnected" ? "読み取りのみ" : "—" }
      : c));
  }
  return (
    <div className="rise">
      <div className="conn-banner">
        <div className="ico"><Icon name="shield" size={20} /></div>
        <div style={{ flex: 1 }}>
          <h3>Model Context Protocol で接続</h3>
          <p>各アプリは OAuth で安全に接続。Claude はあなたが許可したツールだけを呼び出します。</p>
        </div>
        <span className="pill"><span className="dot" /><span className="mono">Agent SDK 稼働中</span></span>
      </div>
      <div className="conn-grid">
        {conns.map((c) => (
          <div className="conn" key={c.id}>
            <div className="conn__top">
              <div className="conn__logo" style={{ background: c.hue }}>{c.letter}</div>
              <div style={{ flex: 1 }}>
                <div className="conn__name">{c.name}</div>
                <div className="conn__desc">{c.desc}</div>
              </div>
              <span className={"status-chip " + c.status}>
                {c.status === "connected" ? <span className="dot" style={{ width: 6, height: 6 }} /> : null}
                {labels[c.status]}
              </span>
            </div>
            <div className="conn__foot">
              <span className="conn__scope"><Icon name="shield" size={12} />{c.scope}</span>
              <button className={"btn btn--sm " + (c.status === "disconnected" ? "btn--accent" : "btn--ghost")} onClick={() => toggle(c.id)}>
                {c.status === "disconnected" ? "接続" : "管理"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { TodayScreen, MemoryScreen, MeetingsScreen, ConnectorsScreen });
