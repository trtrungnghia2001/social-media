import type { IUser } from '@/features/auth/types/auth'
import type {
  ResponseSuccessListType,
  ResponseSuccessType,
} from '@/shared/types/response'

export interface IPost {
  _id: string
  author: IUser
  content?: string
  fileUrl?: string
  createdAt: string
  updatedAt: string

  totalViews: number

  totalLikes: number
  isLiked: boolean

  totalBookmarks: number
  isBookmarked: boolean

  totalShares: number
  isShared: boolean

  totalComments: number
}

export interface IPostDTO {
  content?: string
  file?: File
}

export interface IPostStore {
  posts: IPost[]
  create: (data: FormData) => Promise<ResponseSuccessType<IPost>>
  updateId: (
    postId: string,
    data: FormData,
  ) => Promise<ResponseSuccessType<IPost>>
  deleteId: (postId: string) => Promise<ResponseSuccessType<IPost>>
  getId: (postId: string) => Promise<ResponseSuccessType<IPost>>
  getAll: (query?: string) => Promise<ResponseSuccessListType<IPost>>
  getMe: (query?: string) => Promise<ResponseSuccessListType<IPost>>
  // like
  toggleLike: (postId: string) => Promise<ResponseSuccessType<IPost>>
  // repost
  toggleRepost: (postId: string) => Promise<ResponseSuccessType<IPost>>
  // bookmark
  toggleBookmark: (postId: string) => Promise<ResponseSuccessType<IPost>>
}
