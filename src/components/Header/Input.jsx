import { useState } from 'react'
import { RiSearchEyeLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { shipFilter } from '../../redux/swapiSlice'

const Input = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(shipFilter(inputValue))
    setInputValue('')
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex justify-between items-center bg-white bg-opacity-20 px-2 py-1 rounded-md overflow-hidden"
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
        <RiSearchEyeLine className="text-white" />
      </button>
    </form>
  )
}
export default Input
