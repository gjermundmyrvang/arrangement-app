import React, { createContext, useContext, useState } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { IconButton, Text } from "../components/ui";
import { useTheme } from "../theme/ThemeProvider";
import { useSlideAnimation } from "./animations";

type Snack = {
  label: string;
  autoHide?: boolean;
  variant?: "positive" | "neutral" | "negative";
};

type SnackContextProps = {
  show: (snack: Snack) => void;
};

const SnackContext = createContext<SnackContextProps | null>(null);

export default function SnackProvider({ children }: React.PropsWithChildren) {
  const { animatedStyle, slideUp, slideDown } = useSlideAnimation(350);

  const colors = useTheme();
  const [snack, setSnack] = useState<Snack | null>(null);

  const VARIANTS = {
    positive: "#7bff6c",
    neutral: colors.border,
    negative: "#ff391c",
  };

  const show = (snack: Snack) => {
    setSnack(snack);
    slideUp();
    if (snack.autoHide ?? true) {
      setTimeout(() => {
        slideDown();
        setTimeout(() => setSnack(null), 350);
      }, 3000);
    }
  };

  const hide = () => {
    slideDown();
    setTimeout(() => setSnack(null), 350);
  };

  return (
    <SnackContext.Provider value={{ show }}>
      <View style={{ flex: 1 }}>{children}</View>
      {snack && (
        <Animated.View
          style={animatedStyle}
          className="absolute bottom-4 pb-safe left-4 right-4 items-center"
        >
          <View
            style={{ backgroundColor: VARIANTS[snack.variant ?? "neutral"] }}
            className="flex-1 flex-row items-center justify-between w-full px-4 py-2 rounded-lg"
          >
            <Text>{snack.label}</Text>
            {snack.autoHide === false && (
              <IconButton
                family="Ionicons"
                name="close-circle-outline"
                onPress={hide}
              />
            )}
          </View>
        </Animated.View>
      )}
    </SnackContext.Provider>
  );
}

export function useSnack() {
  const ctx = useContext(SnackContext);
  if (!ctx) throw new Error("useSnack must be used within a SnackProvider");
  return ctx;
}
