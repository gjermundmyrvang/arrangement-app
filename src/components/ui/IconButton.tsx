import * as ExpoIcons from "@expo/vector-icons";
import { clsx } from "clsx";
import { Pressable, PressableProps } from "react-native";
import { Icon } from "./Icon";

type IconFamily = keyof typeof ExpoIcons;

interface Props extends PressableProps {
  family: IconFamily;
  name: string;
  size?: number;
  color?: string;
}

export function IconButton({
  family,
  name,
  size = 24,
  color,
  disabled,
  className,
  ...props
}: Props) {
  return (
    <Pressable
      className={clsx("p-2 rounded-lg items-center justify-center", className)}
      disabled={disabled}
      {...props}
    >
      <Icon family={family} name={name} size={size} color={color} />
    </Pressable>
  );
}
