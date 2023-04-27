import { configureStore } from '@reduxjs/toolkit'
import swapiReducer from './swapiSlice'

export const store = configureStore({
  reducer: {
    swapi: swapiReducer,
  },
})
