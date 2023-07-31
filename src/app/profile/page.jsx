"use client";

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@/components/Profile'

export default function MyProfile() {
    const router = useRouter();
    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);

    const handleEdit = (post) => {
        router.push(`/update-post?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this post?");

        if(hasConfirmed) {
            try{
                await fetch(`/api/post/${post._id.toString()}`, {
                    method: 'DELETE'
                });
                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);
            } catch (error){
                console.log(error)
            }
        }
    }

    const fetchPosts = async () => {
        const res = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await res.json(); 

        setPosts(data);
    } 

    useEffect(() => {
        if(session?.user.id) fetchPosts();
    },[])

    return (
        <Profile 
            name="My"
            desc="Welcome to your profile!"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}