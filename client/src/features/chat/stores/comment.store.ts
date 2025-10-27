import { create } from 'zustand'
import type { IComment, ICommentStore } from '../types/comment.type'
import instance from '@/configs/axios.config'
import type {
  ResponseSuccessListType,
  ResponseSuccessType,
} from '@/shared/types/response'

const baseUrl = `/api/v1/comment/`

export const usePostStore = create<ICommentStore>()((set, get) => ({
  comments: [],
  create: async (data) => {
    const resp = (
      await instance.post<ResponseSuccessType<IComment>>(baseUrl, data)
    ).data
    set({
      comments: [resp.data, ...get().comments],
    })
    return resp
  },
  updateId: async (commentId, data) => {
    const resp = (
      await instance.put<ResponseSuccessType<IComment>>(
        baseUrl + commentId,
        data,
      )
    ).data
    set({
      comments: get().comments.map((i) =>
        i._id === commentId ? { ...i, ...resp.data } : i,
      ),
    })
    return resp
  },
  deleteId: async (commentId) => {
    const resp = (
      await instance.delete<ResponseSuccessType<IComment>>(baseUrl + commentId)
    ).data
    set({
      comments: get().comments.filter((i) => i._id !== commentId),
    })
    return resp
  },
  getId: async (commentId) => {
    const resp = (
      await instance.get<ResponseSuccessType<IComment>>(baseUrl + commentId)
    ).data

    return resp
  },
  getAll: async (query = '') => {
    const resp = (
      await instance.get<ResponseSuccessListType<IComment>>(
        baseUrl + '?' + query,
      )
    ).data
    set({
      comments: resp.data,
    })
    return resp
  },
  getMe: async (query = '') => {
    const resp = (
      await instance.get<ResponseSuccessListType<IComment>>(
        baseUrl + '?' + query,
      )
    ).data
    set({
      comments: resp.data,
    })
    return resp
  },
  toggleLike: async (commentId) => {
    const resp = (
      await instance.post<ResponseSuccessType<IComment>>(
        baseUrl + commentId + '/like',
      )
    ).data
    set({
      comments: get().comments.map((i) =>
        i._id === commentId ? { ...i, ...resp.data } : i,
      ),
    })
    return resp
  },
}))
