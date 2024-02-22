"use client";
import { UseProfile } from "@/components/UseProfile";
import ItemForm from "@/components/layout/ItemForm";
import Tabs from "@/components/layout/Tabs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


function Success() {
  toast.success("Created Menu Item", {
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
export default function CreateMenuItem() {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = UseProfile();


  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const response = await fetch('/api/menu-items', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
      setRedirectToItems(true)
      Success();
    } else {
      error();
    }

  }

  if (redirectToItems) {
    return redirect('/menu-items');
  }

  if (loading) {
    return 'Loading user info...';
  }

  if (!data.admin) {
    return 'Not an admin.';
  }



  return (
    <section className="mt-8">
      <Tabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={'/menu-items'} className="button">
          <span>Show all menu items</span>
        </Link>
      </div>
      <ItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  )
}
