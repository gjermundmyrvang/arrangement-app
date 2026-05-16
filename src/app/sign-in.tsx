import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import PagerView from "react-native-pager-view";
import { Text } from "../components/ui";
import { useAuth } from "../lib/AuthProvider";
import { useSnack } from "../lib/SnackProvider";
import { isValidEmail } from "../lib/utils";
import { useTheme } from "../theme/ThemeProvider";

export default function SignIn() {
  const { show } = useSnack();
  const { signIn, verify } = useAuth();

  const router = useRouter();

  const colors = useTheme();
  const pagerRef = useRef<PagerView>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleGoToPage = (pageNumber: number) => {
    pagerRef.current?.setPage(pageNumber);
    setCurrentPage(pageNumber);
  };

  // Step 1
  const [email, setEmail] = useState("");
  // Step 2
  const [otp, setOtp] = useState("");

  const requestOTP = async () => {
    show({
      label: `Sending OTP to: ${email}`,
    });

    const success = await signIn(email);

    if (success) handleGoToPage(1); // if success
  };

  const verifyOTP = async () => {
    if (otp.length < 6) {
      Alert.alert("Invalid code", "Please enter the 6-digit code.");
      return;
    }
    show({
      label: `Verifying OTP: ${otp}`,
    });
    const succes = await verify(email, otp);

    if (succes) {
      router.replace("/");
    } else {
      Alert.alert("Error signing up");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <PagerView
        style={{ flex: 1 }}
        ref={pagerRef}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        onLayout={() => setScrollEnabled(false)} // Hacky workaround from google
        scrollEnabled={scrollEnabled}
      >
        <StepOne
          key="step-1"
          email={email}
          setEmail={setEmail}
          requestOTP={requestOTP}
        />
        <StepTwo
          key="step-2"
          otp={otp}
          setOtp={setOtp}
          onSubmit={verifyOTP}
          goBack={() => handleGoToPage(0)}
        />
      </PagerView>
      <View className="absolute bottom-safe left-0 right-0 flex-row items-center justify-center gap-2">
        {[0, 1].map((i) => (
          <View
            key={i}
            className="rounded-full"
            style={{
              width: 8,
              height: 8,
              backgroundColor:
                currentPage === i ? colors.titleText : colors.placeholderText,
            }}
          />
        ))}
      </View>
    </View>
  );
}

interface StepProps {
  onNext: () => void;
  nextLabel?: string;
  children: React.ReactNode;
  goBack?: () => void;
}

function StepLayout({
  onNext,
  nextLabel = "Next",
  children,
  goBack,
}: StepProps) {
  const colors = useTheme();

  return (
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
      {children}
      <TouchableOpacity
        onPress={onNext}
        className="w-full border rounded-full py-4"
        style={{ backgroundColor: colors.titleText }}
      >
        <Text className="text-center" style={{ color: colors.background }}>
          {nextLabel}
        </Text>
      </TouchableOpacity>
      {goBack && (
        <TouchableOpacity onPress={goBack} className="w-full rounded-full py-4">
          <Text className="text-center" variant="placeholder">
            Previous step
          </Text>
        </TouchableOpacity>
      )}
    </KeyboardAwareScrollView>
  );
}

interface StepOneProps {
  email: string;
  setEmail: (email: string) => void;
  requestOTP: () => void;
}

function StepOne({ email, setEmail, requestOTP }: StepOneProps) {
  const handleNext = () => {
    if (email.trim().length === 0) {
      Alert.alert("Email is required!");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Email is is not valid!");
      return;
    }
    requestOTP();
  };

  return (
    <StepLayout onNext={handleNext} nextLabel="Request OTP">
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        onSubmitEditing={handleNext}
        returnKeyType="done"
        keyboardType="email-address"
        autoCapitalize="none"
        className="py-8 w-full text-center"
      />
    </StepLayout>
  );
}

interface StepTwoProps {
  otp: string;
  setOtp: (email: string) => void;
  onSubmit: () => void;
  goBack: () => void;
}

function StepTwo({ otp, setOtp, onSubmit, goBack }: StepTwoProps) {
  return (
    <StepLayout onNext={onSubmit} nextLabel="Verify OTP" goBack={goBack}>
      <TextInput
        value={otp}
        onChangeText={setOtp}
        placeholder="One-time code"
        onSubmitEditing={onSubmit}
        returnKeyType="done"
        keyboardType="number-pad"
        className="py-8 w-full text-center"
      />
    </StepLayout>
  );
}
