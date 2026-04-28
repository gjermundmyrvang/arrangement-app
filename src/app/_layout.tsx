import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/ui";
import "../globals.css";
import { ThemeProvider } from "../theme/ThemeProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}
