import { TouchableOpacity, View } from "react-native";
import { Text } from "../../components/ui";
import { useAuth } from "../../lib/AuthProvider";
import { useSnack } from "../../lib/SnackProvider";
import { useTheme } from "../../theme/ThemeProvider";

export default function Index() {
  const colors = useTheme();
  const { profile, signOut } = useAuth();
  const { show } = useSnack();

  return (
    <View
      style={{ backgroundColor: colors.background }}
      className="flex-1 justify-center items-center px-2"
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
      <TouchableOpacity
        onPress={() =>
          show({
            label: "Test Snackyboy",
            autoHide: false,
            variant: "positive",
          })
        }
        style={{ backgroundColor: colors.titleText }}
        className="w-full mt-4 rounded-full border py-2"
      >
        <Text className="text-center" style={{ color: colors.background }}>
          Test Snackyboy
        </Text>
      </TouchableOpacity>
    </View>
  );
}
