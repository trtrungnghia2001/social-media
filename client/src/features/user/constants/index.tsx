import {
  MessageSquareText,
  Image,
  Heart,
  Pin,
  FileText,
  Bookmark,
  Star,
} from 'lucide-react'

export const profile_nav_links = [
  {
    title: 'Posts',
    key: 'posts',
    icon: MessageSquareText,
    path: '',
  },
  {
    title: 'Replies',
    key: 'replies',
    icon: Star,
    path: '/profile/replies',
  },
  {
    title: 'Article',
    key: 'article',
    icon: FileText,
    path: 'article',
  },
  {
    title: 'Highlights',
    key: 'highlights',
    icon: Pin,
    path: 'highlights',
  },
  {
    title: 'Media',
    key: 'media',
    icon: Image,
    path: 'media',
  },
  {
    title: 'Likes',
    key: 'likes',
    icon: Heart,
    path: 'likes',
  },
  {
    title: 'Bookmarks',
    key: 'bookmarks',
    icon: Bookmark,
    path: 'bookmarks',
  },
]
