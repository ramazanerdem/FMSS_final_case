import { Outlet } from 'react-router-dom'

// Component
import Header from '../components/Header'

function AppLayout() {
  return (
    <div className="border-x-2 border-white border-opacity-20 px-8 min-h-screen mx-auto sm:w-1/2">
      <Header />
      <hr className="relative border-1 border-white border-opacity-30 mb-6 sm:mb-10" />
      <Outlet />
    </div>
  )
}

export default AppLayout
