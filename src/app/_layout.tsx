import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "../globals.css";
import AuthProvider, { useAuth } from "../lib/AuthProvider";
import SnackProvider from "../lib/SnackProvider";
import { ThemeProvider } from "../theme/ThemeProvider";

function RootNavigation() {
  const { session, profile } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={!!session && !!profile}>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!!session && !profile}>
        <Stack.Screen name="create-profile" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SnackProvider>
          <KeyboardProvider>
            <RootNavigation />
          </KeyboardProvider>
        </SnackProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
