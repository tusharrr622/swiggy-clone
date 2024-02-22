"use client"
import { UseProfile } from "@/components/UseProfile"
import Tabs from "@/components/layout/Tabs";
import UserForm from "@/components/layout/UserForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function EditUserpage() {
    const { loading, data } = UseProfile();
    const [user, setUser] = useState(null);
    const { id } = useParams();

    function Success() {
        toast.success("Profile Updated.", {
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


    useEffect(() => {
        fetch('/api/profile?_id=' + id).then(res => {
            res.json().then(user => {
                setUser(user);
            })
        })
    }, [id])

    async function handleSaveButtonClick(ev, data) {
        ev.preventDefault();

        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, _id: id })
        })

        if (response.ok) {
            Success();
        } else {
            error();
        }

    }


    if (loading) {
        return 'Loading user info'
    }

    if (!data.admin) {
        return 'Not an admin'
    }
    return (
        <section className="mt-8 mx-auto max-w-2xl">
            <Tabs isAdmin={true} />
            <div className="mt-8">
                <UserForm
                    user={user}
                    onSave={handleSaveButtonClick}
                />
            </div>
        </section>
    )
}
