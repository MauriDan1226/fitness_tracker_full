/*
 * Set de iconos propio, trazo de 1.5 sobre una retícula de 24.
 * Se dibujan con `currentColor`, así que heredan el color del contexto.
 */
const PATHS = {
  running: 'M13 4.5a1.6 1.6 0 1 0 0-.1M8 21l2.6-5.2 3.1-2.1-1-4.9-3.4 2-1.6 3M13.7 8.8l3.5 1.6 1.3 3.4M11.7 15.8l2.6 2.1.9 3.1M4 10.4l2.6-1.5',
  weights: 'M4.5 9v6M7.5 7.5v9M16.5 7.5v9M19.5 9v6M7.5 12h9M2.5 10.5v3M21.5 10.5v3',
  cycling: 'M5.5 18.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM18.5 18.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM5.5 15h5l3.5-6M9 9h4M15.5 5.5h2l1 9.5',
  swimming: 'M2.5 17.5c1.5 0 1.5 1.2 3 1.2s1.5-1.2 3-1.2 1.5 1.2 3 1.2 1.5-1.2 3-1.2 1.5 1.2 3 1.2 1.5-1.2 3-1.2M6 13.5 10.5 10l4 3M14.5 8.5 18 6M17.5 6.2a1.2 1.2 0 1 0 0-.1',
  yoga: 'M12 5.6a1.6 1.6 0 1 0 0-.1M12 8.5v5M12 13.5 8 19M12 13.5 16 19M7 11h10',
  walking: 'M13 4.6a1.5 1.5 0 1 0 0-.1M10 21l1.8-5.4 2.4-1.9-.9-4.4-3 1.7-1.4 2.8M14.2 9.3l2.8 1.4M13.2 13.7l1.8 2.6.6 4.7',
  hiit: 'M13.5 2.5 5.5 13.5h5.5l-1 8 8-11h-5.5l1-8Z',
  football: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7.5l3.6 2.6-1.4 4.3h-4.4L8.4 10.1 12 7.5ZM12 3v4.5M15.6 10.1l4.3-1.4M14.2 14.4l2.7 3.6M9.8 14.4 7.1 18M8.4 10.1 4.1 8.7',
  dance: 'M14.5 4.6a1.5 1.5 0 1 0 0-.1M14 8l-3.5 2.5 1 3.5-3 3.5M11.5 14 15 16l1 5M14 8l3.5 1.5M8 21l2.5-3.5M6.5 11 10.5 10.5',
  other: 'M12 3.5l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.9l6-.8L12 3.5Z',
  edit: 'M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3ZM14.5 6.5l3 3',
  trash: 'M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10.5 10.5v6M13.5 10.5v6',
  plus: 'M12 5.5v13M5.5 12h13',
  close: 'M6 6l12 12M18 6 6 18',
  check: 'M4.5 12.5l5 5 10-11',
  alert: 'M12 3.5 1.8 20.5h20.4L12 3.5ZM12 9.5v5M12 17.3v.2',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v6M12 7.4v.2',
  chevron: 'M9 5.5 16 12l-7 6.5',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM12 13.6a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z',
  scale: 'M4 20.5h16V6.5H4v14ZM8 6.5V4h8v2.5M12 10v3M9.2 13.5h5.6',
  flame: 'M12 21c3.6 0 6-2.3 6-5.4 0-3.6-3-5-4.2-8.6-2 1.2-2.6 3-2.4 4.6-1-.6-1.6-1.6-1.7-2.8C8 10.2 6 12.2 6 15.6 6 18.7 8.4 21 12 21Z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 6.8V12l3.4 2.4',
  bars: 'M4.5 20V13M9.5 20V8M14.5 20v-9M19.5 20V4.5',
  bulb: 'M9.5 18.5h5M10 21h4M12 3.2a5.6 5.6 0 0 0-3.3 10.1c.6.5 1 1.2 1 2h4.6c0-.8.4-1.5 1-2A5.6 5.6 0 0 0 12 3.2Z',
  user: 'M12 12.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5c1.2-3.4 4-5 7.5-5s6.3 1.6 7.5 5',
  note: 'M6 3.5h9L19 8v12.5H6V3.5ZM14.5 3.8V8.2h4.3M9 12h7M9 15.5h5',
};

function Icon({ name, size = 20, className = '', strokeWidth = 1.5, label }) {
  const path = PATHS[name] || PATHS.other;

  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}

export default Icon;
