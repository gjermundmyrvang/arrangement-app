import { Pressable, View } from "react-native";
import Toast from "react-native-toast-message";
import { Icon, IconButton, Text } from "../components/ui";
import { useTheme } from "../theme/ThemeProvider";

export default function Index() {
  const theme = useTheme();

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 justify-center items-center"
    >
      <Text variant="title">Homescreen</Text>
      <Text>This is the homescreen</Text>
      <View className="flex flex-row items-center gap-2 mt-4">
        <Text className="mr-2">Icons from different families:</Text>
        <Icon family="Ionicons" name="home" />
        <Icon family="Feather" name="settings" />
        <Icon family="MaterialIcons" name="star" color={theme.titleText} />
      </View>
      <View className="flex flex-row items-center gap-2 mt-4">
        <Text className="mr-2">Iconbuttons:</Text>
        <IconButton
          family="Ionicons"
          disabled
          name="person"
          onPress={() => console.log("Pressed person")}
          className="bg-blue-400 rounded-full"
        />
        <IconButton
          family="MaterialIcons"
          name="house"
          onPress={() => console.log("Pressed house")}
          className="border"
          style={{ borderColor: theme.border }}
        />
      </View>
      <Pressable
        className="bg-black rounded-lg px-6 py-2 mt-4"
        onPress={() =>
          Toast.show({
            type: "info",
            text1: "Hi! I am an informatiom toast",
            text2: "Using the react-native-toast-message library",
          })
        }
      >
        <Text>Open Snack</Text>
      </Pressable>
    </View>
  );
}
