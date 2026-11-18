import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import Screen from '../components/Screen'
import { Icon } from '../components/Icons'
import { money, fmtDateTime } from '../utils/format'

export default function Confirmation() {
  const { orderNo } = useParams()
  const nav = useNavigate()
  const location = useLocation()
  const { user, setUser } = useAuth()
  const [order, setOrder] = useState(null)
  const [images, setImages] = useState(location.state?.images ?? {})

  useEffect(() => {
    api.getOrder(orderNo).then(setOrder).catch(() => {})
    api.products()
      .then((list) => setImages((prev) => ({ ...Object.fromEntries(list.map((p) => [p.name, p.imageUrl])), ...prev })))
      .catch(() => {})
    if (user) api.me(user.id).then(setUser).catch(() => {}) // refresh points balance
  }, [orderNo])

  if (!order) return <Screen tone="taupe"><div className="loading">Loading your order…</div></Screen>

  const isCash = order.paymentMethod === 'Cash'
  const count = order.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <Screen tone="taupe">
      <img className="logo logo-top" style={{ marginLeft: -105 }} src="/images/ctu.png" alt="" />
      <h2 className="page-title" style={{ top: 192 }}>Order confirmation</h2>
      <div className="pill" style={{ right: 43, top: 191 }}>{isCash ? 'Pay at SSG Office' : 'Complete'}</div>

      <div className="cf-card cf-top">
        <div className="cf-ok">
          <div className="cf-check"><Icon.check /></div>
          <div>
            <h2>ORDER SUCCESSFUL!</h2>
            <p>Thank you for supporting CTU Merch.</p>
          </div>
        </div>
        <div className="cf-meta">
          <div>
            <small>YOUR ORDER</small>
            <strong>{order.orderNo}</strong>
            <small>{fmtDateTime(order.createdAt)}</small>
          </div>
          <div className="cf-kv">
            <div><span>Paid with</span><b>{order.paymentMethod}</b></div>
            <div><span>Earned Points</span><b>{order.earnedPoints} pts</b></div>
          </div>
        </div>
      </div>

      <div className="cf-card cf-sum">
        <div className="cf-sum-head">Order summary <span>{count} item{count === 1 ? '' : 's'}</span></div>
        <div className="cf-body">
          <div className="cf-items">
            {order.items.map((i, idx) => (
              <div className="cf-item" key={idx}>
                {images[i.productName] ? <img src={images[i.productName]} alt="" /> : <span style={{ width: 72 }} />}
                <div>
                  <b>{i.productName}</b>
                  <small>{[i.color, i.size].filter(Boolean).join(' / ')}{(i.color || i.size) && ' · '}Qty {i.quantity}</small>
                </div>
                <span className="price">{money(i.lineTotal)}</span>
              </div>
            ))}
          </div>
          <div className="cf-tot">
            <div className="r"><span>Subtotal</span><b>{money(order.subtotal)}</b></div>
            <div className="r"><span>Voucher</span><b className="disc">−{money(order.discount)}</b></div>
            <hr />
            <div className="lab">Total paid</div>
            <div className="big">{money(order.total)}</div>
            {order.discount > 0 && <div className="note">Includes your ₱{order.discount} reward voucher.</div>}
          </div>
        </div>
      </div>

      <div className="cf-card cf-pick">
        <div className="code">
          <small>Pickup code</small>
          <strong>{order.pickupCode}</strong>
        </div>
        <div>
          <h4>Campus Store collection counter</h4>
          <p>
            {isCash
              ? `Pay ${money(order.total)} at the SSG Office first. Once your order is Ready for Pickup, show this code to staff.`
              : 'Wait until your order is Ready for Pickup, then show this code to staff.'}
          </p>
        </div>
      </div>

      <div className="bar bar-confirm">
        <button className="btn-out" onClick={() => nav('/')}>Back to Home</button>
        <button className="btn-fill" onClick={() => nav('/shop')}>Order Again</button>
      </div>
    </Screen>
  )
}
