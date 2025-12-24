import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Link } from "expo-router";

/* ================= VALIDATION HELPERS ================= */

const formatName = (text) => {
  let cleaned = text.replace(/[^a-zA-Z]/g, "");
  if (cleaned.length > 0) {
    cleaned =
      cleaned.charAt(0).toUpperCase() +
      cleaned.slice(1).toLowerCase();
  }
  return cleaned;
};

const validateName = (value, label) => {
  if (!value) return `${label} is required`;
  if (value.length < 2) return `${label} must be at least 2 characters`;
  return "";
};

const validateGmail = (email) => {
  if (!email) return "Email is required";
  const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!regex.test(email)) return "Only @gmail.com email is allowed";
  return "";
};

const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8)
    return "Password must be at least 8 characters";
  return "";
};

const validateConfirmPassword = (password, confirm) => {
  if (!confirm) return "Confirm password is required";
  if (password !== confirm) return "Passwords do not match";
  return "";
};

/* ================= REGISTER SCREEN ================= */

export default function Register() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {
      firstName: validateName(firstName, "First name"),
      surname: validateName(surname, "Surname"),
      email: validateGmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(
        password,
        confirmPassword
      )
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    /* ✅ SUCCESS */
    Alert.alert("Success", "Account created successfully 🎉", [
      {
        text: "Continue",
        onPress: () => router.replace("/chats")
      }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Set Up Your Account</Text>

      {/* FIRST NAME */}
      <TextInput
        placeholder="First Name"
        style={styles.input}
        value={firstName}
        onChangeText={(text) => setFirstName(formatName(text))}
      />
      {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

      {/* SURNAME */}
      <TextInput
        placeholder="Surname"
        style={styles.input}
        value={surname}
        onChangeText={(text) => setSurname(formatName(text))}
      />
      {errors.surname && <Text style={styles.error}>{errors.surname}</Text>}

      {/* EMAIL */}
      <TextInput
        placeholder="Email Address"
        style={styles.input}
        value={email}
        onChangeText={(t) => setEmail(t.toLowerCase())}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      {/* PASSWORD */}
      <View style={styles.passwordBox}>
        <TextInput
          placeholder="Password"
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#555"
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {/* CONFIRM PASSWORD */}
      <View style={styles.passwordBox}>
        <TextInput
          placeholder="Confirm Password"
          style={styles.passwordInput}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={22}
            color="#555"
          />
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

      {/* BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* LOGIN LINK */}
      <Link href="/login" style={styles.link}>
        Already have an account? Login
      </Link>
    </ScrollView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 14,
    borderRadius: 10,
    marginBottom: 6
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 6
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 8
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 12,
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
  link: {
    textAlign: "center",
    marginTop: 16,
    color: "#4A90E2",
    fontWeight: "600"
  }
});
