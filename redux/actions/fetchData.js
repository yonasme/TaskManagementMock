import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";

export const fetchData = createAsyncThunk('data/fetchData', async (apiResponse, { rejectWithValue }) => {
    try {
        // Use the API response passed from the component
        console.log(apiResponse);
        return apiResponse.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

const MyComponent = () => {
    const axiosPrivate = useAxiosPrivate();
    const token = useSelector((state) => state.user.token)
    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const response = await axiosPrivate.get('/projects/get-projects?orderBy[field]=createdAt&orderBy[direction]=desc', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    }
                });
                console.log(response.data)
                // dispatch(fetchData(response)); // Pass the API response to the thunk
            } catch (error) {
                console.log(error);
            }
        };

        fetchDataFromApi();
    }, []);

    // Rest of the component code...
};

export default MyComponent