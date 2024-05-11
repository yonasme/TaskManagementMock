import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "../../api/axios";



export const getTasks = createAsyncThunk(
    "getTasks",
    async (params, { getState }) => {
        const { token } = getState().user;
        try {
            console.log("executing task Action");

            let url = "/tasks/get-tasks";

            const { data } = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                }
            });

            return data;
        } catch (error) {
            console.log(error.response.data);
        }
    }
);