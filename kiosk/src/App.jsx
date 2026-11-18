import { Routes, Route } from 'react-router-dom'
import { useIdleReset } from './hooks/useIdleReset'
import Stage from './components/Stage'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'
import Vouchers from './pages/Vouchers'
import Confirmation from './pages/Confirmation'

export default function App() {
  useIdleReset(60000)
  return (
    <Stage>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/vouchers" element={<Vouchers />} />
        <Route path="/confirmation/:orderNo" element={<Confirmation />} />
      </Routes>
    </Stage>
  )
}
