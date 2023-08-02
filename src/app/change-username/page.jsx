'use client';

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ChangeUsername({ params }) {
    const router = useRouter();
    const { data:session } = useSession();

    const [submitting, setIsSubmitting] = useState(false);
    const [user, setUser] = useState([]);

    const fetchUser = async () => {
        const res = await fetch(`/api/users/${session?.user.id}/user`);
        const data = await res.json();
        setUser(data);
        console.log(user);
    }
    
    const handleUsernameChange = async (e) => {
        e.preventDefault()
        setIsSubmitting(true);

        if(!user._id) {
            return alert("User ID not found");
        }

        try {
            const response = await fetch(`/api/users/${session?.user.id}/user`, {
                method: "PATCH",
                body: JSON.stringify({
                    username: user.username,
                }),
            });        

            if (response.ok) {
                router.push("/profile");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        if(session?.user.id) fetchUser();
    },[])

    return(
        <section className='w-full max-w-full flex-center flex-col'>
            <form 
            onSubmit={handleUsernameChange}
            className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
            >
                <label>
                    <h1 className='head_text text-left blue_gradient pb-5'>
                        Your Username
                    </h1>
                    <input value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} placeholder='Username' required className='form_input'/>
                </label>
                <div className='flex-end mx-3 mb-5 gap-4'>
                    <Link href="/" className='text-gray-500 text-sm'>Cancel</Link>
                    <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
                        {submitting ? `Change...` : 'Change'}
                    </button>
                </div>
            </form>
        </section>
    )
}