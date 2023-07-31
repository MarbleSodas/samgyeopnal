import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const POST = async (req, res) => {
    const { userId, recipe, tag } = await req.json();

    try {
        await connectToDB();
        const newPost = new Post({
            creator: userId,
            recipe,
            tag
        })

        await newPost.save();
        return new Response(JSON.stringify(newPost),{
            status: 201
        })
    } catch (error) {
        return new Response("Failed to make a new post", {
            status: 500
        })
    }
}