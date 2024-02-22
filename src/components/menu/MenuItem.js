import React, { useContext, useState } from 'react'
import AddToCartButton from './AddToCartButton';
import Image from 'next/image';

import MenuItemBox from './MenuItemBox';
import { CartContext } from '../AppContext';
import { set } from 'mongoose';
import { toast } from 'react-toastify';

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice,
    sizes, extraIngredientPrices } = menuItem;

  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopUp] = useState(false);
  const { addToCart } = useContext(CartContext);


  function uploadSuccess() {
    toast.success("Added to cart", {
      position: "top-center",
      autoClose: 5000,
    });
  }
  function error() {
    toast.error("Error", {
      position: "top-center",
      autoClose: 5000,
    });
  }

  async function handleAddToCartButtonClick() {
    console.log('Add to cart');
    const hasOptions = sizes?.length > 0 || extraIngredientPrices?.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopUp(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    setShowPopUp(false);
    uploadSuccess()
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras(prev => [...prev, extraThing]);
    }
    else {
      setSelectedExtras(prev => {
        return prev.filter(e => e.name !== extraThing.name)
      })
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }
  return (
    <>

      {showPopup && (
        <div onClick={() => setShowPopUp(false)}
          className='fixed inset-0 bg-black/80 flex items-center justify-center'
        >
          <div onClick={ev => ev.stopPropagation()}
            className='my-8 bg-white p-2 rounded-lg max-w-md'
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: 'calc(100vh - 100px)' }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className='mx-auto'
              />
              <h2 className='text-lg font-bold text-center mb-2'>{name}</h2>
              <p className='text-center text-gray-500 text-sm mb-2'>{description}</p>

              {sizes?.length > 0 && (
                <div className='py-2'>
                  <h3>Pick your size</h3>
                  {sizes.map(size => (

                    <label
                      key={size._id}
                      className='flex items-center gap-2 p-4 border rounded-md mb-1'
                    >
                      <input
                        type='radio'
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name == size.name}
                      />
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className='py-2'>
                  <h3 className='text-center text-gray-700'>Any extras?</h3>
                  {extraIngredientPrices.map(extraThing => (
                    <label
                      key={extraThing._id}
                      className='flex items-center gap-2 p-4 border rounded-md mb-1'
                    >
                      <input
                        type='checkbox'
                        onChange={ev => handleExtraThingClick(ev, extraThing)}
                        checked={selectedExtras.map(e => e._id).includes(extraThing._id)}
                        name={extraThing.name}
                      />
                      {extraThing.name} +${extraThing.price}
                    </label>
                  ))}
                </div>
              )}
              <div className="primary sticky bottom-2 mt-4 bg-primary text-white rounded-full px-8 py-2 cursor-pointer"
                onClick={handleAddToCartButtonClick}>
                Add to cart ${selectedPrice}
              </div>
              <button
                className="mt-2"
                onClick={() => setShowPopUp(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <MenuItemBox onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  )
}
