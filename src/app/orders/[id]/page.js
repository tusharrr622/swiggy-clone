"use client"
import { useEffect, useState } from "react";
import { useParams } from 'next/router';
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/menu/CartProduct";

export default function OrderPage({ clearCart }) {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loadingOrder, setLoadingOrder] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            setLoadingOrder(true);
            try {
                const response = await fetch(`/api/orders?_id=${id}`);
                if (response.ok) {
                    const orderData = await response.json();
                    setOrder(orderData);
                } else {
                    throw new Error("Failed to fetch order");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingOrder(false);
            }
        };

        if (id) {
            fetchOrder();
        }

        return () => {
            // Cleanup function
        };
    }, [id]);

    const calculateSubtotal = () => {
        if (!order?.cartProducts) return 0;
        return order.cartProducts.reduce((total, product) => total + cartProductPrice(product), 0);
    };

    const subtotal = calculateSubtotal();

    return (
        <section className="max-w-2xl mx-auto mt-8">
            {loadingOrder && <div>Loading order...</div>}
            {order && (
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:primary">
                        <mark className="px-2 text-white bg-primary rounded">Your order</mark>
                    </h1>
                    <div className="mt-4 mb-8">
                        <p>Thanks for your order.</p>
                        <p>We will call you when your order will be on the way.</p>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-16">
                        <div>
                            {order.cartProducts.map(product => (
                                <CartProduct key={product._id} product={product} />
                            ))}
                            <div className="text-right py-2 text-gray-500">
                                Subtotal:
                                <span className="text-black font-bold inline-block w-8">${subtotal}</span>
                                <br />
                                Delivery:
                                <span className="text-black font-bold inline-block w-8">$5</span>
                                <br />
                                Total:
                                <span className="text-black font-bold inline-block w-8">${subtotal + 5}</span>
                            </div>
                        </div>
                        <div>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <AddressInputs
                                    disabled={true}
                                    addressProps={order}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
