import { memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home-page'
import SearchPage from '../pages/search-page'
import NotFoundPage from '../pages/notfound-page'
//
import AuthRouter from '@/features/auth'
import UploadRouter from '@/features/upload'
import AuthProtectedRoute from './AuthProtectedRoute'
import Layout from '@/shared/components/layout/Layout'
import ProfilePage from '@/features/user/pages/ProfilePage'

const MainRouter = () => {
  return (
    <Routes>
      {/* public */}
      {/* auth */}
      <Route path="auth/*" element={<AuthRouter />} />
      {/* upload */}
      <Route path="upload/*" element={<UploadRouter />} />
      {/* chat */}
      {/* comment */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="explore" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<AuthProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default memo(MainRouter)
