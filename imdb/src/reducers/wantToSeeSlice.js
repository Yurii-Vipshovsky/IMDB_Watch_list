import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const wantToSeeSlice = createSlice({
  name: 'wantToSee',
  initialState,
  reducers: {
    wantToSeeAdded(state, action) {
      const { id, title } = action.payload
      if(!state.find(movie => movie.id === id)){
        state.push({
          id,
          title
        })
      } 
    },
    wantToSeeDeleted(state, action) {
      return state.filter(item => item.id !== action.payload);
    }
  }
})

export const { wantToSeeAdded, wantToSeeDeleted } = wantToSeeSlice.actions

export default wantToSeeSlice.reducer