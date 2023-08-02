import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (request, { params }) => {
    try {

        await connectToDB();

        const user = await User.findById(params.id);
        
        return new Response(JSON.stringify(user), {
            status: 200
        });
    } catch (error) {
        return new Response("Failed to fetch user", {
            status: 500
        });
    }
};

export const PATCH = async (request, { params }) => {
    const { username } = await request.json();
    
    try {
        await connectToDB();
        const existingUser = await User.findById(params.id);

        if(!existingUser) return new Response("User not found", {
            status: 404
        })

        existingUser.username = username;

        await existingUser.save();

        return new Response(JSON.stringify(existingUser), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to update this username", {
            status: 500
        })
    }
}