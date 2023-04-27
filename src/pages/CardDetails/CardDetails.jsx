import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { BsFillCaretLeftSquareFill } from 'react-icons/bs'

const CardDetails = () => {
  let shipDetail
  if (localStorage.getItem('shipDetail')) {
    shipDetail = JSON.parse(localStorage.getItem('shipDetail'))
  }

  return (
    <div className=" flex flex-col items-center gap-5 pb-16 md:pb-0">
      <NavLink
        className="static sm:absolute sm:top-10 sm:left-10 text-3xl text-yellow-400 sm:hover:scale-150 transition-all duration-500"
        to="/"
      >
        <BsFillCaretLeftSquareFill />
      </NavLink>
      <div className="rounded-md overflow-hidden border-2 border-white border-opacity-30 shadow-xl shadow-gray-900 lg:w-96">
        <img
          className="hover:scale-105 transition-all duration-1000"
          src="https://www.denofgeek.com/wp-content/uploads/2019/12/x-wing.jpg?w=1024"
          alt=""
        />
      </div>

      <p className="text-yellow-400 text-3xl mt-6">{shipDetail?.name}</p>
      <hr className="border-1 border-white border-opacity-20 w-1/2 mt-1" />

      <div className="w-10/12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div className="flex flex-col gap-5">
            <div className="group flex flex-col">
              <div>
                <p className="text-sm text-white group-hover:text-yellow-500 transition-color duration-300 text-opacity-30">
                  Model
                </p>
                <hr className="border-1 border-white border-opacity-30 my-1" />
              </div>
              <p className="text-md text-white text-opacity-50">
                {shipDetail?.model}
              </p>
            </div>
            <div className="group flex flex-col">
              <div>
                <p className="text-sm text-white group-hover:text-yellow-500 transition-color duration-300 text-opacity-30">
                  Passengers
                </p>
                <hr className="border-1 border-white border-opacity-30 my-1" />
              </div>
              <p className="text-md text-white text-opacity-50">
                {shipDetail?.passengers}
              </p>
            </div>
            <div className="group flex flex-col">
              <div>
                <p className="text-sm text-white group-hover:text-yellow-500 transition-color duration-300 text-opacity-30">
                  Max Atmosphering Speed
                </p>
                <hr className="border-1 border-white border-opacity-30 my-1" />
              </div>
              <p className="text-md text-white text-opacity-50">
                {shipDetail?.max_atmosphering_speed}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="group flex flex-col">
              <div>
                <p className="text-sm text-white group-hover:text-yellow-500 transition-color duration-300 text-opacity-30">
                  Manufacturer
                </p>
                <hr className="border-1 border-white border-opacity-30 my-1" />
              </div>
              <p className="text-md text-white text-opacity-50">
                {shipDetail?.manufacturer}
              </p>
            </div>
            <div className="group flex flex-col">
              <div>
                <p className="text-sm text-white group-hover:text-yellow-500 transition-color duration-300 text-opacity-30">
                  Crew
                </p>
                <hr className="border-1 border-white border-opacity-30 my-1" />
              </div>
              <p className="text-md text-white text-opacity-50">
                {shipDetail?.crew}
              </p>
            </div>
            <div className="group flex flex-col">
              <div>
                <p className="text-sm text-white group-hover:text-yellow-500 transition-color duration-300 text-opacity-30">
                  Cargo Capacity
                </p>
                <hr className="border-1 border-white border-opacity-30 my-1" />
              </div>
              <p className="text-md text-white text-opacity-50">
                {shipDetail?.cargo_capacity}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CardDetails
