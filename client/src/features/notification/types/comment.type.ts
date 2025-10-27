import type {
  ResponseSuccessListType,
  ResponseSuccessType,
} from '@/shared/types/response'

export interface IComment {
  _id: string
}

export interface ICommentStore {
  comments: IComment[]
  create: (data: FormData) => Promise<ResponseSuccessType<IComment>>
  updateId: (
    commentId: string,
    data: FormData,
  ) => Promise<ResponseSuccessType<IComment>>
  deleteId: (commentId: string) => Promise<ResponseSuccessType<IComment>>
  getId: (commentId: string) => Promise<ResponseSuccessType<IComment>>
  getAll: (query?: string) => Promise<ResponseSuccessListType<IComment>>
  getMe: (query?: string) => Promise<ResponseSuccessListType<IComment>>
  // like
  toggleLike: (commentId: string) => Promise<ResponseSuccessType<IComment>>
}
