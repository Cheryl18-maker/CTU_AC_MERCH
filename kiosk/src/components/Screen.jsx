export default function Screen({ tone = 'taupe', wave = true, children }) {
  return (
    <div className={`screen tone-${tone}`}>
      {wave && <div className="wave" />}
      {children}
    </div>
  )
}
