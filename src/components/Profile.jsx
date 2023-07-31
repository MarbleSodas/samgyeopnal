import PostCard from "./PostCard";

export default function Profile ({ name, desc, data, handleEdit, handleDelete}) {
    return(
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name} Profile</span>
                <p className="desc text-left">{desc}</p>
            </h1>
            <div className='mt-10 prompt_layout'>
                    {data.map((post) => <PostCard 
                        key={post._id}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                    />)}
                </div>
        </section>
    )
}