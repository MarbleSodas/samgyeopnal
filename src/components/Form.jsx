import Link from 'next/link'

export default function Form ({ type, post, setPost, submitting, handleSubmit }){
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