import { View, Text, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter, Link } from "expo-router";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ---------- VALIDATION ---------- */
  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = () => {
    if (!email.trim()) {
      return Alert.alert("Validation Error", "Email is required");
    }

    if (!isValidEmail(email)) {
      return Alert.alert("Validation Error", "Enter a valid email address");
    }

    if (!password.trim()) {
      return Alert.alert("Validation Error", "Password is required");
    }

    if (password.length < 6) {
      return Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters"
      );
    }

    /* ✅ SUCCESS → GO TO CHAT LIST */
    router.replace("/chats");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <Link href="/register" style={styles.link}>
        Create Account
      </Link>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    color: "#4A90E2",
    fontWeight: "600",
  },
});
