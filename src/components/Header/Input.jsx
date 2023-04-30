import { useState } from 'react'
// Icons
import { RiSearchEyeLine } from 'react-icons/ri'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { shipFilter } from '../../redux/swapiSlice'

const Input = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const { filteredShips, ships } = useSelector((store) => store.swapi)

  const handleSubmit = (e) => {
    e.preventDefault()
    // inputta bir değer varsa submit işlemi gerçekleşecek
    if (inputValue) {
      dispatch(shipFilter(inputValue))
      setInputValue('')
    }
  }

  return (
    <div className="flex gap-3">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className=" flex justify-between items-center bg-white bg-opacity-20 px-2 py-1 rounded-md overflow-hidden"
      >
        <div>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            className="outline-none bg-white bg-opacity-0 text-white"
            type="text"
            value={inputValue}
          />
        </div>
        <button type="submit">
          <RiSearchEyeLine className="text-white hover:text-red-500" />
        </button>
      </form>
      <button
        onClick={() => dispatch(shipFilter(inputValue))} // tıklandığında boş input verisi filteredShips i güncelleyerek o ana kadar açılan tüm sonuçları listeleyecek
        hidden={filteredShips.length === ships.length} // inputta arama yapıldıysa show all butonu aktifleşecek, diğer durumda gizli olacak
        className=" text-white  bg-white bg-opacity-10 px-2 py-1 rounded-md hover:text-yellow-400"
      >
        Show All
      </button>
    </div>
  )
}
export default Input
