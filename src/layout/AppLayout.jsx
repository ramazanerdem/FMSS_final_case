import { Outlet } from 'react-router-dom'

// Components
import Header from '../components/Header'

// AppLayout, Header komponenti sabit olacak şekilde sadece Outlet altındaki sayfaları değiştirir.
function AppLayout() {
  return (
    <div className="border-x-0 sm:border-x-2 border-white border-opacity-20 px-8 min-h-screen mx-auto sm:w-1/2">
      <Header />
      <hr className="relative border-1 border-white border-opacity-30 mb-6 sm:mb-10" />
      <Outlet />
    </div>
  )
}

export default AppLayout
