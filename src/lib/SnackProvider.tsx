import React, { createContext, useContext, useState } from "react";
import { View } from "react-native";
import { Text } from "../components/ui";
import { useTheme } from "../theme/ThemeProvider";

type Snack = {
  label: string;
  autoHide?: boolean;
};

type SnackContextProps = {
  show: (snack: Snack) => void;
};

const SnackContext = createContext<SnackContextProps | null>(null);

export default function SnackProvider({ children }: React.PropsWithChildren) {
  const theme = useTheme();
  const [snack, setSnack] = useState<Snack | null>(null);

  const show = (snack: Snack) => {
    setSnack(snack);
    if (snack.autoHide ?? true) {
      setTimeout(() => setSnack(null), 3000);
    }
  };
  return (
    <SnackContext.Provider value={{ show }}>
      <View style={{ flex: 1 }}>{children}</View>
      {snack && (
        <View className="absolute bottom-4 pb-safe left-4 right-4 items-center">
          <View
            style={{ backgroundColor: theme.border }}
            className="flex-1 w-full px-4 py-2 rounded-lg"
          >
            <Text>{snack.label}</Text>
          </View>
        </View>
      )}
    </SnackContext.Provider>
  );
}

export function useSnack() {
  const ctx = useContext(SnackContext);
  if (!ctx) throw new Error("useSnack must be used within a SnackProvider");
  return ctx;
}
