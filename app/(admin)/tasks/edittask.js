import { View, Text, ScrollView, Image, Alert, Pressable, TouchableOpacity, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../../components/FormField'
import CustomButton from '../../../components/CustomButton'
import { icons, images } from '../../../constants'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { router, useLocalSearchParams } from 'expo-router'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { Dropdown } from 'react-native-element-dropdown'
import DateTimePickerModal from "react-native-modal-datetime-picker";


const edittask = () => {

    const token = useSelector((state) => state.user.token)
    const users = useSelector((state) => state.user.users)
    const projects = useSelector((state) => state.project.projects)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isMale, setisMale] = useState(false)
    const [isFemale, setisFemale] = useState(false)
    const [isSubmitting, setisSubmitted] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const { id, title, description, tags, priority, dueDate, projectId, status, createdBy } = useLocalSearchParams()


    const [form, setform] = useState({
        id: id,
        title: title || "",
        projectId: projectId || "",
        description: description || "",
        status: status || "",
        tags: tags.split(",") || [],
        priority: priority || "",
        dueDate: dueDate || ""
    })

    const priorityy = [
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' }
    ];

    const statuss = [
        { label: 'To Do', value: 'To Do' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' },
        { label: 'On Hold', value: 'On Hold' },
        { label: 'Blocked', value: 'Blocked' },
        { label: 'Needs Review', value: 'Needs Review' },
        { label: 'In Review', value: 'In Review' },
        { label: 'Rejected', value: 'Rejected' },
        { label: 'Cancelled', value: 'Cancelled' }
    ];

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setform({ ...form, dueDate: date })
        hideDatePicker();
    };

    const handleInputChange = (key, value) => {
        setform({ ...form, [key]: value });
    };
    const getDate = () => {
        let tempDate = form.dueDate.toString().split(' ');
        if (tempDate.length === 1) {
            return form.dueDate
        } else {
            return form.dueDate !== ''
                ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
                : '';
        }

    };

    const handleAddTag = () => {
        const { tags } = form;
        const updatedTags = [...tags, form.newTag];
        setform({ ...form, tags: updatedTags, newTag: '' });
    };

    const handleRemoveTag = (tag) => {
        const updatedTags = form.tags.filter((t) => t !== tag);
        setform({ ...form, tags: updatedTags });
    };

    const submit = async () => {
        try {
            setisSubmitted(true)
            console.log("updating task", form)
            delete form.newTag;

            const response = await axiosPrivate.put("/tasks/update-task",
                form,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    }
                }
            )
            //console.log(response)
            if (response.status === 200) {
                Alert.alert('Success!!', `${form.title} Updated!`)
                setform({
                    id: id,
                    title: "",
                    projectId: "",
                    description: "",
                    status: "",
                    tags: [],
                    priority: "",
                    dueDate: ""
                })
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
            setisSubmitted(false)
        }
    }


    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView >
                <View className="w-full justify-center mt-[2] mb-2 px-4 ">
                    <FormField
                        title="Title"
                        value={form.title}
                        handleChangeText={((e) => setform({ ...form, title: e }))}
                        otherStyles="mt-2"
                        keyboardType="email-address"
                        textInputStyle="h-32"
                    />
                    <Text className='mt-2 text-base text-gray-100 font-pmedium '>Project</Text>

                    <View className=" mt-2 space-x-4 items-center">

                        <Dropdown
                            className="h-16 w-full rounded-2xl px-4 text-gray-100 "
                            style={[{ backgroundColor: '#1E1E2D' }]}
                            // placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={{ color: "#FEBD00" }}
                            inputSearchStyle={{ color: "#CDCDE0" }}
                            //iconStyle={styles.iconStyle}
                            containerStyle={{ backgroundColor: '#1E1E2D' }}
                            itemTextStyle={{ color: "#CDCDE0" }}
                            activeColor='#FEBD00'
                            data={projects.data}
                            search
                            maxHeight={300}
                            labelField="title"
                            valueField="id"
                            placeholderStyle={{ color: "#CDCDE0" }}
                            placeholder={'Select Project'}
                            searchPlaceholder="Search..."
                            value={form.projectId}
                            onChange={((e) => setform({ ...form, projectId: e.id }))}
                        />
                    </View>
                    <Text className='mt-2 text-base text-gray-100 font-pmedium '>Assign Persons</Text>

                    <View className=" mt-2 space-x-4 items-center">
                        <Dropdown
                            className="h-16 w-full rounded-2xl px-4 text-gray-100 "
                            style={[{ backgroundColor: '#1E1E2D' }]}
                            // placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={{ color: "#FEBD00" }}
                            inputSearchStyle={{ color: "#CDCDE0" }}
                            //iconStyle={styles.iconStyle}
                            containerStyle={{ backgroundColor: '#1E1E2D' }}
                            itemTextStyle={{ color: "#CDCDE0" }}
                            activeColor='#FEBD00'
                            data={users}
                            search
                            maxHeight={300}
                            labelField="name"
                            valueField="id"
                            placeholderStyle={{ color: "#CDCDE0" }}
                            placeholder={'Select Person'}
                            searchPlaceholder="Search..."
                            value={form.assigneeId}
                            onChange={((e) => setform({ ...form, assigneeId: e.id }))}
                        />
                    </View>
                    <Text className='mt-2 text-base text-gray-100 font-pmedium '>Priority</Text>

                    <View className=" mt-2 space-x-4 items-center">

                        <Dropdown
                            className="h-16 w-full rounded-2xl px-4 text-gray-100 "
                            style={[{ backgroundColor: '#1E1E2D' }]}
                            // placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={{ color: "#FEBD00" }}
                            //inputSearchStyle={styles.inputSearchStyle}
                            //iconStyle={styles.iconStyle}
                            containerStyle={{ backgroundColor: '#1E1E2D' }}
                            itemTextStyle={{ color: "#CDCDE0" }}
                            activeColor='#FEBD00'
                            data={priorityy}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholderStyle={{ color: "#CDCDE0" }}
                            placeholder={'Select Priority'}
                            //searchPlaceholder="Search..."
                            value={form.priority}
                            onChange={((e) => setform({ ...form, priority: e.value }))}
                        />
                    </View>
                    <Text className='mt-2 text-base text-gray-100 font-pmedium '>Status</Text>

                    <View className=" mt-2 space-x-4 items-center">

                        <Dropdown
                            className="h-16 w-full rounded-2xl px-4 text-gray-100 "
                            style={[{ backgroundColor: '#1E1E2D' }]}
                            // placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={{ color: "#FEBD00" }}
                            inputSearchStyle={{ color: "#CDCDE0" }}
                            //iconStyle={styles.iconStyle}
                            containerStyle={{ backgroundColor: '#1E1E2D' }}
                            itemTextStyle={{ color: "#CDCDE0" }}
                            activeColor='#FEBD00'
                            data={statuss}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholderStyle={{ color: "#CDCDE0" }}
                            placeholder={'Select Status'}
                            //searchPlaceholder="Search..."
                            value={form.status}
                            onChange={((e) => setform({ ...form, status: e.value }))}
                        />
                    </View>
                    <Text className='mt-2 text-base text-gray-100 font-pmedium '>Duedate</Text>
                    <View className="w-full h-16 mt-2 bg-black-100 border-2 border-black-200 rounded-2xl flex-row items-center justify-center">
                        <TextInput className={`flex-1 pl-2 text-white font-psemibold text-base`}
                            placeholderTextColor="#7b7b8b"
                            value={getDate()}
                            editable={false}
                            keyboardType="numeric"
                            placeholder="Pick duedate"
                        />
                        <TouchableOpacity className=" bg-orange-100 h-4/5 rounded-lg px-2 mr-2 items-center justify-center" onPress={showDatePicker}>
                            <Text className=" text-primary font-pmedium" >Pick Date</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                    <Text className='mt-2 text-base text-gray-100 font-pmedium '>Tags</Text>
                    <View className="w-full flex-grow bg-black-100 border-2
                     border-black-200 rounded-2xl
                     flex-1">
                        <View className="w-full pl-2 h-16  bg-black-100 border-2
                            border-black-200 rounded-2xl focus:border-secondary-100
                            items-center flex-row">

                            <TextInput className={`flex-1 text-white font-psemibold text-base`}
                                placeholderTextColor="#7b7b8b"
                                value={form.newTag}
                                onChangeText={(value) => handleInputChange('newTag', value)}
                                placeholder="Type a tag"
                            />
                            <Pressable onPress={handleAddTag} className="mr-5">
                                <Image
                                    source={icons.plus}
                                    className="h-8 w-8 bg-blend-color-burn"
                                    tintColor={"#FFA001"}
                                />
                            </Pressable>

                        </View>

                        <View className="space-x-2 ml-2 mt-2 bg-black-100 rounded-md  flex-row flex-wrap ">
                            {form.tags.map((tag, index) => (

                                <View key={index} className="flex-row items-center">
                                    <Text className="items-center text-lg text-gray-100 font-pmedium ">{tag}</Text>
                                    <TouchableOpacity
                                        className=" ml-1"

                                        onPress={() => handleRemoveTag(tag)}
                                    >
                                        <Image
                                            source={icons.circle_minus}
                                            className="h-6 w-6 bg-blend-color-burn"
                                            tintColor={"red"}
                                        />
                                    </TouchableOpacity>
                                </View>



                            ))}
                        </View>

                    </View>



                    <View className="space-y-2 mt-2">
                        <Text className='text-base text-gray-100 font-pmedium '>Description</Text>
                        <View className="w-full h-48 p-2 bg-black-100 border-2 border-black-200 rounded-2xl
                         focus:border-secondary-100 flex-1">
                            <TextInput
                                className={`flex-1 h-48 text-white font-psemibold text-base`}
                                style={{ textAlignVertical: "top" }}
                                value={form.description}
                                placeholder={"Enter Description"}
                                placeholderTextColor="#7b7b8b"
                                onChangeText={((e) => setform({ ...form, description: e }))}
                                multiline
                            />
                        </View>
                    </View>

                    <CustomButton
                        title={"Update"}
                        handlePress={submit}
                        containerStyles={"mt-7 "}
                        isLoading={isSubmitting}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default edittask