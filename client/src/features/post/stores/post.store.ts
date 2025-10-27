import { create } from 'zustand'
import type { IPost, IPostStore } from '../types/post.type'
import instance from '@/configs/axios.config'
import type {
  ResponseSuccessListType,
  ResponseSuccessType,
} from '@/shared/types/response'

const baseUrl = `/api/v1/post/`

export const usePostStore = create<IPostStore>()((set, get) => ({
  posts: [],
  create: async (data) => {
    const resp = (
      await instance.post<ResponseSuccessType<IPost>>(baseUrl, data)
    ).data
    set({
      posts: [resp.data, ...get().posts],
    })
    return resp
  },
  updateId: async (postId, data) => {
    const resp = (
      await instance.put<ResponseSuccessType<IPost>>(baseUrl + postId, data)
    ).data
    set({
      posts: get().posts.map((i) =>
        i._id === postId ? { ...i, ...resp.data } : i,
      ),
    })
    return resp
  },
  deleteId: async (postId) => {
    const resp = (
      await instance.delete<ResponseSuccessType<IPost>>(baseUrl + postId)
    ).data
    set({
      posts: get().posts.filter((i) => i._id !== postId),
    })
    return resp
  },
  getId: async (postId) => {
    const resp = (
      await instance.get<ResponseSuccessType<IPost>>(baseUrl + postId)
    ).data

    return resp
  },
  getAll: async (query = '') => {
    const resp = (
      await instance.get<ResponseSuccessListType<IPost>>(baseUrl + '?' + query)
    ).data
    set({
      posts: resp.data,
    })
    return resp
  },
  getMe: async (query = '') => {
    const resp = (
      await instance.get<ResponseSuccessListType<IPost>>(baseUrl + '?' + query)
    ).data
    set({
      posts: resp.data,
    })
    return resp
  },
  toggleLike: async (postId) => {
    const resp = (
      await instance.post<ResponseSuccessType<IPost>>(
        baseUrl + postId + '/like',
      )
    ).data
    set({
      posts: get().posts.map((i) =>
        i._id === postId ? { ...i, ...resp.data } : i,
      ),
    })
    return resp
  },
  sharePost: async (postId) => {
    const resp = (
      await instance.post<ResponseSuccessType<IPost>>(
        baseUrl + postId + '/share',
      )
    ).data
    set({
      posts: [resp.data, ...get().posts],
    })
    return resp
  },
}))
