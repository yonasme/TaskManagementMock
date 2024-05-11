import { View, Text, Button, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../redux/reducer/counterReducer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getProjects } from '../../redux/actions/projectAction'
import MyComponent, { fetchData } from '../../redux/actions/fetchData'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { setArchivedProjects, setProjects } from '../../redux/reducer/projectReduser'
import { setArchiveUser, setUsers } from '../../redux/reducer/userReduser'
import { setArcivedTask, setTask } from '../../redux/reducer/taskReduser'
import { Link } from 'expo-router'
import { icons } from '../../constants'

const Home = () => {

    const projects = useSelector((state) => state.project.projects)
    const archivedprojects = useSelector((state) => state.project.archivedprojects)
    const [isLoading, setIsLoading] = useState(true)
    const axiosPrivate = useAxiosPrivate();
    const task = useSelector((state) => state.task.task)
    const archivedtask = useSelector((state) => state.task.archivedtask)
    const user = useSelector((state) => state.user.user)
    const users = useSelector((state) => state.user.users)
    const archivedusers = useSelector((state) => state.user.archivedusers)
    const token = useSelector((state) => state.user.token)
    const dispatch = useDispatch()
    //console.log("projects", projects)
    console.log("user", user)
    //console.log("users", users)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            await getProjects()
            await getTasks()
            await getUsers()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const getUsers = async () => {
        try {

            let url = "/users/get-users?orderBy[field]=createdAt&orderBy[direction]=desc";

            const response = await axiosPrivate.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                }
            });
            //console.log("users ", response.data)
            dispatch(setUsers(response.data))

            let url2 = "/users/get-archived-users?orderBy[field]=createdAt&orderBy[direction]=desc"
            const response2 = await axiosPrivate.get(url2, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                }
            });
            // console.log("archived user", response2.data)
            dispatch(setArchiveUser(response2.data))
        } catch (error) {
            console.log(error.response.data);
        } finally {

        }
    }

    const getProjects = async () => {
        try {
            let url = "/projects/get-projects?orderBy[field]=createdAt&orderBy[direction]=desc"

            const response = await axiosPrivate.get(url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    }
                }
            )
            // console.log("projects ", response.data)
            dispatch(setProjects(response.data))

            let url2 = "/projects/get-archived-projects?orderBy[field]=createdAt&orderBy[direction]=desc"
            const response2 = await axiosPrivate.get(url2,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    }
                }
            )
            // console.log("archived projects ", response2.data)
            dispatch(setArchivedProjects(response2.data))
        } catch (error) {
            console.log(error)

        } finally {

        }

    }

    const getTasks = async () => {
        try {
            let url = "/tasks/get-tasks?orderBy[field]=createdAt&orderBy[direction]=desc"

            const response = await axiosPrivate.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                }
            });
            // console.log("task", response.data)
            dispatch(setTask(response.data))

            let url2 = "/tasks/get-archived-tasks?orderBy[field]=createdAt&orderBy[direction]=desc"
            const response2 = await axiosPrivate.get(url2, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                }
            });
            //console.log("archived task", response.data)
            dispatch(setArcivedTask(response2.data))
        } catch (error) {
            console.log(error);
        }
    }

    const renderProjectItem = ({ item }) => (

        // <Link href={{
        //     pathname: "/projects/projectdetails", params: {
        //         id: item.id,
        //         title: item.title,
        //         description: item.description,
        //         isActive: item.isActive,
        //         archived: "false"

        //     }
        // }} asChild>

        <TouchableOpacity activeOpacity={0.7}>

            <View className="bg-black-200 border-orange-100 border-1 rounded-lg h-20 mx-4 p-3 mt-3">

                <View className="justify-center items-center ">
                    <Text className="text-green-100 font-pbold">  {item.title} </Text>
                    <Text className="text-green-100 font-pthin"> {item.isActive ? "Active " : "InActive"} </Text>
                    {/* <View className="flex-1"> */}
                    <Text className="text-green-100 font-pthin"> {item.description} </Text>
                    {/* </View> */}
                    <Text className="text-green-100 font-pthin"> {item.archiveReason === null ? "" : "Archived"} </Text>
                </View>

            </View>
        </TouchableOpacity>
        // </Link>
    );

    return (
        <SafeAreaView className="bg-primary  h-full w-full">
            {isLoading ? (
                <View className="flex-1 h-full items-center justify-center">
                    <View className="bg-gray-100 w-40 rounded-lg h-20 items-center justify-center">
                        <ActivityIndicator size="large" color={"#13193d"} />
                        <Text>Loading</Text>
                    </View>

                </View>
            ) : (
                <ScrollView >
                    <View className='flex-1 px-2 pt-5'>
                        <Text className="text-orange-100 font-pbold text-xl">Welcome,  {user.name} </Text>
                        <View className="h-36 p-2 space-x-2 bg-black-100 rounded-lg mt-4">
                            <Text className="text-gray-100 font-pbold text-xl">Total</Text>
                            <View className="flex-row space-x-4 mt-2">
                                <View className="items-center bg-gray-700  rounded-lg p-2">
                                    <Text className="text-gray-100 font-pbold text-xl">Projects</Text>
                                    <Text className="text-gray-100 font-pbold text-xl">{projects.count}</Text>

                                </View>
                                <View className="items-center bg-gray-700  rounded-lg p-2">
                                    <Text className="text-gray-100 font-pbold text-xl">Tasks</Text>
                                    <Text className="text-gray-100 font-pbold text-xl">{task.count}</Text>
                                </View>
                                <View className="items-center bg-gray-700  rounded-lg p-2">
                                    <Text className="text-gray-100 font-pbold text-xl">Users</Text>
                                    <Text className="text-gray-100 font-pbold text-xl">{users.count}</Text>
                                </View>
                            </View>

                        </View>
                        <View className="h-36 p-2 space-x-2 bg-black-100 rounded-lg mt-4">
                            <Text className="text-gray-100 font-pbold text-xl">Archived</Text>
                            <View className="flex-row space-x-4 mt-2">
                                <View className="items-center bg-gray-700  rounded-lg p-2">
                                    <Text className="text-gray-100 font-pbold text-xl">Projects</Text>
                                    <Text className="text-gray-100 font-pbold text-xl">{archivedprojects.count}</Text>

                                </View>
                                <View className="items-center bg-gray-700  rounded-lg p-2">
                                    <Text className="text-gray-100 font-pbold text-xl">Tasks</Text>
                                    <Text className="text-gray-100 font-pbold text-xl">{archivedtask.count}</Text>
                                </View>
                                <View className="items-center bg-gray-700 rounded-lg p-2">
                                    <Text className="text-gray-100 font-pbold text-xl">Users</Text>
                                    <Text className="text-gray-100 font-pbold text-xl">{archivedusers.count}</Text>
                                </View>
                            </View>

                        </View>
                        <View className="h-40 justify-center p-2 bg-black-100 rounded-lg mt-4">
                            <Text className="text-gray-100 font-pbold text-xl">Recent Projects</Text>
                            <View className=" mt-2 mb-2">
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={projects.data.slice(0, 3)}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderProjectItem}
                                // refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
                                />
                            </View>

                        </View>
                        <View className="h-40 justify-center p-2 bg-black-100 rounded-lg mt-4 mb-4">
                            <Text className="text-gray-100 font-pbold text-xl">Recent Tasks</Text>
                            <View className=" mt-2 mb-2">
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={task.data.slice(0, 3)}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderProjectItem}
                                // refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
                                />
                            </View>

                        </View>

                    </View>
                </ScrollView>
            )}
        </SafeAreaView>

    )
}

export default Home