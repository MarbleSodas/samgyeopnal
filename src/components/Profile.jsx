"use client";

import PostCard from "./PostCard";
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function Profile ({ name, desc, data, handleEdit, handleDelete, handleUsername}) {
    const { data:session } = useSession();
    const pathName = usePathname();

    return(
        <section className="w-full">
            {/* Add the profile picture of the user */}
            <h1 className="text-left">
                <span className="blue_gradient head_text">{name} Profile</span>
                {(session?.user.id && pathName === "/profile" ) ? (
                    <div className="flex flex-row justify-between">
                        <p className="head_text desc text-left">{desc}</p>
                        <button type="button" className="black_btn" onClick={handleUsername}>Edit Username</button>
                    </div>
                ) : (
                    <div className="flex flex-row justify-between">
                        <p className="head_text desc text-left">{desc}</p>
                    </div>
                )}
            </h1>
            <div className='mt-10 prompt_layout'>
                {data.map((post) => 
                <PostCard 
                    key={post._id}
                    post={post}
                    handleEdit={() => handleEdit && handleEdit(post)}
                    handleDelete={() => handleDelete && handleDelete(post)}
                />
                )}
            </div>
        </section>
    )
}