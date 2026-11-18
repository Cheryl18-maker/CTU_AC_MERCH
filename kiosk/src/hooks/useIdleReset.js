import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export function useIdleReset(ms = 60000) {
  const nav = useNavigate()
  const { logout } = useAuth()
  const { clear } = useCart()

  useEffect(() => {
    let t
    const reset = () => {
      clearTimeout(t)
      t = setTimeout(() => { clear(); logout(); nav('/') }, ms)
    }
    const events = ['click', 'touchstart', 'keydown', 'mousemove']
    events.forEach((e) => window.addEventListener(e, reset))
    reset()
    return () => { clearTimeout(t); events.forEach((e) => window.removeEventListener(e, reset)) }
  }, [])
}
