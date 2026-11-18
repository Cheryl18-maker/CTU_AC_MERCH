import { Icon } from './Icons'

// Decorative QR-style badge. Replace the <svg> with a real QR image when you have one.
const N = 25
const cells = (() => {
  let s = 20261118
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647 }
  const out = []
  const inFinder = (x, y) => (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9)
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!inFinder(x, y) && rnd() > 0.5) out.push([x, y])
  return out
})()

const Finder = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width="7" height="7" fill="currentColor" />
    <rect x="1" y="1" width="5" height="5" fill="#fff3e8" />
    <rect x="2" y="2" width="3" height="3" fill="currentColor" />
  </g>
)

export default function QrBadge() {
  return (
    <div className="qr">
      <p>SCAN TO UNLOCK<br />{'DISCOUNTS & FREEBIES!'}</p>
      <div className="qr-box">
        <svg viewBox={`-0.5 -0.5 ${N + 1} ${N + 1}`} shapeRendering="crispEdges">
          {cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />)}
          <Finder x={0} y={0} />
          <Finder x={N - 7} y={0} />
          <Finder x={0} y={N - 7} />
        </svg>
      </div>
      <span>SCAN HERE</span>
      <Icon.cursor className="cursor" />
    </div>
  )
}
