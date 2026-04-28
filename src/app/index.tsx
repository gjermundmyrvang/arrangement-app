import { View } from "react-native";
import { Text } from "../components/ui";
import { Icon } from "../components/ui/Icon";
import { useTheme } from "../theme/ThemeProvider";

export default function Index() {
  const theme = useTheme();
  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 justify-center items-center"
    >
      <Text variant="title">Homescreen</Text>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <View className="flex flex-row items-center gap-2 mt-4">
        <Text className="mr-2">Icons from different families:</Text>
        <Icon family="Ionicons" name="home" />
        <Icon family="Feather" name="settings" />
        <Icon family="MaterialIcons" name="star" color={theme.titleText} />
      </View>
    </View>
  );
}
