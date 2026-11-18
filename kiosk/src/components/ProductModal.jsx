import { useState } from 'react'
import { Icon } from './Icons'
import { money } from '../utils/format'

const SWATCH = {
  black: '#111a2e', white: '#ffffff', green: '#2f6b3f', orange: '#f47a20', navy: '#1e3a5f',
  gray: '#9ca3af', grey: '#9ca3af', red: '#c62828', maroon: '#7b1e2b', cream: '#f1e7d0',
}

export default function ProductModal({ product, onClose, onConfirm }) {
  const sizes = product.sizes ? product.sizes.split(',') : []
  const colors = product.colors ? product.colors.split(',') : []
  const [size, setSize] = useState(sizes[1] || sizes[0] || '')
  const [color, setColor] = useState(colors[0] || '')
  const [qty, setQty] = useState(1)

  const variant = [color, size].filter(Boolean).join(' / ')

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head">
          <h3>Make it yours</h3>
          <button className="x-btn rect" onClick={onClose} aria-label="Close"><Icon.close /></button>
        </div>

        <div className="sheet-top">
          <div className="sheet-img"><img src={product.imageUrl} alt="" /></div>
          <div className="sheet-info">
            <div className="eyebrow">Campus {product.category}</div>
            <h2>{product.name}</h2>
            <div className="big-price">{money(product.price)}</div>
            <p>{product.description}</p>
            <div className="stock">In stock · {product.stock} available{variant ? ` in ${variant}` : ''}</div>
          </div>
        </div>

        {sizes.length > 0 && (
          <div className="sec">
            <div className="sec-head"><b>Choose your size</b><span>Selected: {size}</span></div>
            <div className="chips">
              {sizes.map((s) => (
                <button key={s} className={`chip-size ${s === size ? 'on' : ''}`} onClick={() => setSize(s)}>
                  {s}{s === size && <Icon.check />}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="row2 sec">
          {colors.length > 0 ? (
            <div>
              <div className="sec-head"><b>Choose your color</b></div>
              <div className="chips">
                {colors.map((c) => {
                  const hex = SWATCH[c.trim().toLowerCase()] || '#cccccc'
                  return (
                    <button key={c} className={`chip-color ${c === color ? 'on' : ''}`} onClick={() => setColor(c)}>
                      <span className={`swatch ${hex === '#ffffff' ? 'light' : ''}`} style={{ background: hex }} />
                      {c}{c === color && <Icon.check />}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : <div />}
          <div>
            <div className="sec-head"><b>Quantity</b></div>
            <div className="stepper lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Less"><Icon.minus /></button>
              <b>{qty}</b>
              <button className="plus" onClick={() => setQty(Math.min(product.stock, qty + 1))} aria-label="More"><Icon.plus /></button>
            </div>
          </div>
        </div>

        <div className="sum">
          <div>
            <b>{variant || product.name} · {qty} item{qty > 1 ? 's' : ''}</b>
            <small>{money(product.price)} × {qty}</small>
          </div>
          <div className="right"><span>Subtotal</span><strong>{money(product.price * qty)}</strong></div>
        </div>

        <div className="sheet-actions">
          <button className="btn-out" onClick={onClose}>Cancel</button>
          <button className="btn-fill" onClick={() => onConfirm(product, size, color, qty)}>
            <Icon.bag /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
