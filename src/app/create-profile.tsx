import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Icon, Text } from "../components/ui";
import { useAuth } from "../lib/AuthProvider";
import { useSnack } from "../lib/SnackProvider";
import { supabase } from "../lib/supabase";
import { useTheme } from "../theme/ThemeProvider";

export default function CreateProfile() {
  const { show } = useSnack();
  const { session, refetchProfile } = useAuth();
  const router = useRouter();
  const colors = useTheme();
  const [username, setUsername] = useState("");
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const nameRef = useRef<TextInput>(null);

  const handleCreateProfile = async () => {
    if (username.trim().length === 0) {
      show({
        label: "Username can not be blank!",
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .insert([{ id: session?.user.id, username, full_name: name }])
      .select();

    setLoading(false);
    if (error) {
      Alert.alert("Error", error.message);
      return;
    }
    refetchProfile();
    router.replace("/");
  };

  if (loading)
    return (
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: colors.background }}
      >
        <ActivityIndicator size={"small"} />
      </View>
    );

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 4,
          gap: 12,
        }}
      >
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username (required)"
          returnKeyType="next"
          autoCapitalize="none"
          className="py-8 w-full text-center"
          onSubmitEditing={() => nameRef.current?.focus()}
        />
        <TextInput
          ref={nameRef}
          value={name ?? ""}
          onChangeText={(text) => setName(text === "" ? null : text)}
          style={{ opacity: name ? 1 : 0.3 }}
          placeholder="Name (optional)"
          returnKeyType="done"
          className="py-8 w-full text-center"
          onSubmitEditing={handleCreateProfile}
        />
        <TouchableOpacity
          onPress={handleCreateProfile}
          className="border px-4 py-2 rounded-xl flex-row justify-center items-center gap-4"
          style={{ borderColor: colors.border }}
        >
          <Icon name="person-outline" family="Ionicons" size={18} />
          <Text className="fondt-bold">Create Profile</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
