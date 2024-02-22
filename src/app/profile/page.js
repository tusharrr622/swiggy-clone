"use client"
import Tabs from "@/components/layout/Tabs";
import UserForm from "@/components/layout/UserForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
    const session = useSession();
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const { status } = session;

    function uploadSuccess() {
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
        if (status === 'authenticated') {
            fetch('/api/profile').then(res => {
                res.json().then(data => {
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
        }
    }, [status])

    async function handleProfileInfoUpdate(ev, data) {
        ev.preventDefault();
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if (response.ok) {
            uploadSuccess();
        }
        else {
            error();
        }

    }


    if (status === 'loading' || !profileFetched) {
        return 'Loading...'
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }
    return (
        <section className="mt-8">
            <Tabs isAdmin={isAdmin} />
            <div className="max-w-2xl mx-auto mt-8">
                <UserForm user={user} onSave={handleProfileInfoUpdate} />
            </div>
        </section>
    )
}
