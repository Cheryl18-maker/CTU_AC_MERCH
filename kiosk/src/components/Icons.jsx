const Svg = ({ children, ...p }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    {children}
  </svg>
)

export const Icon = {
  login: (p) => <Svg {...p}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="m10 17 5-5-5-5" /><path d="M15 12H3" /></Svg>,
  cart: (p) => <Svg {...p}><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></Svg>,
  user: (p) => <Svg {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Svg>,
  id: (p) => <Svg {...p}><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="8.5" cy="11" r="2" /><path d="M5.5 16c.6-1.4 1.8-2 3-2s2.4.6 3 2" /><path d="M14 9.5h4" /><path d="M14 13h3" /></Svg>,
  calendar: (p) => <Svg {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></Svg>,
  trash: (p) => <Svg {...p}><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></Svg>,
  ticket: (p) => <Svg {...p}><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></Svg>,
  bag: (p) => <Svg {...p}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></Svg>,
  arrowRight: (p) => <Svg {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Svg>,
  arrowLeft: (p) => <Svg {...p}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></Svg>,
  check: (p) => <Svg {...p}><path d="M20 6 9 17l-5-5" /></Svg>,
  close: (p) => <Svg {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Svg>,
  cash: (p) => <Svg {...p}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01" /><path d="M18 12h.01" /></Svg>,
  phone: (p) => <Svg {...p}><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></Svg>,
  plus: (p) => <Svg {...p}><path d="M12 5v14" /><path d="M5 12h14" /></Svg>,
  minus: (p) => <Svg {...p}><path d="M5 12h14" /></Svg>,
  cursor: (p) => <Svg fill="#2b2b2b" stroke="#fff" strokeWidth="1.2" {...p}><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /></Svg>,
}
