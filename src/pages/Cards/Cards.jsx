import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchShips } from '../../redux/swapiSlice'
import shipImage from '../../assets/images/Ship.png'
import { getDetail } from '../../redux/swapiSlice'
import { nanoid } from '@reduxjs/toolkit'

const Cards = () => {
  const dispatch = useDispatch()
  const [count, setCount] = useState(4) // Başlangıçta 4 sonuç gösterilecek
  const ships = useSelector((store) => store.swapi.ships)
  const isLoading = useSelector((store) => store.swapi.isLoading)

  const showMoreResults = () => {
    setCount(count + 3) // Daha fazla sonuç göstermek için sayaç 3 artırılır
  }

  useEffect(() => {
    dispatch(fetchShips())
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-10 mt-44">
        <img className="w-24 animate-bounce" src={shipImage} alt="" />
        <p className="text-white text-4xl font-mono animate-pulse">
          Loading...
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {ships.slice(0, count).map((ship) => {
        const newName = ship.name.replace(/\s+/g, '-')

        return (
          <div
            key={nanoid()}
            className="flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-0 bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 rounded-lg px-4 py-3"
          >
            <div className="flex flex-col lg:flex-row items-center gap-5">
              <div className="sm:w-56 lg:w-44 border-2 border-white border-opacity-10 rounded-md overflow-hidden">
                <img
                  className=""
                  src="https://www.denofgeek.com/wp-content/uploads/2019/12/x-wing.jpg?w=1024"
                  alt=""
                />
              </div>
              <div className="self-start">
                <p className="text-yellow-400 font-semibold text-lg mb-2">
                  {ship.name}
                </p>
                <div className="flex flex-col gap-1">
                  <div>
                    <p className="text-xs text-white text-opacity-30">Model</p>
                    <hr className="border-1 border-white border-opacity-10 mt-1" />
                    <p className="text-sm text-white text-opacity-50">
                      {ship?.model}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white text-opacity-30">
                      Hyperdrive Rating
                    </p>
                    <hr className="border-1 border-white border-opacity-10 mt-1" />
                    <p className="text-sm text-white text-opacity-50">
                      {ship?.hyperdrive_rating}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-center items-center">
              {/* Detay sayfasına yönlendiren link */}
              <NavLink
                onClick={() => dispatch(getDetail(ship.name))}
                to={newName}
                className="w-full text-center lg:w-auto xl:me-5 bg-yellow-400 bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 rounded-md px-3 py-1 text-white "
              >
                Detail
              </NavLink>
            </div>
          </div>
        )
      })}
      <button
        className="self-center text-white bg-white bg-opacity-10 hover:bg-opacity-20 hover:w-full rounded-lg hover:text-yellow-400 transition-all duration-300 w-32 py-2 mb-10"
        onClick={showMoreResults}
      >
        Show More
      </button>
    </div>
  )
}
export default Cards
