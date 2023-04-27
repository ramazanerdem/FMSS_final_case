import { NavLink } from 'react-router-dom'
import swLogo from '../../assets/images/StarwarsLogo.png'

const Logo = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <NavLink className="text-3xl text-yellow-400" to="/">
        <img className="w-28" src={swLogo} alt="" />
      </NavLink>

      <p className="text-white text-opacity-20 text-3xl font-mono font-semibold">
        Starships
      </p>
    </div>
  )
}
export default Logo
