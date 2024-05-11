import { createAsyncThunk } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";


export const getProjects = createAsyncThunk(
    "getProjects",
    async (params, { getState }) => {
        const { token } = getState().user;
        console.log("executing projects Action")

        try {
            const { data } = await axios.get("/projects/get-projects",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    }
                }
            )
            //  console.log(data)
            return data
        } catch (error) {
            console.log(error)

        }

    }
)