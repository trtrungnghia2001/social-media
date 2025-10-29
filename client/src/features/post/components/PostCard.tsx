import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import CommentContainer from '@/features/comment/components/CommentContainer'
import type { IPost } from '../types/post.type'
import { IMAGE_NOTFOUND } from '@/shared/constants/image.constant'
import { Bookmark, Heart, MessageCircle, Repeat2, Share2 } from 'lucide-react'
import { usePostStore } from '../stores/post.store'
import { useMutation } from '@tanstack/react-query'

interface PostCardPops {
  data: IPost
}

const PostCard = ({ data }: PostCardPops) => {
  // state
  const [showComment, setShowComment] = useState(false)
  const { toggleLike, toggleRepost, toggleBookmark } = usePostStore()
  const toggleLikeResult = useMutation({
    mutationFn: async () => await toggleLike(data._id),
    onSuccess: () =>
      setPostActions((prev) => ({
        ...prev,
        like: {
          ...prev.like,
          checked: !prev.like.checked,
          count: prev.like.checked ? prev.like.count - 1 : prev.like.count + 1,
        },
      })),
  })
  const toggleRepostResult = useMutation({
    mutationFn: async () => await toggleRepost(data._id),
    onSuccess: () =>
      setPostActions((prev) => ({
        ...prev,
        repost: {
          ...prev.repost,
          checked: !prev.repost.checked,
          count: prev.repost.checked
            ? prev.repost.count - 1
            : prev.repost.count + 1,
        },
      })),
  })
  const toggleBookmarkResult = useMutation({
    mutationFn: async () => await toggleBookmark(data._id),
    onSuccess: () =>
      setPostActions((prev) => ({
        ...prev,
        bookmark: {
          ...prev.bookmark,
          checked: !prev.bookmark.checked,
          count: prev.bookmark.checked
            ? prev.bookmark.count - 1
            : prev.bookmark.count + 1,
        },
      })),
  })

  const [postActions, setPostActions] = useState({
    repost: {
      icon: Repeat2,
      count: data.totalShares,
      checked: data.isShared,
      onClick: () => toggleRepostResult.mutate(),
    },
    like: {
      icon: Heart,
      count: data.totalLikes,
      checked: data.isLiked,
      onClick: () => toggleLikeResult.mutate(),
    },
    bookmark: {
      icon: Bookmark,
      count: data.totalBookmarks,
      checked: data.isBookmarked,
      onClick: () => toggleBookmarkResult.mutate(),
    },
  })

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
                src={data.author.avatar || IMAGE_NOTFOUND.avatar_notfound}
                alt="avatar"
                className="img"
              />
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-primary">{data.author.name}</h4>
              <p className="text-xs">
                {new Date(data.createdAt).toLocaleString()}
              </p>
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
        {data?.fileUrl && (
          <div className="rounded-lg overflow-hidden">
            <img src={data.fileUrl} alt="img" className="img" />
          </div>
        )}
        {data.totalViews > 0 && (
          <div className="text-sm font-medium">{data.totalViews} views</div>
        )}
        {/* action */}
        <div
          className={clsx([
            `flex justify-between items-center border-t border-gray-200 p-2`,
            showComment && `border-b`,
          ])}
        >
          {/* btn comment */}
          <button
            onClick={() => setShowComment(!showComment)}
            className={clsx([
              `flex items-center gap-1 transition-colors duration-150`,
            ])}
          >
            <MessageCircle size={18} />
            {data.totalComments && (
              <span className="text-xs">{data.totalComments}</span>
            )}
          </button>
          {/* btn postActions */}
          {Object.values(postActions).map(
            ({ icon: Icon, count, checked, onClick }, i) => (
              <button
                key={i}
                onClick={onClick}
                className={clsx([
                  `flex items-center gap-1 transition-colors duration-150`,
                  checked && `text-green-500`,
                ])}
              >
                <Icon size={18} />
                {count && <span className="text-xs">{count}</span>}
              </button>
            ),
          )}
          {/* btn share */}
          <button
            className={clsx([
              `flex items-center gap-1 transition-colors duration-150`,
            ])}
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
      {/* comment */}
      {showComment && <CommentContainer />}
    </article>
  )
}

export default memo(PostCard)
