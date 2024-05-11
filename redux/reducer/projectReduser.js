import { createSlice } from '@reduxjs/toolkit'
import { getProjects } from '../actions/projectAction'

const initialState = {
    projects: [],
    archivedprojects: [],
}

export const projectReducer = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload
        },
        setArchivedProjects: (state, action) => {
            state.archivedprojects = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getProjects.fulfilled, (state, action) => {
            state.projects = action.payload
        })
    }
})

// Action creators are generated for each case reducer function
export const { setProjects, setArchivedProjects } = projectReducer.actions
export default projectReducer.reducer