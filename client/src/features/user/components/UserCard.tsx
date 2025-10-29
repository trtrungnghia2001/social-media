import { Button } from '@/shared/components/ui/button'
import { memo } from 'react'

const UserCard = () => {
  return (
    <article className="px-4 py-3 flex items-center justify-between gap-4 hover:bg-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-10 aspect-square rounded-full overflow-hidden">
          <img
            src="https://pbs.twimg.com/media/Gchy_omWMAAqXzH?format=jpg&name=medium"
            alt="avatar"
            className="img"
          />
        </div>
        <div>
          <h4 className="font-medium text-primary">Ravelent</h4>
          <p>@ravelent</p>
        </div>
      </div>
      <Button size={'sm'} className="rounded-full">
        Follow
      </Button>
    </article>
  )
}

export default memo(UserCard)
