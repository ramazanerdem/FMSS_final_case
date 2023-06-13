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
    <section className="flex items-center gap-2 sm:gap-3">
      <NavLink
        onClick={() => resetShipList()}
        className="text-3xl text-yellow-400"
        to="/"
      >
        <img className="w-28" src={starwarsLogo} alt="StarwarsLogo.png" />
      </NavLink>

      <h1 className="text-white text-opacity-20 text-3xl font-mono font-semibold">
        Starships
      </h1>
    </section>
  )
}
export default Logo
