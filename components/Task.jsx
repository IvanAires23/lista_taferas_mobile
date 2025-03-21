import { Ionicons } from "@expo/vector-icons"
import { Animated, Pressable, StyleSheet, Text, View } from "react-native"
import { colors } from "../constants/colors"
import { useState } from "react"
import { Directions, FlingGestureHandler, State } from "react-native-gesture-handler"

export default function Task({ text, initialCompleted, deleteTask }) {
    const [completed, setCompleted] = useState(initialCompleted)
    const swipe = new Animated.Value(0)

    const handleFling = (e) => {
        if (e.nativeEvent.state === State.ACTIVE) {
            Animated.timing(swipe, {
                toValue: 500,
                duration: 300
            }).start(() => deleteTask())
        }
    }

    return (
        <FlingGestureHandler
            direction={Directions.RIGHT}
            onHandlerStateChange={handleFling}
        >
            <Animated.View style={[style.rowContainer, { transform: [{ translateX: swipe }] }]}>
                <Pressable onPress={() => setCompleted(!completed)}>
                    <Ionicons
                        name="checkmark-circle"
                        size={32}
                        color={completed ? colors.primary : "gray"} />
                </Pressable>
                <Text>{text}</Text>
            </Animated.View>
        </FlingGestureHandler>
    )
}

const style = StyleSheet.create({
    rowContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
        elevation: 3,
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: "#ffffff",
        padding: 10
    }
})