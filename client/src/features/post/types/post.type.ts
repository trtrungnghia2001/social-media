import type {
  ResponseSuccessListType,
  ResponseSuccessType,
} from '@/shared/types/response'

export interface IPost {
  _id: string
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
