import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../redux/actions/projectAction'
import { getTasks } from '../redux/actions/taskAction'
import { getUsers } from '../redux/actions/usersAction'

const index = () => {
    const { token, isSignedIn } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSignedIn) {
            dispatch(getProjects());
            dispatch(getTasks());
            dispatch(getUsers());
        }
    }, [])

    return (
        <View className="bg-primary items-center justify-center flex-1 h-full w-full" >
            {/* <ActivityIndicator size={"large"} /> */}
        </View>
    )
}

export default index