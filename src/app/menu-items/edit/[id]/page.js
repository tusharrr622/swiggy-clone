"use client";
import DeleteButton from "@/components/DeleteButton";
import { UseProfile } from "@/components/UseProfile";
import ItemForm from "@/components/layout/ItemForm";
import Tabs from "@/components/layout/Tabs";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


function Success() {
    toast.success("Menu Item Updated", {
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
    const [menuItem, setMenuItem] = useState();
    const { id } = useParams();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setMenuItem(item)
            })
        })
    }, [id]);


    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        data = { ...data, _id: id };


        const response = await fetch('/api/menu-items', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            setRedirectToItems(true);
            Success();
        }
        else {
            error();
        }
    }

    async function handleDeleteClick() {
        await fetch('/api/menu-items?_id=' + id, {
            method: 'DELETE',
        })
        setRedirectToItems(true);
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
            <ItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />

            <div className="max-w-md mx-auto mt-2">
                <div className="max-w-xs ml-auto pl-4">
                    <DeleteButton label="Delete this menu item" onDelete={handleDeleteClick} />
                </div>
            </div>
        </section>
    )
}
