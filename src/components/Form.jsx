'use client';

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import axios from 'axios';

export default function Form ({ type, post, setPost, submitting, handleSubmit }){
    const { data: session } = useSession();

    const handleFileSelected = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const imageBase64 = reader.result;
            try {
              const response = await axios.post(
                'https://photoslibrary.googleapis.com/v1/uploads',
                imageBase64,
                {
                  headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Content-type': 'application/octet-stream',
                    'X-Goog-Upload-Content-Type': file.type,
                    'X-Goog-Upload-Protocol': 'raw',
                  },
                }
              );
              const uploadToken = response.data;
              console.log('uploadToken', uploadToken);
              setPost({ ...post, image: uploadToken });
            } catch (error) {
              console.error('Error uploading image to Google Photos API', error);
            }
          };
          reader.readAsDataURL(file);
        }
      };

        return (
            <section className='w-full max-w-full flex-start flex-col'>
                <h1 className='head_text text-left'>
                   <span className='blue_gradient'>{type} Post</span> 
                </h1>
                <p className='desc text-left max-w-md'>
                    {type} and share delicious recipes with everyone here!
                </p>

                <form 
                onSubmit={handleSubmit}
                className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
                >
                    {/* Figure Out How to use images in the post */}
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Image
                        </span>
                        <input type='file' id='imageInput' name='image' onChange={handleFileSelected}/>
                    </label>

                    {post.image && <img src={post.image} alt="Preview" />}

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