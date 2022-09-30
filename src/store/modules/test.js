import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNews } from "@/service/servers";

const initialState= {
  listInfo: {
    items: [],
    status: 'idle',
    page: 1,
    hasMore: true
  },
  userInfo: null
}

const apiUserInfo= userId => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve && resolve({userId, name: 'bruce', age: 18})
    }, 3000)
  }) 
}

export const getHomeList= createAsyncThunk('test/fetchHomeList', async (params, thunk) => {
  let result= await getNews(params)
  console.log('result-->', result)
  return result?.data?.data|| []
})

export const getUserInfo= createAsyncThunk('test/fetchUserInfo', async(userId, thunk) => {
  let data= await apiUserInfo(userId)
  return data
})

const counterSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
   
  },
  extraReducers: builder => {
    builder
      .addCase(getHomeList.pending, (state, action) => {
        state.listInfo.status= 'pending'
      })
      .addCase(getHomeList.fulfilled, (state, action) => {
        let page= state.listInfo.page, hasMore= true
        if (page > 5) hasMore= false
        let newPage= hasMore ? page + 1 : page
        state.listInfo= {
          items: [...state.listInfo.items, ...action.payload],
          status: 'succeeded',
          page: newPage,
          hasMore
        }
      })
      .addCase(getHomeList.rejected, (state, action) => {
        state.listInfo.status= 'failed'
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo= action.payload
      })
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer

