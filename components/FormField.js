import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'
const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, textInputStyle, ...props }) => {
    const [showPasword, setshowPasword] = useState(false)
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-100 font-pmedium '>{title}</Text>
            <View className="w-full h-16 px-4 bg-black-100 border-2
             border-black-200 rounded-2xl focus:border-secondary-100
             items-center flex-row
             ">
                <TextInput className={`flex-1 text-white font-psemibold text-base ${textInputStyle}`}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPasword}
                    keyboardType={props.keyboardType}
                    multiline={props.multiline}
                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={() => { setshowPasword(!showPasword) }}>
                        <Image
                            className="w-6 h-6"
                            resizeMode='contain'
                            source={!showPasword ? icons.eye : icons.eyeHide}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField