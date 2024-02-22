import { useEffect, useState } from "react"
import MenuItem from "../menu/MenuItem";


export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setBestSellers(menuItems.slice(-3));
            })
        })
    }, [])


    return (
        <div className="text-center">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:primary" >
                <mark className="px-2 text-white bg-primary rounded ">Inspiration for your first order</mark>
            </h1>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {bestSellers?.length > 0 && bestSellers.map(item => (
                    <MenuItem key={item._id} {...item} />
                ))}
            </div>
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:primary" >
                <mark className="px-2 text-white bg-primary rounded ">We always provide you the best in town</mark>
            </h1>
            <h1 className="mb-8 font-extrabold leading-none tracking-tight text-primary md:text-5xl">Special Offers</h1>
            <p className="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">&#x2022; 20% off your first order from Bella Italia</p>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">&#x2022; Buy One, Get One Free on selected items from Spice Village</p>

            <div id="about">
                <h1 className="mt-20 mb-8 font-extrabold leading-none tracking-tight text-primary md:text-5xl">About Us</h1>
                <p className="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Welcome to our Swiggy ! We aim to provide you with a convenient way to order food from your favorite restaurants and have it delivered to your doorstep.</p>
                <p className="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Our platform connects you with a wide range of restaurants, offering various cuisines to satisfy your cravings. Whether you re looking for a quick bite or a hearty meal, we got you covered.</p>
                <p className="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">At Swiggy, we prioritize customer satisfaction and strive to make your food ordering experience seamless and enjoyable. Thank you for choosing us for your food delivery needs!</p>
            </div>

            <div id="contact">
                <h1 className="mt-20 mb-8 font-extrabold leading-none tracking-tight text-primary md:text-5xl">Contact Us</h1>
                <p className="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">If you have any questions, feedback, or issues, feel free to reach out to us. We&apos;re here to help!</p>
                <h2 className="mb-8 font-extrabold leading-none tracking-tight text-primary md:text-5xl">Contact Information:</h2>
                <p className="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Email: info@swiggy.com</p>
                <p className="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Phone: 123-456-7890</p>
                <p className="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Address: 123 Main Street, City, Country</p>
                <h2 className="mb-8 font-extrabold leading-none tracking-tight text-primary md:text-5xl">Customer Support:</h2>
                <p className="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">For customer support, please email support@swiggy.com or call our helpline at 987-654-3210.</p>
                <p className="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Our customer support team is available 24/7 to assist you with any queries or concerns you may have.</p>
            </div>

        </div>
    )
}
