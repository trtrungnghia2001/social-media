import { IMAGE_NOTFOUND } from '@/shared/constants/image.constant'
import { memo } from 'react'

const CommentCard = () => {
  return (
    <div className="space-y-2 p-4 border-t">
      <div className="flex items-start gap-2">
        <div className="w-8 aspect-square overflow-hidden rounded-full">
          <img
            src={IMAGE_NOTFOUND.avatar_notfound}
            alt="avatar"
            className="img"
          />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-medium text-primary">Jay M. Dux</h4>
          <p className="text-xs">{new Date().toLocaleString()}</p>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: `Where can I find this kind of barista from @Raikage_Art?<br />
      I really like his background details a lot.`,
        }}
      ></div>
    </div>
  )
}

export default memo(CommentCard)
