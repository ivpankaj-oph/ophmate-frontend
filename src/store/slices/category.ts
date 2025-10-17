import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

interface CategoryState {
  loading: boolean
  error: string | null
  categories: any[]
}

const initialState: CategoryState = {
  loading: false,
  error: null,
  categories: [],
}


const BASE_URL = process.env.NEXT_PUBLIC_API_URL
export const getAllCategories = createAsyncThunk(
  'categories/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/categories/get-category`, {})
      return res.data.data 
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch categories'
      )
    }
  }
)

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default categorySlice.reducer
