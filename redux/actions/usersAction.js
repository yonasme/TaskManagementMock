import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "../../api/axios";



export const getUsers = createAsyncThunk(
    "getUsers",
    async (params, { getState }) => {
        const { token } = getState().user;
        try {
            console.log("executing user Action");

            let url = "/users/get-users";

            if (params && params.userId) {
                url = `/users/get-user/${params.userId}`;
            }

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