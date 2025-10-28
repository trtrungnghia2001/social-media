import { memo } from 'react'
import type { IStory } from '../types/story.type'

interface StoryCardProps {
  data: IStory
}

const StoryCard = ({ data }: StoryCardProps) => {
  return (
    <div>
      <div className="aspect-story overflow-hidden rounded-lg cursor-pointer">
        <img src={data.fileUrl} alt="file" className="img" />
      </div>
    </div>
  )
}

export default memo(StoryCard)
