import { useLocation } from 'react-router-dom'
// Redux
import { useSelector } from 'react-redux'
// Components
import Input from './Input'
import Logo from './Logo'

const Header = () => {
  // url kısmında ki gemi bilgisini karşılaştırılmak üzere local de saklanan gemi adını çeker.
  let shipNameLocale
  if (localStorage.getItem('shipName')) {
    shipNameLocale = JSON.parse(localStorage.getItem('shipName'))
  }
  const shipNameClicked = useSelector((store) => store.swapi.shipName)
  const location = useLocation()
  // "CardDetails" ve "NotFound" sayfalarında Input component'ını gizlemek için "shouldHideInput" ta boolean yapısı tutar.
  // location.pathname ile anlık bulunduğumuz sayfa url bilgisi alınır.
  const shouldHideInput =
    location.pathname.includes(shipNameLocale || shipNameClicked) ||
    location.pathname.includes('/404')

  return (
    <div className="flex flex-col xl:flex-row xl:px-5 2xl:px-10 gap-4 xl:gap-0 justify-between items-center py-5">
      <Logo />
      {/* Input component'ını gizlemek için shouldHideInput değişkenini kullan */}
      {!shouldHideInput && <Input />}
    </div>
  )
}
export default Header
