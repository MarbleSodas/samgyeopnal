'use client';

import { useState, useEffect } from 'react';

import PostCard from '@/components/PostCard';

const PostCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => <PostCard 
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
            />)}
        </div>
    )
}

export default function Feed() {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (e) => {

    }

    const fetchPosts = async () => {
        const res = await fetch('/api/post');
        const data = await res.json(); 

        setPosts(data);
    } 

    useEffect(() => {
        fetchPosts();
    },[])

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input type='text' placeholder='Search for a tag or username' value={searchText} onChange={handleSearchChange} required className='search_input peer'/>
            </form>
            
            <PostCardList
            data={posts}
            handleTagClick={() => {}}
            />
        </section>
    )
}