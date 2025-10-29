import upload from '#server/configs/multer.config'
import express from 'express'
import { PostModel } from './post.model.js'
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from '#server/shared/services/cloudinary.service'
import {
  handleResponse,
  handleResponseList,
} from '#server/shared/utils/response.util'
import { StatusCodes } from 'http-status-codes'
import { authMiddleware } from '#server/shared/middlewares/auth.middleware'
import { LikeModel } from '../like/like.model.js'
import mongoose from 'mongoose'
import { BookmarkModel } from '../bookmark/bookmark.model.js'

const postRoute = express.Router()

postRoute.post(
  '/',
  authMiddleware,
  upload.single('file'),
  async (req, res, next) => {
    try {
      const userId = req.user._id
      const body = req.body
      const file = req.file

      let fileUrl = ''
      if (file) {
        fileUrl = await (await uploadToCloudinary(file)).url
      }

      let data = await PostModel.create({ ...body, fileUrl, author: userId })
      data = await PostModel.findById(data._id).populate('author').lean()

      return handleResponse(res, { status: StatusCodes.CREATED, data })
    } catch (error) {
      next(error)
    }
  },
)
postRoute.put(
  '/:id',
  authMiddleware,
  upload.single('file'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const file = req.file

      let fileUrl = body.file
      if (file) {
        fileUrl = await (await uploadToCloudinary(file)).url
        await deleteFromCloudinary(body.file)
      }

      const data = await PostModel.findByIdAndUpdate(
        id,
        { ...body, fileUrl },
        { new: true },
      )

      return handleResponse(res, { data })
    } catch (error) {
      next(error)
    }
  },
)
postRoute.put('/:id/like', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user._id

    const filters = {
      author: userId,
      post: id,
    }

    let checked = await LikeModel.findOne(filters)

    if (checked) {
      checked = await LikeModel.findOneAndDelete(filters, { new: true })
    } else {
      checked = await LikeModel.create(filters)
    }

    return handleResponse(res, { data: checked })
  } catch (error) {
    next(error)
  }
})
postRoute.put('/:id/bookmark', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user._id

    const filters = {
      author: userId,
      post: id,
    }

    let checked = await BookmarkModel.findOne(filters)

    if (checked) {
      checked = await BookmarkModel.findOneAndDelete(filters, { new: true })
    } else {
      checked = await BookmarkModel.create(filters)
    }

    return handleResponse(res, { data: checked })
  } catch (error) {
    next(error)
  }
})
postRoute.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params

    const data = await PostModel.findByIdAndDelete(id, { new: true })
    if (data.fileUrl) {
      await deleteFromCloudinary(data.fileUrl)
    }

    return handleResponse(res, { data })
  } catch (error) {
    next(error)
  }
})
postRoute.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const data = await PostModel.findById(id).populate('author').lean()

    return handleResponse(res, { data })
  } catch (error) {
    next(error)
  }
})
postRoute.get('/', async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.query._trackingId)

    const page = parseInt(req.query._page) || 1
    const pageSize = parseInt(req.query._limit) || 3
    const skip = parseInt(req.query._skip) || 0

    const pipeline = [
      // Join với users
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      { $unwind: '$author' },

      // Join sang likes
      {
        $lookup: {
          from: 'likes',
          localField: '_id',
          foreignField: 'post',
          as: 'likes',
        },
      },
      {
        $addFields: {
          totalLikes: { $size: '$likes' },
          isLiked: {
            $in: [userId, '$likes.author'],
          },
        },
      },
      // Join sang bookmarks
      {
        $lookup: {
          from: 'bookmarks',
          localField: '_id',
          foreignField: 'post',
          as: 'bookmarks',
        },
      },
      {
        $addFields: {
          totalBookmarks: { $size: '$bookmarks' },
          isBookmarked: {
            $in: [userId, '$bookmarks.author'],
          },
        },
      },
      // Join sang shares
      {
        $lookup: {
          from: 'shares',
          localField: '_id',
          foreignField: 'post',
          as: 'shares',
        },
      },
      {
        $addFields: {
          totalShares: { $size: '$shares' },
          isShared: {
            $in: [userId, '$shares.author'],
          },
        },
      },
      // Join sang comments
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'post',
          as: 'comments',
        },
      },
      {
        $addFields: {
          totalComments: { $size: '$comments' },
        },
      },
      // ẩn mảng
      {
        $project: {
          likes: 0,
          bookmarks: 0,
          shares: 0,
          comments: 0,
        },
      },

      // Sort & Pagination
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * pageSize + skip },
      { $limit: pageSize },
    ]

    const [data, total] = await Promise.all([
      PostModel.aggregate(pipeline),
      PostModel.countDocuments(),
    ])
    const totalPages = Math.ceil(total / pageSize)

    return handleResponseList(res, {
      data,
      pagination: {
        total,
        page,
        pageSize,
        totalPages,
      },
    })
  } catch (error) {
    next(error)
  }
})
export default postRoute
