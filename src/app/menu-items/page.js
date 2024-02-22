"use client";
import { UseProfile } from "@/components/UseProfile";
import Tabs from "@/components/layout/Tabs";
import Image from "next/image";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {

  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = UseProfile();

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setMenuItems(menuItems);
      })
    })

  }, [])

  if (loading) {
    return 'Loading user info...'
  }

  if (!data.admin) {
    return 'Not an admin.'
  }
  return (

    <section className="mt-8 max-w-2xl mx-auto">
      <Tabs isAdmin={true} />

      <Link className="mt-8 button" href={'menu-items/new'}>
        <span>Create Menu item</span>
      </Link>

      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 && menuItems.map(item => (
            <Link
              key={item._id}
              href={'/menu-items/edit/' + item._id}
              className="bg-gray-200 rounded-lg p-4"
            >
              <div className="relative">
                <Image
                  className="rounded-md"
                  src={item.image}
                  alt={''}
                  width={200}
                  height={200}
                />
              </div>

              <div className="text-center mt-2">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>


  )
}
