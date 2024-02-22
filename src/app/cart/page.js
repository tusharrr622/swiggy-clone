"use client"
import { CartContext, cartProductPrice } from "@/components/AppContext"
import { UseProfile } from "@/components/UseProfile";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/menu/CartProduct";

import { useContext, useEffect, useState } from "react"


export default function Cartpage() {
    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [address, setAddress] = useState({});
    const { data: profileData } = UseProfile();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                alert('payment failed');
            }
        }
    }, [])

   
    useEffect(() => {
        if (profileData?.city) {
            const { phone, streetAddress, city, postalCode, country } = profileData;
            const addressFromProfile = {
                phone, streetAddress, city, postalCode, country
            }
            setAddress(addressFromProfile);
        }

    }, [profileData])

    let SubTotal = 0;
    for (const p of cartProducts) {
        SubTotal += cartProductPrice(p);
    }


    async function handleProceedToCheckout(ev) {
        ev.preventDefault();

        fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address,
                cartProducts,
            })
        }).then(async (response) => {
            if (response.ok) {
                window.location = await response.json();
            }
        })
    }

    async function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: value }))
    }
    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8">
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:primary" >
                        <mark className="px-2 text-white bg-primary rounded ">Cart</mark>
                    </h1>
                    <p className="mt-16 text-gray-500 font-bold dark:text-gray-400">Your shopping cart is empty </p>
                </div>
            </section>
        )
    }


    return (
        <section className="mt-8">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:primary" >
                    <mark className="px-2 text-white bg-primary rounded ">Cart</mark>
                </h1>
            </div>
            <div className="mt-8 grid gap-8 grid-cols-2">
                <div>
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct
                            key={index}
                            product={product}
                            onRemove={removeCartProduct}
                            index={index}
                        />
                    ))}
                    <div className="py-2 pr-16 flex justify-end items-center">
                        <div className="text-gray-500">
                            SubTotal:<br />
                            Delivery:<br />
                            Total:
                        </div>
                        <div className="font-semibold pl-2 text-right">
                            ${SubTotal}<br />
                            $5<br />
                            ${SubTotal + 5}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg h-96">
                    <h2>Checkout</h2>
                    <form onSubmit={handleProceedToCheckout}>
                        <AddressInputs
                            addressProps={address}
                            setAddressProp={handleAddressChange}
                        />
                        <button type='submit'> Pay ${SubTotal + 5}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}
