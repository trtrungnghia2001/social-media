import { memo } from 'react'
import PostCard from './PostCard'
import PostForm from './PostForm'
import { usePostStore } from '../stores/post.store'
import { useInfiniteQuery } from '@tanstack/react-query'

interface PostInfinityProps {
  queryKey: string[]
  isMe?: boolean
}

const PostInfinity = ({ queryKey, isMe }: PostInfinityProps) => {
  const { getAll, getMe, posts } = usePostStore()
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: queryKey,
      queryFn: async ({ pageParam }) =>
        isMe
          ? await getMe(`_page=${pageParam}&_skip=${posts.length}`)
          : await getAll(`_page=${pageParam}&_skip=${posts.length}`),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage.pagination.page < lastPage.pagination.totalPages)
          return lastPageParam + 1

        return undefined
      },
    })

  const postsServer = data?.pages.flatMap((page) => page.data) || []
  const costomPost = [...posts, ...postsServer]

  return (
    <div>
      <PostForm />
      {costomPost.map((post) => (
        <PostCard key={post._id} data={post} />
      ))}
      {hasNextPage && (
        <div
          className="text-center p-4 underline cursor-pointer"
          onClick={() => {
            fetchNextPage()
          }}
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load more'}
        </div>
      )}
    </div>
  )
}

export default memo(PostInfinity)
