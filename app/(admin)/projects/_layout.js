import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, SplashScreen, Stack, useRouter, useSegments } from 'expo-router'
import { useFonts } from 'expo-font'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native';

SplashScreen.preventAutoHideAsync();

const _layout = () => {

    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false, headerTitle: "Projects", headerStyle: { backgroundColor: "grey" } }} />
                <Stack.Screen name="projectdetails" options={{ presentation: 'modal', headerShown: false, headerTitle: "Project Details", animation: Platform.OS == "android" ? "slide_from_bottom" : "default", animationDuration: 500, headerStyle: { backgroundColor: "grey" } }} />
                <Stack.Screen name="newproject" options={{ presentation: "modal", headerShown: false, headerTitle: "New Project", animation: Platform.OS == "android" ? "slide_from_bottom" : "default", animationDuration: 500 }} />
                <Stack.Screen name="newtask" options={{ presentation: "modal", headerShown: false, headerTitle: "New Task", animation: Platform.OS == "android" ? "slide_from_bottom" : "default", animationDuration: 500 }} />
                <Stack.Screen name="editproject" options={{ presentation: "modal", headerShown: false, headerTitle: "New Project", animation: Platform.OS == "android" ? "slide_from_bottom" : "default", animationDuration: 500 }} />
                <Stack.Screen name="archiveproject" options={{ presentation: "modal", headerShown: false, headerTitle: "New Project", animation: Platform.OS == "android" ? "slide_from_bottom" : "default", animationDuration: 500 }} />
                <Stack.Screen name="archivelist" options={{ presentation: "modal", headerShown: false, headerTitle: "New Project", animation: Platform.OS == "android" ? "slide_from_bottom" : "default", animationDuration: 500 }} />

            </Stack>
            <StatusBar backgroundColor='#13193d' style='light' />
        </>
    )
}

export default _layout