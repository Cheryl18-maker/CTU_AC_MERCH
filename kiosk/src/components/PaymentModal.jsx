import { Icon } from './Icons'
import { moneyShort } from '../utils/format'

export default function PaymentModal({ total, count, onPick, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="pay" onClick={(e) => e.stopPropagation()}>
        <button className="x-btn" onClick={onClose} aria-label="Close"><Icon.close /></button>
        <div className="pay-eyebrow">CHECKOUT</div>
        <h3>How would you like to pay?</h3>
        <p>Choose a payment method to continue.</p>

        <div className="pay-total">
          <div><span>Total to pay</span><small>· {count} item{count > 1 ? 's' : ''}</small></div>
          <b>{moneyShort(total)}</b>
        </div>

        <div className="pay-grid">
          <button className="pay-opt" onClick={() => onPick('Cash')}>
            <i><Icon.cash /></i>
            <Icon.arrowRight className="go" />
            <b>Cash</b>
            <span>Pay with cash at the SSG Office</span>
          </button>
          <button className="pay-opt" onClick={() => onPick('GCash')}>
            <i><Icon.phone /></i>
            <Icon.arrowRight className="go" />
            <b>GCash</b>
            <span>Pay using your GCash app.</span>
          </button>
        </div>

        <button className="pay-back" onClick={onClose}><Icon.arrowLeft /> Back to cart</button>
      </div>
    </div>
  )
}
