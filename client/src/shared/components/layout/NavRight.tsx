import UserCard from '@/features/user/components/UserCard'
import { Link } from 'react-router-dom'
export const footer_links = [
  { title: 'Terms of Service', path: '/terms' },
  { title: 'Privacy Policy', path: '/privacy' },
  { title: 'Cookie Policy', path: '/cookies' },
  { title: 'Accessibility', path: '/accessibility' },
  { title: 'Ads Info', path: '/ads-info' },
]

const NavRight = () => {
  return (
    <aside className="w-[350px] p-4 space-y-4">
      <input
        type="text"
        placeholder="Search..."
        className="border w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <section className="border rounded-xl">
        <h3 className="px-4 py-3 text-xl font-medium text-primary">
          You may also like
        </h3>
        <ul>
          {Array.from({ length: 4 }).map((_, idx) => (
            <li key={idx}>
              <UserCard />
            </li>
          ))}
        </ul>
      </section>
      {/* <section className="border rounded-xl">
        <h3 className="px-4 py-3 text-xl font-medium text-primary">
          What's Happening
        </h3>
        <ul>
          {Array.from({ length: 4 }).map((_, idx) => (
            <li key={idx}>
              <UserCard />
            </li>
          ))}
        </ul>
      </section> */}
      <footer className="p-4 flex flex-wrap gap-x-4 gap-y-2">
        {footer_links.map((link, idx) => (
          <Link key={idx} to={link.path} className="text-xs hover:underline">
            {link.title}
          </Link>
        ))}
      </footer>
    </aside>
  )
}

export default NavRight
