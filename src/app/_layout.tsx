import { Stack } from "expo-router";
import "../globals.css";
import SnackProvider from "../lib/SnackProvider";
import { ThemeProvider } from "../theme/ThemeProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SnackProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </SnackProvider>
    </ThemeProvider>
  );
}
