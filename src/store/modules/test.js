import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState= {
  listInfo: {
    items: [],
    status: 'idle'
  },
  userInfo: null
}

const apiHomeList= (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve && resolve([id, 1, 2, 3])
    }, 3000)
  })
}

const apiUserInfo= userId => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve && resolve({userId, name: 'bruce', age: 18})
    }, 3000)
  }) 
}

export const getHomeList= createAsyncThunk('test/fetchHomeList', async (id, thunk) => {
  let data= await apiHomeList(id)
  return data
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
        state.listInfo= {
          items: action.payload,
          status: 'succeeded'
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

