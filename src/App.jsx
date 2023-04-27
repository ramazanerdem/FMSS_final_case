import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

// layout
import AppLayout from './layout/AppLayout'

// pages
import Cards from './pages/Cards/Cards'
import CardDetails from './pages/CardDetails/CardDetails'
import NotFound from './pages/NotFound/NotFound'

function App() {
  const shipNameClicked = useSelector((store) => store.swapi.shipName)
  let shipName
  let shipNameLocale

  // tıklanan gemi adı eğer local deki ile aynıysa tıklanan veriyi alır.
  // ancak sayfa render olduğunda tıklanan veri kaybolacağı için veriyi local den alır.
  if (localStorage.getItem('shipName')) {
    shipNameLocale = JSON.parse(localStorage.getItem('shipName'))
    shipNameClicked === shipNameLocale
      ? (shipName = shipNameClicked)
      : (shipName = shipNameLocale)
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Cards />} />
        <Route path={shipName} element={<CardDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
