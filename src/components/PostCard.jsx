"use client";

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

export default function PostCard({ post, handleTagClick, handleEdit, handleDelete }) {

    const { data:session } = useSession();
    const pathName = usePathname();
    const router = useRouter();

    const [copied, setCopied] = useState("");

    const tagSplit = (post) => {
        return post.tag.split(", ");
    }

    // Change to share link
    const handleCopy = () => {
        setCopied(post.recipe);
        navigator.clipboard.writeText(post.recipe);
        setTimeout(() => setCopied(""), 3000);
    }

    const handleProfileClick = () => {

        if (post.creator._id === session?.user.id) return router.push("/profile");

        router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    }

    return(
        <div className='prompt_card'>
            <div className='flex justify-between items-start gap-5'>
                <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' onClick={handleProfileClick}>
                    {/* Creator's Image */}
                    <Image 
                        src={post.creator.image}
                        alt='user_image'
                        width={40}
                        height={40}
                        className='rounded-full object-contain'
                    />

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-700'>
                            {post.creator.username}
                            </h3>
                    </div>
                </div>
                {/* Change to share button */}
                <div className='copy_btn' onClick={handleCopy}>
                    <Image 
                        src={copied === post.recipe
                            ? '/assets/icons/tick.svg'
                            : '/assets/icons/copy.svg'
                        }
                        width={12}
                        height={12}
                    />
                </div>
            </div>
            <p className='my-4 font-satoshi text-sm text-gray-700'>
                {post.recipe}
            </p>

            <div className='flex flex-wrap gap-3'>
                {tagSplit(post).map((tag, index) => (
                    <p key={index} className='font-inter text-sm blue_gradient cursor-pointer'
                    onClick={() => handleTagClick && handleTagClick(tag)}
                    >
                        {tag}
                    </p>
                ))}
            </div>
            {session?.user.id === post.creator._id && pathName === "/profile" && (
                <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                    <p
                        className='font-inter text-sm green_gradient cursor-pointer'
                        onClick={handleEdit}
                    >
                        Edit
                    </p>
                    <p
                        className='font-inter text-sm orange_gradient cursor-pointer'
                        onClick={handleDelete}
                    >
                        Delete
                    </p>
                </div>
            )}
        </div>
    )
}