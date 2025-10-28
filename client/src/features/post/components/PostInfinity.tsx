import { memo } from 'react'
import type { IPost } from '../types/post.type'
import PostCard from './PostCard'
import PostForm from './PostForm'

interface PostInfinityProps {
  data: IPost[]
}

const PostInfinity = ({ data }: PostInfinityProps) => {
  return (
    <div>
      <PostForm />
      {data.map((post) => (
        <PostCard key={post._id} data={post} />
      ))}
    </div>
  )
}

export default memo(PostInfinity)
