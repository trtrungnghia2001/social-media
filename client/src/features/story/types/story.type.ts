import type {
  ResponseSuccessListType,
  ResponseSuccessType,
} from '@/shared/types/response'

export interface IStory {
  _id: string
  fileUrl: string
  type?: string
}

export interface IStoryStore {
  stories: IStory[]
  create: (data: FormData) => Promise<ResponseSuccessType<IStory>>
  deleteId: (storyId: string) => Promise<ResponseSuccessType<IStory>>
  getAll: (query?: string) => Promise<ResponseSuccessListType<IStory>>
  getMe: (query?: string) => Promise<ResponseSuccessListType<IStory>>
}
