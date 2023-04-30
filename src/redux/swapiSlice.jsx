import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Swapi api çağrısını yaptığımız fonksiyon
export const fetchShips = createAsyncThunk(
  'starships/fetch',
  async (_, thunkAPI) => {
    try {
      const page = thunkAPI.getState().swapi.pageCount // pageCount state i alınarak ilgili değerdeki sayfa api sini çağırır.
      const response = await axios.get(
        `https://swapi.dev/api/starships/?page=${page}`
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
  {
    // önbellekleme ayarları
    // Burada, condition özelliğini ekleyerek, async thunk fonksiyonunun tekrar çağrılmasını engelliyoruz.
    condition: (_, { getState }) => {
      const { isLoading } = getState().swapi
      // verileri tekrar yükleme, yani isLoading false olduğunda çalışır
      return !isLoading
    },
  }
)

const initialState = {
  isLoading: false, // api çağrısının yüklenmesi sırasında ekranda göstermek istediğimiz veya istemediğimiz içerikleri yönettiğimiz state
  pageCount: 1, // api çağrısında hangi sayfayı alacağımızı belirleyen sayfa değerini tuttuğumuz state
  error: null, // api çağrısında karşılaşılacak muhtemel hataları yakaladığımız hata içeriklerini tuttuğumuz state
  shipName: '', // detay sayfasına gidilecek gemilerin url lerinin korunması ve eşleştirme yapılması için gemi isimlerinin tutulduğu state
  inputValue: '', // arama yapmak için inputa girdiğimiz değer
  ships: [], // apiden alınan gemi listesi
  filteredShips: [], // filtrelenerek ekrana yazdırılan son gemi listesi
  shipDetail: {}, // tıklanan gemi bilgilerini locale atmak için ilgili gemi bilgilerini tuttuğumuz state
}

export const swapiSlice = createSlice({
  name: 'swapi',
  initialState,
  reducers: {
    getDetail: (state, action) => {
      // tıklanan geminin name özelliğini alarak detay sayfasına aktarmak üzere ilgili gemi name özelliğini
      // filter methoduyla eşleştirir ve filteredShip değişkeninde tutar ve ardından shipDetail state inde tutar.
      const name = action.payload
      const filteredShip = state.ships.filter((ship) => ship.name === name)
      localStorage.setItem('shipDetail', JSON.stringify(filteredShip[0]))
      state.shipDetail = filteredShip[0]
      // tıklanan geminin detay sayfası için oluşturmak istediğimiz url yi App.jsx te tıklanan veriyle eşleştirmek için local e gönderiyoruz.
      const shipName = state.shipDetail.name.replace(/\s+/g, '-')
      localStorage.setItem('shipName', JSON.stringify(shipName))
      state.shipName = shipName
      // detay sayfasından geri döndüğümüzde inputValue değerinin var olması durumunda "daha fazla yükle" butonunun disable olmaması için inputValue state ini boş string değer atıyoruz.
      state.inputValue = ''
    },
    // inputa girin değerle, gemi listesinde istenen name ve model değerleri filtrelenerek, sonuç filteredShips state ine atanır.
    shipFilter: (state, action) => {
      const input = action.payload.toLowerCase()
      state.inputValue = input
      const filteredShips = state.ships.filter(
        (ship) =>
          ship.name.toLowerCase().includes(input) ||
          ship.model.toLowerCase().includes(input)
      )
      state.filteredShips = filteredShips
    },
    // ana ekrana tekrar dönülmesi durumlarında sonraki sayfaların yerine ilk sayfanın render edilmesi için pageCount state ine 1 değerini atadık.
    setPageCount(state) {
      state.pageCount = 1
    },
    // gerekli durumlarda, apiden aldığımız verileri temizlemek için kullandığımız action
    resetShips: (state) => {
      state.ships = []
    },
    // arama inputunu gerekli durumlarda sıfırlamak için kullandığımız action
    resetInput: (state) => {
      state.inputValue = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShips.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchShips.fulfilled, (state, action) => {
        state.isLoading = false
        // api çağrısı başarıyla tamamlanıp veri alındıktan sonra alınan veriler ships state ine her sayfa verisi alındığında eklenecek şekilde
        state.ships = [...state.ships, ...action.payload.results]
        state.filteredShips = state.ships

        // api çağrısı yapıldıktan ve girilen sayfa numarası güncellendikten sonra çağrı yapılan sayfa numarası
        // null olana kadar çağrı yapılan sayfa numarası alınıp pageCount state ine atanmaya devam eder.
        action.payload.next !== null
          ? (state.pageCount = action.payload.next.split('=')[1])
          : (state.pageCount = null)
      })
      .addCase(fetchShips.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { getDetail, shipFilter, setPageCount, resetShips, resetInput } =
  swapiSlice.actions
export default swapiSlice.reducer
