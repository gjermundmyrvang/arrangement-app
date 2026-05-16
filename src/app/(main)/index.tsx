import { TouchableOpacity, View } from "react-native";
import { Text } from "../../components/ui";
import { useAuth } from "../../lib/AuthProvider";
import { useTheme } from "../../theme/ThemeProvider";

export default function Index() {
  const colors = useTheme();
  const { profile, signOut } = useAuth();

  return (
    <View
      style={{ backgroundColor: colors.background }}
      className="flex-1 justify-center items-center"
    >
      <Text variant="title">Signed in as:</Text>
      <Text>{profile?.username}</Text>

      <TouchableOpacity
        onPress={signOut}
        style={{ borderColor: colors.border }}
        className="w-full mt-4 rounded-full border py-2"
      >
        <Text className="text-center">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
