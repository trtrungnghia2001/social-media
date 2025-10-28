import {
  Home,
  Hash,
  Bell,
  MessageCircle,
  User,
  Bookmark,
  Settings,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

export const nav_links = [
  {
    title: 'Home',
    path: '/',
    icon: Home,
  },
  {
    title: 'Explore',
    path: '/explore',
    icon: Hash,
  },
  {
    title: 'Notifications',
    path: '/notifications',
    icon: Bell,
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: MessageCircle,
  },
  {
    title: 'Bookmarks',
    path: '/bookmarks',
    icon: Bookmark,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: User,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: Settings,
  },
]

const NavLeft = () => {
  const { pathname } = useLocation()

  return (
    <nav className="flex flex-col gap-2 min-w-64 p-4 h-screen overflow-y-auto">
      {nav_links.map(({ title, path, icon: Icon }) => {
        const isActive = pathname === path
        return (
          <motion.div key={title} className="group">
            <Link
              to={path}
              className={`flex items-center gap-4 rounded-lg px-4 py-2 transition
                ${isActive ? 'bg-primary/10 text-black' : 'hover:bg-accent'}`}
            >
              <Icon size={18} />
              <span className="font-medium">{title}</span>
            </Link>
          </motion.div>
        )
      })}
    </nav>
  )
}

export default NavLeft
