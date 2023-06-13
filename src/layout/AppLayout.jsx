import { Outlet } from 'react-router-dom'

// Components
import Header from '../components/Header'

// AppLayout, Header komponenti sabit olacak şekilde sadece Outlet altındaki sayfaları değiştirir.
function AppLayout() {
  return (
    <div className="flex flex-col border-x-0 sm:border-x-2 border-white border-opacity-20 px-8 min-h-screen mx-auto sm:w-1/2">
      <Header />
      <main className="mt-32 sm:mt-16">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
