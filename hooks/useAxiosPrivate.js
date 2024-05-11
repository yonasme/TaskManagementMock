import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/reducer/userReduser";


const useAxiosPrivate = () => {

    const token = useSelector((state) => state.user.token)
    const refresh = useRefreshToken();
    const dispatch = useDispatch();

    useEffect(() => {
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && error?.response?.data.message === "jwt expired" && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    dispatch(setToken(newAccessToken));
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }

                return Promise.reject(error);
            }
        )

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${token} `;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.response.eject(requestIntercept);
        }
    }, [token, refresh])


    return axiosPrivate;
}

export default useAxiosPrivate