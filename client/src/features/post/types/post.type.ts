import type { IUser } from '@/features/auth/types/auth'
import type {
  ResponseSuccessListType,
  ResponseSuccessType,
} from '@/shared/types/response'

export interface IPost {
  _id: string
  author: IUser
  content?: string
  file?: string
  createdAt: string
  updatedAt: string
  totalViews: number
  totalLikes: number
  totalShares: number
  totalComments: number
  totalBookmarks: number
  isLiked: boolean
  isShared: boolean
  isBookmarrked: boolean
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
  // share
  sharePost: (postId: string) => Promise<ResponseSuccessType<IPost>>
}
