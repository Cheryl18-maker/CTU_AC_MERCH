import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Screen from '../components/Screen'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import QrBadge from '../components/QrBadge'
import { Icon } from '../components/Icons'

const CATEGORIES = ['Apparel', 'Accessories', 'Collectibles', 'Drinkware']

export default function Catalog() {
  const nav = useNavigate()
  const { addItem, items } = useCart()
  const { user, logout } = useAuth()
  const [products, setProducts] = useState([])
  const [loadError, setLoadError] = useState('')
  const [category, setCategory] = useState('Apparel')
  const [selected, setSelected] = useState(null)
  const [rail, setRail] = useState(0)
  const panelRef = useRef(null)

  useEffect(() => {
    api.products().then(setProducts).catch((e) => setLoadError(e.message))
  }, [])

  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0
    setRail(0)
  }, [category])

  const onScroll = (e) => {
    const el = e.currentTarget
    const max = el.scrollHeight - el.clientHeight
    setRail(max > 0 ? el.scrollTop / max : 0)
  }

  const visible = products.filter((p) => p.category === category)
  const thumb = (c) => products.find((p) => p.category === c)?.imageUrl
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <Screen tone="white">
      <img className="logo logo-cat" src="/images/ctu.png" alt="Cebu Technological University" />

      <div className="user-area">
        {user && (
          <div className="user-chip">
            <span>{user.universityId} · {user.points} pts</span>
            <button onClick={() => { logout(); nav('/') }}>Log out</button>
          </div>
        )}
        <button className="user-btn" onClick={() => !user && nav('/login')} aria-label="Account">
          <Icon.user />
        </button>
      </div>

      <div className="sidebar">
        {CATEGORIES.map((c) => (
          <button key={c} className={`cat ${c === category ? 'active' : ''}`} onClick={() => setCategory(c)}>
            <div className="timg">{thumb(c) && <img src={thumb(c)} alt="" draggable="false" />}</div>
            <span>{c}</span>
          </button>
        ))}
      </div>

      <div className="panel" ref={panelRef} onScroll={onScroll}>
        {visible.length > 0 ? (
          <div className="grid">
            {visible.map((p) => <ProductCard key={p.id} product={p} onAdd={setSelected} />)}
          </div>
        ) : (
          <div className="panel-msg">
            {loadError ? "We can't reach the store right now. Please ask staff for help." : 'Nothing here yet. Try another category.'}
          </div>
        )}
      </div>
      <div className="rail"><i style={{ top: `${13 + rail * 700}px` }} /></div>

      <QrBadge />

      <div className="bar bar-cat">
        <button className="btn-out red" onClick={() => nav('/')}>Cancel</button>
        <button className="btn-out orange-edge" onClick={() => nav('/cart')}>
          Add to Order {count > 0 && <span className="badge">{count}</span>}
        </button>
      </div>

      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          onConfirm={(p, s, c, q) => { addItem(p, s, c, q); setSelected(null) }}
        />
      )}
    </Screen>
  )
}
