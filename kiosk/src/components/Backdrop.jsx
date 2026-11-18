// Campus photo band + translucent shapes used on Welcome, Login and Register.
// Put your photo at public/images/campus-bg.jpg (a gradient shows until you do).
export default function Backdrop({ variant = 'auth' }) {
  const hero = variant === 'hero'
  const fill = hero ? '#ffffff' : '#000000'
  const op = hero ? 0.38 : 0.045
  return (
    <>
      <div className={`band ${hero ? 'band-red' : 'band-soft'}`} />
      <div className="photo" />
      <svg className="shapes" viewBox="0 0 1030 1445" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="5,245 505,15 800,255 330,275" fill={fill} opacity={op} />
        <polygon points="695,90 797,252 560,275 400,275" fill={fill} opacity={op} />
      </svg>
      <div className="glass" />
    </>
  )
}
