import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    name?: string
    isLoggedIn: boolean
    isGuest: boolean
}

const initialState: UserState = {
    isLoggedIn: false,
    isGuest: true,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ name: string }>) => {
            state.name = action.payload.name
            state.isLoggedIn = true
            state.isGuest = false
        },
        logout: state => {
            state.name = undefined
            state.isLoggedIn = false
            state.isGuest = true
        },
    },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
