import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const alreadySeenSlice = createSlice({
  name: 'alreadySeen',
  initialState,
  reducers: {
    alreadySeenAdded(state, action) {      
      const { id, title } = action.payload
      if(!state.find(movie => movie.id === id)){
        state.push({
          id,
          title,
          rating: 0,
        })
      }
      
    },
    alreadySeenRatingAdded(state, action) {
      const { id, rating } = action.payload;
      return state.map(item => (item.id === id ? { ...item, rating: rating } : item));
    },
    alreadySeenDeleted(state, action) {
      return state.filter(item => item.id !== action.payload);
    }
  }
})

export const { alreadySeenAdded, alreadySeenRatingAdded, alreadySeenDeleted } = alreadySeenSlice.actions

export default alreadySeenSlice.reducer