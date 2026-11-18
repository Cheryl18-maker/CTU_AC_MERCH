import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import Backdrop from '../components/Backdrop'
import { Icon } from '../components/Icons'

export default function Welcome() {
  const nav = useNavigate()
  return (
    <Screen tone="gray" wave={false}>
      <Backdrop variant="hero" />
      <img className="logo logo-hero" src="/images/ctu.png" alt="Cebu Technological University" />

      <h1 className="hero-title">
        <span>GEAR UP</span>
        <span>TECHNOLOGIES!</span>
      </h1>
      <p className="hero-sub">Wear Your Pride, Live the Tech Life</p>

      <button className="hero-login" onClick={() => nav('/login')}>
        <Icon.login />
        LOGIN
      </button>
      <button className="hero-shop" onClick={() => nav('/shop')}>
        <Icon.cart />
        <b>Shop Merch Now!</b>
        <small>Explore gear and more</small>
      </button>
    </Screen>
  )
}
