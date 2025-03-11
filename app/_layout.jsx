import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import logo from "../assets/images/check.png"
import { colors } from "../constants/colors";
import { View } from "react-native";
import { Pressable } from "react-native";
import { FlatList } from "react-native";
import Task from "../components/Task";

export default function RootLayout() {

  const tasks = [
    { id: 1, completed: true, text: "Fazer café" },
    { id: 2, completed: true, text: "Estudar React Native" },
    { id: 3, completed: true, text: "Academia" },
  ]

  return (
    <View style={style.mainContainer}>
      <View style={style.rowContainer}>
        <Image source={logo} style={style.image} />
        <Text style={style.title}>Minhas Tarefas</Text>
      </View>

      <View style={style.rowContainer}>
        <TextInput style={style.input} />
        <Pressable
          onPress={() => Alert.alert("Olá")}
          style={({ pressed }) => [style.button, { backgroundColor: pressed ? "blue" : colors.primary }]}
        >
          <Text style={style.buttonText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => <Task text={item.text} />}
      />
    </View>
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