import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../redux/reducer/counterReducer'
import { SafeAreaView } from 'react-native-safe-area-context'
const tasks = () => {

    const projects = useSelector((state) => state.project.projects)
    const dispatch = useDispatch()

    // const renderItem = ({ item }) => (

    //     <View>
    //         <Text> Title: {item.title} </Text>
    //     </View>
    // );

    return (
        <SafeAreaView className="bg-white h-full w-full">
            <View className='flex-1 pl-10 pt-5'>
                <Text>Total Tasks  </Text>

            </View>
        </SafeAreaView>
    )
}

export default tasks