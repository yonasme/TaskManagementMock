import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, RefreshControl, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { icons } from '../../../constants'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks } from '../../../redux/actions/taskAction'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { getProjects } from '../../../redux/actions/projectAction'

const taskdetails = () => {
    const router = useRouter()
    const { id, title, description, tags, priority, dueDate, assigneeId, projectId, status, createdBy, archived } = useLocalSearchParams()
    const task = useSelector((state) => state.task.task)
    const users = useSelector((state) => state.user.users)
    const projects = useSelector((state) => state.project.projects)
    const token = useSelector((state) => state.user.token)
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const axiosPrivate = useAxiosPrivate();
    const tags_array = tags ? tags.split(",") : ""
    console.log("tags", tags_array)

    let filteredData = projects.data ? projects.data.filter(item => item.id === projectId) : null;
    //const filteredUserData = users.filter((user) => createdBy === user.id);
    const filteredUserData = users.filter((users) => users.id === assigneeId);
    console.log("task id", id)
    console.log("archived", archived);
    console.log("filtered Project Data", filteredData)
    console.log("created by id", createdBy)
    console.log("filtered User Data", filteredUserData)


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getTasks()
            setRefreshing(false);
        }, 2000);
    }, [])

    const getTasks = async () => {
        try {

            const response = await axiosPrivate.get("/tasks/get-tasks?orderBy[field]=createdAt&orderBy[direction]=desc", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch(setTask(response.data))
            filteredData = response.data.data.filter(item => item.projectId === id);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        setConfirmVisible(false);
        setIsLoading(false)
    };

    const handleDeleteTask = () => {

        Alert.alert(
            'Confirm Delete Project',
            `Are you sure you want to Delete ${title}?`,
            [
                { text: 'No', onPress: handleCancel, style: 'cancel' },
                { text: 'Yes', onPress: deleteTask },
            ],
            { cancelable: false }
        );

    }

    const deleteTask = async () => {
        try {

            console.log("deleting task", title)
            const response = await axiosPrivate.delete(`/tasks/delete-task/${id}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    }
                }
            )
            console.log(response.data)
            if (response.status === 200) {
                Alert.alert('Success!!', `${title} Deleted!`)
                router.back();
            }
        } catch (err) {
            console.log(err.response.data)
            if (err.response && err.response.data && err.response.data.message) {
                Alert.alert('Error', err.response.data.message[0]);
            } else {
                Alert.alert('Error', err.message);
            }
        } finally {

        }

    };

    const handleRestoreTask = async () => {
        try {

            console.log("restoring task", title)
            const response = await axiosPrivate.post(`/tasks/restore-task/${id}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    }
                }
            )
            console.log(response.data)
            console.log(response.status)
            if (response.status === 201) {
                Alert.alert('Success!!', `${title} Restored!`)
                router.back();
            }
        } catch (err) {
            console.log(err.response.data)
            if (err.response && err.response.data && err.response.data.message) {
                Alert.alert('Error', err.response.data.message[0]);
            } else {
                Alert.alert('Error', err.message);
            }
        } finally {

        }

    };

    const renderItem = ({ item }) => (

        <TouchableOpacity activeOpacity={0.7}>

            <View className="bg-black-200 border-orange-100 border-1 rounded-lg h-22 p-3 mt-3 justify-center">
                <View className="flex 1 justify-center">
                    <View className="items-center justify-center">
                        <Image
                            source={icons.users}
                            className="h-16 w-12 "
                        />
                    </View>

                    <View className="justify-center items-center ml-3 ">
                        <Text className="text-green-100 flex-wrap font-pbold"> {item.name} </Text>
                        <Text className="text-green-100 font-pthin"> {item.jobTitle} </Text>
                    </View>

                </View>

            </View>
        </TouchableOpacity>

    );

    const renderTaskItem = ({ item }) => (

        <View className="bg-black-200 border-orange-100 border-1 rounded-lg h-22 p-3 mt-3 justify-center">
            <View className="flex-row">
                <View className="justify-center">
                    <Image
                        source={icons.check}
                        className="h-16 w-12 "
                    />
                </View>

                <View className="justify-center ml-3">
                    <Text className="text-green-100 flex-wrap font-pbold"> Title: {item} </Text>
                </View>

            </View>

        </View>
    );
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaView className="bg-primary h-full">
            <View className="px-2">
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

                >
                    <View className="bg-black-200 flex-1 justify-center rounded-lg  pt-2 h-32 px-4">
                        <View className="flex-1 justify-center">
                            <Text className="text-gray-100 text-2xl font-pbold">{title}</Text>
                            <Text className="text-orange-100 text-lg font-pthin">{status}</Text>
                        </View>
                        {archived === 'false' ? (
                            <View className="justify-center items-center space-x-2 mt-4 mb-2 mx-2 flex-row">
                                <View className="justify-center items-center flex-row">
                                    <Link href={{
                                        pathname: '/tasks/edittask',
                                        params: {
                                            id: id,
                                            title: title,
                                            description: description,
                                            tags: tags,
                                            priority: priority,
                                            dueDate: dueDate,
                                            projectId: projectId,
                                            status: status,
                                            createdBy: createdBy,
                                        }
                                    }} asChild>
                                        <TouchableOpacity className="justify-center items-center flex-row">
                                            <Image
                                                source={icons.edit}
                                                className="h-6 w-6"
                                            />
                                            <Text className=" text-gray-100"> Edit </Text>
                                        </TouchableOpacity>
                                    </Link>
                                </View>

                                <Text className="text-xl text-gray-100">|</Text>
                                <View className="justify-center items-center flex-row">
                                    <Link href={{
                                        pathname: '/tasks/archivetask',
                                        params: { id: id, description: description, title: title, }
                                    }} asChild>
                                        <TouchableOpacity className="justify-center items-center flex-row">
                                            <Image
                                                source={icons.archive}
                                                className="h-6 w-6"
                                            />
                                            <Text className=" text-gray-100"> Archive </Text>
                                        </TouchableOpacity>
                                    </Link>
                                </View>
                                <Text className="text-xl text-gray-100">|</Text>
                                <View className="justify-center items-center flex-row">
                                    <TouchableOpacity onPress={handleDeleteTask} className="justify-center items-center flex-row">
                                        <Image
                                            source={icons.trash}
                                            className="h-6 w-6"
                                        />
                                        <Text className=" text-gray-100"> Delete </Text>
                                    </TouchableOpacity>

                                </View>


                            </View>
                        ) : (<View className="justify-center items-center space-x-2 mt-4 mb-2 mx-2 flex-row">

                            <View className="justify-center items-center flex-row">

                                <TouchableOpacity onPress={handleRestoreTask} className="justify-center items-center flex-row">
                                    <Image
                                        source={icons.archive}
                                        className="h-6 w-6"
                                    />
                                    <Text className=" text-gray-100"> Restore Task</Text>
                                </TouchableOpacity>

                            </View>


                        </View>)}
                    </View>


                    <View className="bg-black-200 mt-2 pt-2 pl-2 rounded-lg">
                        <Text className="text-gray-100 text-lg font-pbold"> Assigned To</Text>
                        <FlatList
                            className="mt-2 rounded-xl"
                            horizontal
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            data={filteredUserData}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                        //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        />

                    </View>
                    <View className="bg-black-200 mt-2 pt-2 pl-2 mb-2 h-full flex-1 flex-wrap rounded-lg">
                        <View className="flex-1 flex-row">
                            <View className="flex-1 space-y-1">
                                <Text className="text-gray-100 items-end text-lg font-pbold">Project Name</Text>
                                <Text className="text-gray-100 text-lg font-pbold">Tags </Text>
                                <Text className="text-gray-100 text-lg font-pbold">Priority</Text>
                                <Text className="text-gray-100 text-lg font-pbold">Due Date</Text>
                                <Text className="text-gray-100 text-lg font-pbold">Description</Text>
                            </View>
                            <View className="flex-1 flex-wrap space-y-1">

                                <Text className="text-gray-100 text-lg font-pthin">{filteredData[0].title}</Text>

                                {tags_array && tags_array.length > 0 ? (
                                    tags_array.map((item, index) => (
                                        <Text className="text-gray-100 text-lg font-pthin" key={index}>{item} | </Text>
                                    ))
                                ) : (
                                    <Text className="text-gray-100 text-lg font-pthin">No Tags</Text>
                                )}


                                <Text className="text-gray-100 text-lg font-pthin">{priority}</Text>


                                <Text className="text-gray-100 text-lg font-pthin">{dueDate}</Text>


                            </View>
                        </View>
                        <View className="flex-row flex-wrap">
                            <Text className="text-gray-100 text-lg font-pthin">{description}</Text>
                        </View>

                    </View>





                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

export default taskdetails