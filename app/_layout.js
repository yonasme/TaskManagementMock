import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, SplashScreen, Stack, useRouter, useSegments } from 'expo-router'
import { useFonts } from 'expo-font'
import { Store, persistor } from '../redux/store/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Platform } from 'react-native';


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });

    useEffect(() => {
        if (error) throw error
        if (fontsLoaded) SplashScreen.hideAsync();

    }, [fontsLoaded, error])

    useEffect(() => {


    }, [])


    if (!fontsLoaded && !error) return null;
    const InitialLayout = () => {
        const { isSignedIn, viewOnboarding, isAdmin } = useSelector((state) => state.user)
        const segments = useSegments();
        const router = useRouter();

        useEffect(() => {
            const inAdminGroup = segments[0] === '(admin)'
            const inDevGroup = segments[0] === '(dev)'

            console.log("ingroup admin or dev", inAdminGroup, inDevGroup)
            if (isSignedIn && !inAdminGroup && !inDevGroup) {
                console.log("isAdmin", isAdmin)
                if (isAdmin) {
                    router.replace('/(admin)/home');
                } else {
                    router.replace('/(dev)/home');
                }

            } else if (!isSignedIn) {
                if (viewOnboarding) {
                    router.replace('/onboarding')
                } else {
                    router.replace('/sign-in')
                }
            }
        }, [isSignedIn])

        return (
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false, headerTitle: "Home Page", headerStyle: { backgroundColor: "grey" } }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false, headerStyle: { backgroundColor: "grey" } }} />
                <Stack.Screen name="(admin)" options={{ headerShown: false, headerStyle: { backgroundColor: "grey" } }} />
                <Stack.Screen name="(dev)" options={{ headerShown: false, headerStyle: { backgroundColor: "grey" } }} />

            </Stack>
        )
    }
    return (
        <Provider store={Store}>
            <PersistGate persistor={persistor}>
                <InitialLayout />
            </PersistGate>
        </Provider>

    )
}

export default RootLayout