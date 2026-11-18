import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import Screen from '../components/Screen'
import Backdrop from '../components/Backdrop'
import { Icon } from '../components/Icons'

const today = () => new Date().toISOString().slice(0, 10)

export default function Register() {
  const nav = useNavigate()
  const { setUser } = useAuth()
  const [universityId, setUniversityId] = useState('')
  const [birthday, setBirthday] = useState('')
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const ready = universityId.trim() && birthday && agree

  const submit = async () => {
    if (!ready || busy) return
    try {
      setBusy(true)
      setError('')
      const user = await api.register(universityId.trim(), birthday)
      setUser(user)
      nav('/shop')
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Screen tone="gray">
      <Backdrop variant="auth" />
      <img className="logo logo-auth" src="/images/ctu.png" alt="Cebu Technological University" />

      <div className="auth-card">
        <h2>Create your account</h2>
        <p className="auth-sub">
          Join CTU Merch to track orders, check your balance, and enjoy rewards. Your campus community starts here.
        </p>

        <label className="lbl plain">University ID</label>
        <div className="field">
          <Icon.id className="ico" />
          <input placeholder="e.g. 7230504" value={universityId} onChange={(e) => setUniversityId(e.target.value)} />
        </div>

        <label className="lbl plain">Birthday</label>
        <div className="field">
          <Icon.calendar className="ico" />
          <input type="date" max={today()} className={birthday ? '' : 'empty'} value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        </div>

        <label className="check">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span>I agree to the <a>Terms and Conditions</a> and <a>Privacy Policy</a></span>
        </label>

        {error && <div className="form-error">{error}</div>}

        <button className="btn-block btn-orange" disabled={!ready || busy} onClick={submit}>
          {busy ? 'Creating…' : 'Create Account'}
        </button>
        <p className="auth-note left">Already have an account? <Link to="/login" className="accent">Log in</Link></p>
      </div>
    </Screen>
  )
}
