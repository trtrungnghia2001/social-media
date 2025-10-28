import NavLeft from './NavLeft'
import { Outlet } from 'react-router-dom'
import NavRight from './NavRight'

const Layout = () => {
  return (
    <div className="flex items-start max-w-screen-xl mx-auto">
      <NavLeft />
      <main className="flex-1 h-screen overflow-y-auto flex items-start gap-8">
        <div className="flex-1 overflow-x-hidden border-x">
          <Outlet />
        </div>
        <NavRight />
      </main>
    </div>
  )
}

export default Layout
