import { NavLink } from 'react-router-dom'
// Redux
import { resetShips, setPageCount } from '../../redux/swapiSlice'
// Logos
import starwarsLogo from '../../assets/images/StarwarsLogo.png'

const Logo = () => {
  // detay sayfasından ana ekrana döndüğümüzde liste sıfırlanır ve birinci sayfadan veriler alınır.
  const resetShipList = () => {
    dispatch(setPageCount())
    dispatch(resetShips())
  }
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <NavLink
        onClick={() => resetShipList()}
        className="text-3xl text-yellow-400"
        to="/"
      >
        <img className="w-28" src={starwarsLogo} alt="StarwarsLogo.png" />
      </NavLink>

      <p className="text-white text-opacity-20 text-3xl font-mono font-semibold">
        Starships
      </p>
    </div>
  )
}
export default Logo
