import { useLayoutEffect, useState } from 'react'

// Design size from Figma. The whole UI is built at this size and scaled to fit the screen.
const W = 1030
const H = 1445

export default function Stage({ children }) {
  const [k, setK] = useState(1)
  useLayoutEffect(() => {
    const fit = () => setK(Math.min(window.innerWidth / W, window.innerHeight / H))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return (
    <div className="viewport">
      <div className="stage" style={{ transform: `translate(-50%, -50%) scale(${k})` }}>
        {children}
      </div>
    </div>
  )
}
