"use client"
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function OrderPage() {
    const { clearCart } = useContext(CartContext);
    const [order, setOrder] = useState(null);
    const [loadingOrder, setLoadingOrder] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setLoadingOrder(true);
            fetch(`/api/orders?_id=${id}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch order');
                    }
                    return res.json();
                })
                .then(orderData => {
                    setOrder(orderData);
                    setLoadingOrder(false);
                })
                .catch(error => {
                    console.error('Error fetching order:', error);
                    setLoadingOrder(false);
                });
        } else {
            setOrder(null);
        }
    }, [id]);

    let subTotal = 0;

    if (order?.cartProducts) {
        for (const product of order.cartProducts) {
            subTotal += cartProductPrice(product);
        }
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:primary">
                    <mark className="px-2 text-white bg-primary rounded">Your Order</mark>
                </h1>
                <div className="mt-4 mb-8">
                    <p>Thanks for your order.</p>
                    <p>We will call you when your order will be on the way.</p>
                </div>
            </div>
            {loadingOrder ? (
                <div>Loading Order...</div>
            ) : order ? (
                <div className="grid md:grid-cols-2 md:gap-16">
                    <div>
                        {order.cartProducts.map(product => (
                            <CartProduct key={product._id} product={product} />
                        ))}
                        <div className="text-right py-2 text-gray-500">
                            SubTotal:
                            <span className="text-black font-bold inline-block w-8">${subTotal}</span>
                            <br />
                            Delivery:
                            <span className="text-black font-bold inline-block w-8">$5</span>
                            <br />
                            Total:
                            <span className="text-black font-bold inline-block w-8">${subTotal + 5}</span>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <AddressInputs disabled={true} addressProps={order} />
                    </div>
                </div>
            ) : (
                <div>Order not found</div>
            )}
        </section>
    );
}
