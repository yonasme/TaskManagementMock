import { createSlice } from '@reduxjs/toolkit'
import { getTasks } from '../actions/taskAction'

const initialState = {
    task: [],
    archivedtask: [],
}

export const taskReducer = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTask: (state, action) => {
            state.task = action.payload
        },
        setArcivedTask: (state, action) => {
            state.archivedtask = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.task = action.payload
        })
    }

})

// Action creators are generated for each case reducer function
export const { setTask, setArcivedTask } = taskReducer.actions
export default taskReducer.reducer