import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import Screen from '../components/Screen'
import Backdrop from '../components/Backdrop'
import { Icon } from '../components/Icons'

const today = () => new Date().toISOString().slice(0, 10)

export default function Login() {
  const nav = useNavigate()
  const { setUser } = useAuth()
  const [universityId, setUniversityId] = useState('')
  const [birthday, setBirthday] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const ready = universityId.trim() && birthday

  const submit = async () => {
    if (!ready || busy) return
    try {
      setBusy(true)
      setError('')
      const user = await api.login(universityId.trim(), birthday)
      setUser(user)
      nav('/shop')
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }
  const onEnter = (e) => e.key === 'Enter' && submit()

  return (
    <Screen tone="gray">
      <Backdrop variant="auth" />
      <img className="logo logo-auth" src="/images/ctu.png" alt="Cebu Technological University" />

      <div className="auth-card">
        <h2>Welcome to CTU Merch!</h2>
        <p className="auth-sub">
          Log in with your University ID and birthday to access your account, or continue as a guest to browse merchandise.
        </p>

        <label className="lbl">University ID</label>
        <div className="field">
          <Icon.id className="ico" />
          <input placeholder="e.g. 7230504" value={universityId} onChange={(e) => setUniversityId(e.target.value)} onKeyDown={onEnter} />
        </div>

        <label className="lbl">Birthday</label>
        <div className="field">
          <Icon.calendar className="ico" />
          <input type="date" max={today()} className={birthday ? '' : 'empty'} value={birthday} onChange={(e) => setBirthday(e.target.value)} onKeyDown={onEnter} />
        </div>

        {error && <div className="form-error">{error}</div>}

        <button className="btn-block btn-orange" disabled={!ready || busy} onClick={submit}>
          {busy ? 'LOGGING IN…' : 'LOG IN'}
        </button>
        <button className="btn-block btn-guest" onClick={() => nav('/shop')}>CONTINUE AS GUEST</button>

        <div className="auth-links">
          <Link to="/register">Create Account</Link>
        </div>
        <p className="auth-note">No account? You can still browse merchandise without signing in.</p>
      </div>
    </Screen>
  )
}
