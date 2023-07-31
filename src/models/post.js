import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        //One user can make many posts
        ref: 'User',
    },
    recipe: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required'],
    }
})

const Post = models.Post || model('Post', PostSchema);
export default Post;