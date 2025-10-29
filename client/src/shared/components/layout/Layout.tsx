import NavLeft from './NavLeft'
import { Outlet } from 'react-router-dom'
import NavRight from './NavRight'

const Layout = () => {
  return (
    <div className="flex items-start max-w-screen-xl mx-auto overflow-hidden">
      <NavLeft />
      <main className="flex-1 flex items-stretch justify-between overflow-x-hidden w-[990px]">
        <div className="max-w-[600px] border-x">
          <Outlet />
        </div>

        <NavRight />
      </main>
    </div>
  )
}

export default Layout
