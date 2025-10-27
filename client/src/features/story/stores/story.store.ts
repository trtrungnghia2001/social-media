import { create } from 'zustand'
import type { IStory, IStoryStore } from '../types/story.type'
import instance from '@/configs/axios.config'
import type {
  ResponseSuccessListType,
  ResponseSuccessType,
} from '@/shared/types/response'

const baseUrl = `/api/v1/post/`

export const useStoryStore = create<IStoryStore>()((set, get) => ({
  stories: [],
  create: async (data) => {
    const resp = (
      await instance.post<ResponseSuccessType<IStory>>(baseUrl, data)
    ).data
    set({
      stories: [resp.data, ...get().stories],
    })
    return resp
  },
  deleteId: async (storyId) => {
    const resp = (
      await instance.delete<ResponseSuccessType<IStory>>(baseUrl + storyId)
    ).data
    set({
      stories: get().stories.filter((i) => i._id !== storyId),
    })
    return resp
  },
  getAll: async (query = '') => {
    const resp = (
      await instance.get<ResponseSuccessListType<IStory>>(baseUrl + '?' + query)
    ).data
    set({
      stories: resp.data,
    })
    return resp
  },
  getMe: async (query = '') => {
    const resp = (
      await instance.get<ResponseSuccessListType<IStory>>(baseUrl + '?' + query)
    ).data
    set({
      stories: resp.data,
    })
    return resp
  },
}))
