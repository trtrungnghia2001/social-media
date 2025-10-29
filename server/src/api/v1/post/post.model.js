import mongoose, { Schema } from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    content: String,
    fileUrl: String,
    content: String,
    totalViews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export const PostModel =
  mongoose.models.posts || mongoose.model('posts', postSchema)
