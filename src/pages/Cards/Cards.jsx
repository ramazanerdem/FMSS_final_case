import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import shipImage from '../../assets/images/ship.png'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import {
  fetchShips,
  getDetail,
  resetShips,
  setPageCount,
} from '../../redux/swapiSlice'
// Ships Images
import images from '../../assets/image.json'

const Cards = () => {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()
  const { filteredShips, isLoading, pageCount, error, inputValue } =
    useSelector((store) => store.swapi)

  // "/src/assets/images/ship.png" olarak gelen ifadenin "/" kısımları split edilerek yeni dizi oluşturulur son veri olan ship.png değeri alınır.
  const shipImageUrl = shipImage.split('/').pop()

  // "action.payload.next" url den gelen sayfa sayısının "null" döndürmediği sürece
  // fetchShips fonksiyonuyla api ye çağrı göndermeye devam edeceğini ifade eder.
  // bunu gerçekleştirirken sayfa sayısını 1 arttırır.
  const handleLoadMore = () => {
    if (pageCount !== null) {
      dispatch(fetchShips(pageCount + 1))
    }
  }

  // Sayfa ilk render olduğunda pageCount değerini ilgili state göndererek ilgili api sayfasının çağrısı yapılır.
  // Sonrasında ise bu çağrının yapıldığını teyit etmek için çağrı tamamlanma olayı loaded state inde tutulur.
  useEffect(() => {
    dispatch(fetchShips(pageCount)).then(() => {
      setLoaded(true)
    })
  }, [])

  // tıklanan gemi name özelliğini detay sayfasına göndermek için getDetail fonksiyonuna action olarak gönderir.
  // aynı zamanda detay sayfasına gittiğimizde tarayıcının geri tuşuyla ana ekrana döndüğümüzde useEffect hookunun
  // yeniden tetiklenmesi sebebiyle sonraki sayfa sonuçlarının tekrar yazılmaması için ships state ine boş array gönderdik.
  const setShips = (name) => {
    dispatch(getDetail(name))
    dispatch(setPageCount())
    dispatch(resetShips())
  }

  return (
    <section className="flex flex-col gap-4 mt-0 sm:mt-16 lg:mt-0 pb-10">
      {filteredShips.map((ship) => {
        // her yıldız gemisinin route sayfasının url kısmına name verilerinin düzgün karakterler ile geçirilmesi için boşluk kısımları tire (-) ile değiştirilmiştir
        const newName = ship.name.replace(/\s+/g, '-')
        const matchingImage = images.filter((image) => {
          // images.json daki name değerleri, her gemi name değeri ile eşleştirilerek ilgili gemi kartında return edilir.
          if (image.name === ship.name) {
            return image.img
          }
        })[0]

        return (
          <div
            key={nanoid()}
            className="flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-0 bg-white bg-opacity-5 hover:bg-opacity-10 transition-all duration-300 rounded-lg px-4 py-3"
          >
            <div className="flex flex-col lg:flex-row items-center gap-5">
              <div className="flex-none flex justify-center items-center w-60 h-36 sm:w-56 lg:w-44 sm:h-36 lg:h-28 border-2 border-white border-opacity-10 rounded-md overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={matchingImage.img}
                  alt={matchingImage.name}
                />
              </div>
              <div className="shrink self-start">
                <h2 className="text-yellow-400 font-semibold text-lg mb-2">
                  {ship.name}
                </h2>
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
                onClick={() => setShips(ship.name)}
                disabled={isLoading}
                to={newName}
                className="w-full text-center lg:w-auto xl:me-5 bg-yellow-400 bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 rounded-md px-3 py-1 text-white "
              >
                Detail
              </NavLink>
            </div>
          </div>
        )
      })}

      {isLoading && ( // sayfa yüklenirken ekranda yalnızca loading ifadesinin olmasını sağlayan kod bloğu
        <div className="flex flex-col items-center gap-10 mt-44">
          <img
            className="w-24 animate-bounce"
            src={shipImage}
            alt={shipImageUrl}
          />
          <p className="text-white text-4xl font-mono animate-pulse">
            Loading...
          </p>
        </div>
      )}

      {
        // sayfa yüklendiğinde - hata oluşmadığında - sonrasında açılacak sayfa olduğu sürece yani null olmadığında - ilk veriler yüklendikten sonra -> daha fazla yükle butonu aktif olur.
        !isLoading && !error && pageCount !== null && (
          <button
            className={`self-center text-white bg-white bg-opacity-10 hover:bg-opacity-20 hover:w-full rounded-lg hover:text-red-600 ${
              inputValue && 'cursor-not-allowed'
            } transition-all duration-300 w-32 py-2 mb-10`}
            onClick={handleLoadMore} // tıklandığında sonraki sayfa verilerini çağıracak fonksiyonu tetikleyen onclick işlevi
            disabled={inputValue} // inputa bir değer girilip bir gemi ararken daha fazla yükle butonunun disabled durumunda olmasını sağlar
          >
            Show More
          </button>
        )
      }
    </section>
  )
}
export default Cards
