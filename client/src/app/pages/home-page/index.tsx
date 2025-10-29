import PostInfinity from '@/features/post/components/PostInfinity'
import StorySide from '@/features/story/components/StorySide'
const HomePage = () => {
  return (
    <div>
      {/* stoies */}
      <StorySide />
      {/* posts */}
      <PostInfinity queryKey={['home', 'post']} />
    </div>
  )
}

export default HomePage
