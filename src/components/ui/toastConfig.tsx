import { View } from "react-native";
import { BaseToastProps } from "react-native-toast-message";
import { Text } from "./Text";

function SuccessToast({ text1, text2 }: BaseToastProps) {
  return (
    <View
      className="mt-safe w-[90%] rounded-xl p-4 bg-neutral-800"
      style={{ borderLeftWidth: 4, borderLeftColor: "#22c55e" }}
    >
      {text1 && <Text variant="label">{text1}</Text>}
      {text2 && <Text variant="placeholder">{text2}</Text>}
    </View>
  );
}

function ErrorToast({ text1, text2 }: BaseToastProps) {
  return (
    <View
      className="mt-safe w-[90%] rounded-xl p-4 bg-neutral-800"
      style={{ borderLeftWidth: 4, borderLeftColor: "#ef4444" }}
    >
      {text1 && <Text variant="label">{text1}</Text>}
      {text2 && <Text variant="placeholder">{text2}</Text>}
    </View>
  );
}

function InfoToast({ text1, text2 }: BaseToastProps) {
  return (
    <View
      className="mt-safe w-[90%] rounded-xl p-4 bg-neutral-800"
      style={{ borderLeftWidth: 4, borderLeftColor: "#6366f1" }}
    >
      {text1 && <Text variant="label">{text1}</Text>}
      {text2 && <Text variant="placeholder">{text2}</Text>}
    </View>
  );
}

export const toastConfig = {
  success: (props: BaseToastProps) => <SuccessToast {...props} />,
  error: (props: BaseToastProps) => <ErrorToast {...props} />,
  info: (props: BaseToastProps) => <InfoToast {...props} />,
};
