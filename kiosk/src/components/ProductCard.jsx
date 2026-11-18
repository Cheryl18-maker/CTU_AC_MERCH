import { Icon } from './Icons'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="pcard" onClick={() => onAdd(product)}>
      <div className="pimg"><img src={product.imageUrl} alt="" draggable="false" /></div>
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <div className="prow">
        <span className="pprice">₱{product.price}</span>
        <button className="padd" onClick={(e) => { e.stopPropagation(); onAdd(product) }}>
          <Icon.plus /> Add
        </button>
      </div>
    </div>
  )
}
