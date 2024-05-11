import { useDispatch, useSelector } from "react-redux"
import axios from "../api/axios"

const useRefreshToken = () => {
    const refresh_token = useSelector((state) => state.user.refresh_token)

    const refresh = async () => {
        try {
            const response = await axios.post('/auth/refresh', null, {
                headers: {
                    'x-refresh-token': `${refresh_token}`
                }
            })
            console.log("new token", response.data.accessToken)
            return response.data.accessToken
        } catch (error) {
            console.log(error.response.data);
        }

    }
    return refresh
}

export default useRefreshToken