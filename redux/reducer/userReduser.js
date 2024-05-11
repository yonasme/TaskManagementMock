import { createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../actions/usersAction'

const initialState = {
    user: [],
    users: [],
    archivedusers: [],
    viewOnboarding: true,
    isSignedIn: false,
    isAdmin: false,
    token: null,
    refresh_token: null,
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setArchiveUser: (state, action) => {
            state.archivedusers = action.payload
        },
        setViewOnboarding: (state, action) => {
            state.viewOnboarding = action.payload
        },
        setIsSignedIn: (state, action) => {
            state.isSignedIn = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setRefreshToken: (state, action) => {
            state.refresh_token = action.payload
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
    }
})

// Action creators are generated for each case reducer function
export const { setUsers, setArchiveUser, setUser, setViewOnboarding, setIsSignedIn, setToken, setIsAdmin, setRefreshToken } = userReducer.actions
export default userReducer.reducer