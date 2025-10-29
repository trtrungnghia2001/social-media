import mongoose, { Schema } from 'mongoose'

const bookmarkSchema = new mongoose.Schema(
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

export const BookmarkModel =
  mongoose.models.bookmarks || mongoose.model('bookmarks', bookmarkSchema)
