import { createContext, useContext, useState, useMemo } from 'react'
const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [voucher, setVoucher] = useState(null)

  const addItem = (product, size, color, qty = 1) =>
    setItems((prev) => {
      const key = `${product.id}-${size}-${color}`
      const found = prev.find((i) => i.key === key)
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      return [...prev, { key, product, size, color, qty }]
    })

  const setQty = (key, qty) =>
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)))
  const removeItem = (key) => setItems((prev) => prev.filter((i) => i.key !== key))
  const clear = () => { setItems([]); setVoucher(null) }

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.product.price * i.qty, 0), [items])
  const discount = voucher && subtotal >= voucher.minSpend ? voucher.discount : 0
  const total = Math.max(0, subtotal - discount)

  return (
    <CartContext.Provider value={{ items, addItem, setQty, removeItem, clear, voucher, setVoucher, subtotal, discount, total }}>
      {children}
    </CartContext.Provider>
  )
}
export const useCart = () => useContext(CartContext)
