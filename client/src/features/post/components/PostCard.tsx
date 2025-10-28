import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { postActions } from '../constants'
import clsx from 'clsx'
import CommentContainer from '@/features/comment/components/CommentContainer'
import type { IPost } from '../types/post.type'

interface PostCardPops {
  data: IPost
}

const PostCard = ({ data }: PostCardPops) => {
  const [showComment, setShowComment] = useState(false)
  return (
    <article>
      <div
        className={clsx([
          `p-4 space-y-4 border-t`,
          !showComment && `hover:bg-gray-100`,
        ])}
      >
        {/* top */}
        <div>
          {/* left */}
          <Link to={`/`} className="flex items-center gap-2">
            <div className="w-10 aspect-square overflow-hidden rounded-full">
              <img
                src={`https://pbs.twimg.com/media/GfWINn1aYAAsuGu?format=jpg&name=medium`}
                alt="avatar"
                className="img"
              />
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-primary">I simp only boa 🔞</h4>
              <p className="text-xs">{new Date().toLocaleString()}</p>
            </div>
          </Link>
        </div>
        {/* text */}
        {data?.content && (
          <div
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          ></div>
        )}
        {/* file */}
        {data?.file && (
          <div className="rounded-lg overflow-hidden">
            <img src={data.file} alt="img" className="img" />
          </div>
        )}
        <div className="text-sm font-medium">54 N Lượt xem</div>
        {/* action */}
        <div
          className={clsx([
            `flex justify-between items-center border-t border-gray-200 p-2`,
            showComment && `border-b`,
          ])}
        >
          {postActions.map(({ icon: Icon, count }, i) => (
            <button
              key={i}
              onClick={() => setShowComment(!showComment)}
              className={`flex items-center gap-1 transition-colors duration-150 `}
            >
              <Icon size={18} />
              {count !== undefined && <span className="text-xs">{count}</span>}
            </button>
          ))}
        </div>
      </div>
      {/* comment */}
      {showComment && <CommentContainer />}
    </article>
  )
}

export default memo(PostCard)
