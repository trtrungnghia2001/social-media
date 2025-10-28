import { memo } from 'react'
import CommentForm from './CommentForm'
import CommentCard from './CommentCard'

const CommentContainer = () => {
  return (
    <div>
      <CommentForm />
      <ul>
        {Array(10)
          .fill(0)
          .map((_, idx) => (
            <li key={idx}>
              <CommentCard />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default memo(CommentContainer)
