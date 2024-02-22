export default function AddToCartButton({ hasSizesOrExtras, onClick, basePrice, image }) {

  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4">
        <div onClick={onClick} className="mt-4 bg-primary text-white rounded-full px-8 py-2 cursor-pointer">
          AddToCart ${basePrice}
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      <span>Add To Cart(from ${basePrice})</span>
    </button>
  )
}
