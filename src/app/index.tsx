import { View } from "react-native";
import { Text } from "../components/ui";
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
    </View>
  );
}
