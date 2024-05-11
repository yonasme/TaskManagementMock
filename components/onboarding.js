import { View, Text, FlatList, Animated, ScrollView } from 'react-native'
import React, { useState, useRef } from 'react'
import slides from './slides'
import Onboardingitem from './onboardingitem'
import Paginator from './paginator'
import CustomButton from './CustomButton'

const Onboarding = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null)
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
    return (
        <View className="justify-center items-center bg-white w-fit  ">
            <View className="">
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <Onboardingitem item={item} />}
                    horizontal
                    pagingEnabled
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false
                    })}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    scrollEventThrottle={32}
                    ref={slidesRef}
                />
                <Paginator data={slides} scrollX={scrollX} />
            </View>

        </View>
    )
}

export default Onboarding