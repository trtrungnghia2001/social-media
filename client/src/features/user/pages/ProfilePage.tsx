import { Button } from '@/shared/components/ui/button'
import { IMAGE_NOTFOUND } from '@/shared/constants/image.constant'
import { CalendarDays } from 'lucide-react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { profile_nav_links } from '../constants'
import clsx from 'clsx'
import PostsPage from './PostsPage'

const ProfilePage = () => {
  return (
    <div>
      {/*  */}
      <section className="relative">
        <div className="h-[150px] w-full bg-gray-100">
          {<img src="" alt="bg" className="img" />}
        </div>
        <div className="absolute left-4 -translate-y-1/2 w-32 aspect-square rounded-full overflow-hidden border-4 border-white">
          <img
            src={IMAGE_NOTFOUND.avatar_notfound}
            alt="avatar"
            className="img"
          />
        </div>
        <Button
          size={'sm'}
          variant={'outline'}
          asChild
          className="absolute right-4 translate-y-1/2"
        >
          <Link to={`/`}>Profile setup</Link>
        </Button>
      </section>
      {/*  */}
      <section className="mt-16 p-4 space-y-4">
        <h3 className="text-xl font-medium text-primary">Trần Trung Nghĩa</h3>
        <p>Discord : Si-Chan#7282 - raikageart</p>
        <p className="flex items-center gap-2">
          <CalendarDays size={16} />
          Tham gia tháng 3 năm 2022
        </p>
        <div className="space-x-4">
          <Link to={`/`} className="hover:underline">
            0 Đang theo dõi
          </Link>
          <Link to={`/`} className="hover:underline">
            0 Người theo dõi
          </Link>
        </div>
      </section>
      {/*  */}
      <section className="space-y-4">
        <ul className="flex items-center overflow-x-auto">
          {profile_nav_links.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx([
                    `relative flex items-center gap-2 font-medium p-4 hover:bg-gray-100`,
                    isActive &&
                      `after:absolute after:bottom-0 after:left-0 after:right-0 after:rounded-full after:h-0.5 after:bg-blue-500`,
                  ])
                }
              >
                <item.icon size={16} />
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <Routes>
          <Route index element={<PostsPage />} />
        </Routes>
      </section>
    </div>
  )
}

export default ProfilePage
