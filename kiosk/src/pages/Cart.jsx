import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Screen from '../components/Screen'
import PaymentModal from '../components/PaymentModal'
import { Icon } from '../components/Icons'
import { money } from '../utils/format'

export default function Cart() {
  const nav = useNavigate()
  const { items, setQty, removeItem, subtotal, discount, total, voucher, clear } = useCart()
  const { user } = useAuth()
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')

  const count = items.reduce((s, i) => s + i.qty, 0)

  const checkout = async (method) => {
    try {
      const images = Object.fromEntries(items.map((i) => [i.product.name, i.product.imageUrl]))
      const order = await api.createOrder({
        userId: user?.id ?? null,
        paymentMethod: method,
        voucherId: discount > 0 ? voucher?.id ?? null : null,
        items: items.map((i) => ({ productId: i.product.id, size: i.size, color: i.color, quantity: i.qty })),
      })
      clear()
      nav(`/confirmation/${order.orderNo}`, { state: { images } })
    } catch (e) {
      setError(e.message)
      setPaying(false)
    }
  }

  return (
    <Screen tone="taupe">
      <img className="logo logo-top" src="/images/ctu.png" alt="" />
      <h2 className="page-title" style={{ top: 146 }}>Your shopping cart</h2>
      <div className="pill" style={{ right: 46, top: 143 }}>Cart</div>

      <div className="cart-card">
        <div className="cart-head">Your merchandise <span>{count} item{count === 1 ? '' : 's'}</span></div>
        <div className="cart-list">
          {items.length === 0 && <div className="cart-empty">Your cart is empty.</div>}
          {items.map((i) => (
            <div className="crow" key={i.key}>
              <img src={i.product.imageUrl} alt="" draggable="false" />
              <div className="cinfo">
                <div className="cname">{i.product.name}</div>
                <div className="cvar">{[i.color, i.size].filter(Boolean).join(' / ')}{(i.color || i.size) && ' · '}{money(i.product.price)} each</div>
                <div className="stepper sm">
                  <button onClick={() => setQty(i.key, i.qty - 1)} aria-label="Less"><Icon.minus /></button>
                  <b>{i.qty}</b>
                  <button className="plus" onClick={() => setQty(i.key, i.qty + 1)} aria-label="More"><Icon.plus /></button>
                </div>
              </div>
              <div className="cright">
                <div className="cprice">{money(i.product.price * i.qty)}</div>
                <button className="crm" onClick={() => removeItem(i.key)}><Icon.trash /> Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sum-card">
        {discount > 0 ? (
          <button className="banner" onClick={() => nav('/vouchers')}>
            <Icon.ticket /> <span className="grow">₱{voucher.discount} reward voucher applied. A little perk, on us.</span>
          </button>
        ) : user ? (
          <button className="banner" onClick={() => nav('/vouchers')}>
            <Icon.ticket /> <span className="grow">Tap to use a reward voucher</span> <Icon.arrowRight />
          </button>
        ) : (
          <button className="banner" onClick={() => nav('/login')}>
            <Icon.ticket /> <span className="grow">Log in to earn points and use rewards</span> <Icon.arrowRight />
          </button>
        )}
        <div className="srow"><span>Subtotal · {count} item{count === 1 ? '' : 's'}</span><b>{money(subtotal)}</b></div>
        <div className="srow"><span>Reward voucher</span><b className="disc">−{money(discount)}</b></div>
        <div className="stotal"><span>Total</span><b>{money(total)}</b></div>
      </div>

      {error && <div className="form-error center">{error}</div>}

      <div className="bar bar-cart">
        <button className="btn-out" onClick={() => nav('/shop')}>Continue Shopping</button>
        <button className="btn-fill" disabled={!items.length} onClick={() => setPaying(true)}>
          <Icon.arrowRight /> Proceed to Checkout
        </button>
      </div>

      {paying && <PaymentModal total={total} count={count} onPick={checkout} onClose={() => setPaying(false)} />}
    </Screen>
  )
}
