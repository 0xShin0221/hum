/* ============================================================
   Hum App — line icons (stroke, 24-grid). Export: Icon
   ============================================================ */
const HUM_ICONS = {
  today:    'M3 11l9-7 9 7M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9',
  dispatch: 'M4 12h7M4 7h12M4 17h9M15 14l4 4-4 4M19 18H9', // arrows out
  memory:   'M9 18.5a3 3 0 0 1-3-3 3 3 0 0 1-1.3-5.6A3 3 0 0 1 6.5 5 3 3 0 0 1 12 4.2 3 3 0 0 1 17.5 5a3 3 0 0 1 1.8 4.9A3 3 0 0 1 18 15.5a3 3 0 0 1-3 3M12 4.2v14.6',
  notes:    'M5 3.5h14a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1zM8 8h8M8 12h8M8 16h4',
  connectors:'M7 8a4 4 0 0 0 0 8M17 16a4 4 0 0 0 0-8M9 12h6',
  mic:      'M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v3',
  spark:    'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z',
  doc:      'M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20V4a.5.5 0 0 1 .5-.5zM14 3.5V8h4',
  search:   'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4',
  send:     'M5 12h13M12 5l7 7-7 7',
  check:    'M5 12.5l4.5 4.5L19 7',
  x:        'M6 6l12 12M18 6L6 18',
  clock:    'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7.5V12l3 2',
  calendar: 'M5 5.5h14a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1zM4 9.5h16M8 3.5v4M16 3.5v4',
  bell:     'M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 0 0 4 0',
  plus:     'M12 5v14M5 12h14',
  chevron:  'M9 6l6 6-6 6',
  shield:   'M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z',
  bolt:     'M13 2.5 5 13h6l-1 8.5L18 11h-6z',
  layers:   'M12 4 3 8.5l9 4.5 9-4.5zM3 13l9 4.5L21 13M3 16.5l9 4.5 9-4.5',
  user:     'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0',
  globe:    'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18',
  pin:      'M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
};

function Icon({ name, size = 18, stroke = 1.7, fill = false, style = {} }) {
  const d = HUM_ICONS[name] || HUM_ICONS.spark;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

Object.assign(window, { Icon, HUM_ICONS });
