import PostInfinity from '@/features/post/components/PostInfinity'
import { posts } from '@/features/post/data'

const PostsPage = () => {
  return (
    <div>
      <PostInfinity data={posts} />
    </div>
  )
}

export default PostsPage
