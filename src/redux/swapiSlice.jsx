import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchShips = createAsyncThunk(
  'swapi/fetchShips',
  async (_, thunkAPI) => {
    // try {
    //   const res = await axios('https://swapi.dev/api/starships')
    //   return res.data.results
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(
    //     'API kaynağı yanlış bir adresten alınmış olabilir.'
    //   )
    // }

    // While döngüsü kullanılarak tüm starship ler çağırılır ve her çağrının ardından, daha önce oluşturduğumuz
    // "allShips" adlı diziye bu çağrıdan gelen sonuçlar "push" methoduyla eklenir.
    // Döngü, "next" özelliği null olana kadar devam eder.
    try {
      const allShips = []
      let response = await axios.get('https://swapi.dev/api/starships/')
      while (response.data.next !== null) {
        allShips.push(...response.data.results)
        response = await axios.get(response.data.next)
      }
      allShips.push(...response.data.results)
      return allShips
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'API kaynağı yanlış bir adresten alınmış olabilir.'
      )
    }
  }
)

const initialState = {
  value: null,
  isLoading: false,
  ships: [],
  shipName: '',
  shipDetail: {},
}

export const swapiSlice = createSlice({
  name: 'swapi',
  initialState,
  reducers: {
    getDetail: (state, action) => {
      const name = action.payload
      const filteredShip = state.ships.filter((ship) => ship.name === name)
      localStorage.setItem('shipDetail', JSON.stringify(filteredShip[0]))
      state.shipDetail = filteredShip[0]
      const shipName = state.shipDetail.name.replace(/\s+/g, '-')
      localStorage.setItem('shipName', JSON.stringify(shipName))
      state.shipName = shipName
    },
    shipFilter: (state, action) => {
      const input = action.payload.toLowerCase()
      const filteredShips = state.ships.filter(
        (ship) =>
          ship.name.toLowerCase().includes(input) ||
          ship.model.toLowerCase().includes(input)
      )
      console.log(filteredShips)
      state.ships = filteredShips
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShips.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchShips.fulfilled, (state, actions) => {
      state.isLoading = false
      state.ships = actions.payload
      // console.log(state.ships)
    })
    builder.addCase(fetchShips.rejected, (state, action) => {
      state.isLoading = false
      console.log(action.payload)
    })
  },
})

export const { getDetail, shipFilter } = swapiSlice.actions
export default swapiSlice.reducer
