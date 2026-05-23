import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DEFAULT_CONFIG = { duration: 350, easing: Easing.out(Easing.cubic) };

export function useSlideAnimation(height: number) {
  const translateY = useSharedValue(height);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const slideUp = () => {
    translateY.value = withTiming(0, DEFAULT_CONFIG);
  };
  const slideDown = () => {
    translateY.value = withTiming(height, DEFAULT_CONFIG);
  };

  return { animatedStyle, slideUp, slideDown };
}
