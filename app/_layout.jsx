import { Alert, Button, Image, Platform, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import logo from "../assets/images/check.png"
import { colors } from "../constants/colors";
import { View } from "react-native";
import { Pressable } from "react-native";
import { FlatList } from "react-native";
import Task from "../components/Task";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

/*const initialTasks = [
  { id: 1, completed: true, text: "Fazer café" },
  { id: 2, completed: true, text: "Estudar React Native" },
  { id: 3, completed: true, text: "Academia" },
]*/

export default function RootLayout() {

  const [tasks, setTasks] = useState([])
  const [text, setText] = useState("")

  useEffect(() => {
    getTasksAsyncStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('tasks')
        if( jsonValue != null) setTasks(JSON.parse(jsonValue))

      } catch(e) {
        // read error
      }
    }

    getTasksAsyncStorage()
  }, [])

  useEffect(() => {
    setTasksAsyncStorage = async () => {
      try {
        const jsonValue = JSON.stringify(tasks)
        await AsyncStorage.setItem('tasks', jsonValue)
      } catch(e) {
        // save error
      }
    }

    setTasksAsyncStorage()
  },[tasks] )

  const addTasks = () => {
    const newTask = { id: tasks.length + 1, completed: false, text }
    setTasks([...tasks, newTask])
    setText("")
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={style.mainContainer}>
        <View style={style.rowContainer}>
          <Image source={logo} style={style.image} />
          <Text style={style.title}>Minhas Tarefas</Text>
        </View>

        <View style={style.rowContainer}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={style.input} />
          <Pressable
            onPress={addTasks}
            style={({ pressed }) => [style.button, { backgroundColor: pressed ? "blue" : colors.primary }]}
          >
            <Text style={style.buttonText}>+</Text>
          </Pressable>
        </View>

        <FlatList
          data={tasks}
          renderItem={
            ({ item }) => <Task text={item.text}
              initialCompleted={item.completed}
              deleteTask={() => setTasks(tasks.filter(t => t.id !== item.id))}
            />
          }

        />

        {Platform.OS == "ios" && <Text>Executando em IOS</Text>}
        {Platform.OS == "android" && <Text>Executando em Android</Text>}
        {Platform.OS == "web" && <Text>Executando em web</Text>}
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const style = StyleSheet.create({
  image: {
    width: 50,
    height: 50
  },
  title: {
    fontSize: 30,
    fontFamily: "Calibri",
    fontWeight: 600,
    color: colors.primary
  },
  input: {
    height: 40,
    paddingHorizontal: 16,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    flexGrow: 1
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 20
  },
  mainContainer: {
    margin: 20
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20
  }
})