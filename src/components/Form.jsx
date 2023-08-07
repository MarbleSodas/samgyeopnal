'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Dropimage from './Dropimage';
import ReactCrop from 'react-image-crop';
import { useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css'
import ImageCropper from './ImageCropper';

export default function Form ({ type, post, setPost, submitting, handleSubmit }){
    // const { data: session } = useSession();
    const [file, setFile] = useState([]);

        return (
            <section className='w-full max-w-full flex-start flex-col mb-20'>
                <h1 className='head_text text-left'>
                   <span className='blue_gradient'>{type} Post</span> 
                </h1>
                
                <form 
                onSubmit={handleSubmit}
                className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
                >
                    {/* Figure Out How to use images in the post */}
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Image
                            <span className='font-normal'> {`(for optimal image cropping, use 16:9 aspect ratio)`}</span>
                        </span>
                        { file.preview ? <ImageCropper file={file} setFile={setFile}/>
                        : <Dropimage className='p-2 mt-10 border border-dashed rounded-xl border-neutral-300 font-inter text-center justify-center flex'
                        post={post}
                        setPost={setPost}
                        file={file}
                        setFile={setFile}
                        />}
                        {/* { file.preview &&
                        <div className='justify-center'>
                            <ReactCrop crop={crop} onChange={(c, percentCrop) => setCrop(c)}>
                                <Image alt={file.name} src={file.preview} width={200} height={200} />
                            </ReactCrop>
                        </div>
                        } */}
                    </label>

                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Your Recipe
                        </span>

                        <textarea value={post.recipe} onChange={(e) => setPost({...post, recipe: e.target.value})} placeholder='Enter the Recipe step by step here!' required className='form_textarea'/>
                    </label>
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Tag
                            <span className='font-normal'> {`(#soup, #vegetables, #drink) seperate each tag with ", "`}</span>
                        </span>

                        <input value={post.tag} onChange={(e) => setPost({...post, tag: e.target.value})} placeholder='#anytagofyourchoice' required className='form_input'/>
                    </label>
                    <div className='flex-end mx-3 mb-5 gap-4'>
                        <Link href="/" className='text-gray-500 text-sm'>Cancel</Link>
                        <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
                            {submitting ? `${type}...` : type}
                        </button>
                    </div>
                </form>
            </section>
        )
}