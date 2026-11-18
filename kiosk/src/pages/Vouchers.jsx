import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import Screen from '../components/Screen'
import { Icon } from '../components/Icons'

const VALID_UNTIL = '30 Nov 2026'

export default function Vouchers() {
  const nav = useNavigate()
  const { user } = useAuth()
  const { voucher, setVoucher, subtotal } = useCart()
  const [vouchers, setVouchers] = useState([])
  const [picked, setPicked] = useState(voucher)

  useEffect(() => { api.vouchers().then(setVouchers).catch(() => {}) }, [])

  const points = user?.points ?? 0
  const available = (v) => !!user && points >= v.pointsCost && subtotal >= v.minSpend

  return (
    <Screen tone="taupe">
      <img className="logo logo-top" src="/images/ctu.png" alt="" />
      <h2 className="page-title" style={{ top: 287 }}>Redeem Vouchers</h2>

      <div className="bal"><span>My Balance Points</span><b>{points} pts</b></div>

      <div className="rw-head">
        <h3>Rewards available for points</h3>
        <span>Vouchers valid until {VALID_UNTIL}</span>
      </div>

      <div className="vgrid">
        {vouchers.map((v) => {
          const on = picked?.id === v.id
          const ok = available(v)
          return (
            <div key={v.id} className={`vcard ${on ? 'on' : ''}`}>
              <div className="vtop">
                <div className="vico"><Icon.ticket /></div>
                <div>
                  <div className="vtitle">₱{v.discount} reward voucher</div>
                  <div className="vsub">₱{v.discount} off · Min. spend ₱{v.minSpend}</div>
                </div>
              </div>
              <div className="vmid">
                <b>{v.pointsCost} pts</b>
                <span>{on ? '✓ Selected' : ok ? 'Available To Redeem' : 'Not Available'}</span>
              </div>
              <button className={`vbtn ${on ? 'on' : ''}`} disabled={!ok} onClick={() => setPicked(v)}>
                {on ? 'Selected' : 'Select Reward'}
              </button>
            </div>
          )
        })}
      </div>

      <div className="bar bar-voucher">
        <button className="btn-out" onClick={() => nav('/cart')}>Back</button>
        <button className="btn-fill" onClick={() => { setVoucher(picked); nav('/cart') }}>Redeem</button>
      </div>
    </Screen>
  )
}
