import { NavLink } from 'react-router-dom'
import stormtrooper from '../../assets/images/stormtrooper.svg'

function NotFound() {
  return (
    <div className="flex flex-col items-center gap-5 text-white text-opacity-30 text-center mt-28">
      <img className="w-60 animate-bounce" src={stormtrooper} alt="" />
      <h1 className="text-4xl font-mono text-">404</h1>
      <h1 className="text-4xl text-red-600">Not Found</h1>
      <p>
        The page you were looking for could not be found. Please enter a valid
        URL.
      </p>
      <NavLink className="text-3xl text-yellow-400" to="/">
        Back to Home Page
      </NavLink>
    </div>
  )
}

export default NotFound
