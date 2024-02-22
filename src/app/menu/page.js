"use client";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react"

export default function Menupage() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(cat => {
                setCategories(cat);
            })
        })
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                setMenuItems(items);
            })
        })
    }, [])

    return (
        <section className="mt-8">
            {categories?.length > 0 && categories.map(c => (
                <div key={c._id}>
                    <div className="text-center">
                        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:primary" >
                            <mark className="px-2 text-white bg-primary rounded ">{c.name}</mark>
                        </h1>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
                        {menuItems.filter(item => item.category == c._id).map(item => (
                            <MenuItem key={item._id} {...item} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}
