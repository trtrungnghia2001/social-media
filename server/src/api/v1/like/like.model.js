import mongoose, { Schema } from 'mongoose'

const likeSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'posts',
    },
  },
  {
    timestamps: true,
  },
)

export const LikeModel =
  mongoose.models.likes || mongoose.model('likes', likeSchema)
