import { useLocation } from 'react-router-dom'
import Input from './Input'
import Logo from './Logo'
import { useSelector } from 'react-redux'

const Header = () => {
  let shipNameLocale
  if (localStorage.getItem('shipName')) {
    shipNameLocale = JSON.parse(localStorage.getItem('shipName'))
  }

  const shipNameClicked = useSelector((store) => store.swapi.shipName)

  const location = useLocation()

  // "CardDetails" ve "NotFound" sayfalarında Input component'ını gizle
  const shouldHideInput =
    location.pathname.includes(shipNameLocale || shipNameClicked) ||
    location.pathname.includes('/404')

  return (
    <div className="flex flex-col xl:flex-row xl:px-5 2xl:px-10 gap-4 xl:gap-0 justify-between items-center py-5">
      <Logo />
      {/* <Input /> */}
      {/* Input component'ını gizlemek için shouldHideInput değişkenini kullan */}
      {!shouldHideInput && <Input />}
    </div>
  )
}
export default Header
