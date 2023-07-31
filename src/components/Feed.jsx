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
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
    
        setSearchTimeout(
          setTimeout(() => {
            const searchResult = filterPrompts(e.target.value);
            setSearchedResults(searchResult);
          }, 500)
        );
      };

    const fetchPosts = async () => {
        const res = await fetch('/api/post');
        const data = await res.json(); 

        setPosts(data);
    } 

    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i");
        return posts.filter(
          (item) =>
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.prompt)
        );
      };

    const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
    };
    
    
    useEffect(() => {
        fetchPosts();
    },[])

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input type='text' placeholder='Search for a tag or username' value={searchText} onChange={handleSearchChange} required className='search_input peer'/>
            </form>
            
            {searchText ? (
                <PostCardList
                data={searchedResults}
                handleTagClick={handleTagClick}
                />
            ) : (
                <PostCardList data={posts} handleTagClick={handleTagClick} />
            )}
        </section>
    )
}