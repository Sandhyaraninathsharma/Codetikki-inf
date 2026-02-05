import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useState } from "react";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter, Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

/* ================= VALIDATION HELPERS ================= */

const validateName = (value, label) => {
  if (!value) return `${label} is required`;

  // only letters & spaces allowed
  const regex = /^[A-Za-z ]+$/;
  if (!regex.test(value)) return `Only letters and spaces are allowed`;

  // ❌ must NOT end in space, dot, or comma
  if (/[ .,]$/.test(value))
    return `${label} cannot end with space or punctuation`;

  // must contain at least 2 letters (ignoring spaces)
  if (value.replace(/\s/g, "").length < 2)
    return `${label} must be at least 2 characters`;

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
  if (password.length < 8) return "Password must be at least 8 characters";
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

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agree, setAgree] = useState(false); // checkbox state
  const [profileImage, setProfileImage] = useState(null); // attachable image

  const [errors, setErrors] = useState({});

  /* -------- PICK IMAGE ---------- */
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      fullName: validateName(fullName, "Username"),
      email: validateGmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
      agree: !agree ? "You must accept terms to continue" : "",
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    Alert.alert("Success", "Account created successfully 🎉", [
      { text: "Continue", onPress: () => router.replace("/chats") },
    ]);
  };

  const allValid =
    !validateName(fullName, "Username") &&
    !validateGmail(email) &&
    !validatePassword(password) &&
    !validateConfirmPassword(password, confirmPassword);

  return (
    <LinearGradient colors={["#4b4b9a", "#0f3c8c"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.screen}>

        {/* 🟦 Mascot Left */}
        <View style={styles.mascotRow}>
          <Image source={require("../assets/images/mascot.png")} style={styles.mascot} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Welcome To CodeTikki</Text>
          <Text style={styles.subtitle}>From Nikki!</Text>
          <Text style={styles.caption}>Create your CodeTikki account</Text>
        </View>

        {/* Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.card}>

            {/* 🟦 PROFILE IMAGE UPLOAD */}
            <View style={styles.imageUploadBox}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.previewImage} />
              ) : (
                <Text style={styles.imagePlaceholder}>No image selected</Text>
              )}

              <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                <Text style={styles.uploadText}>Upload Image</Text>
              </TouchableOpacity>
            </View>

            {/* USERNAME */}
            <TextInput
              placeholder="Username"
              style={styles.input}
              value={fullName}
              onChangeText={(t) => setFullName(t)}
            />
            {errors.fame && <Text style={styles.error}>{errors.fullName}</Text>}

            {/* EMAIL */}
            <TextInput
              placeholder="Email"
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
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#555" />
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
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={22} color="#555" />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            {/* 🟦 INTERACTIVE CHECKBOX */}
            <TouchableOpacity
            style={[styles.checkboxRow, !allValid && { opacity: 0.5 } ]}
             disabled={!allValid}
              onPress={() => setAgree(!agree)}
            >

              <View style={[styles.checkboxBox, agree && styles.checkboxChecked]}>
                {agree && <Ionicons name="checkmark" size={16} color="#fff" />}
              </View>

              <Text style={styles.checkboxText}>
                I agree to the terms and privacy policy
              </Text>
            </TouchableOpacity>

            {errors.agree && <Text style={styles.error}>{errors.agree}</Text>}

            {/* 🟦 DISABLED REGISTER BUTTON UNTIL CHECKED */}
            <TouchableOpacity
              style={[styles.registerBtn, !agree && styles.disabledBtn]}
              onPress={handleSubmit}
              disabled={!agree}
            >
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Or Login with</Text>

            {/* 🟦 SOCIAL ICONS */}
            <View style={styles.socialRow}>
              <FontAwesome name="facebook" size={28} color="#1877F2" />
              <Feather name="mail" size={28} color="#000" />
              <FontAwesome name="github" size={28} color="#000" />
            </View>

            {/* LOGIN LINK */}
            <Link href="/login" style={styles.loginLink}>
              Already have an account? Login
            </Link>
          </View>
        </View>

        <Text style={styles.footerTitle}>Connect With Us</Text>
      </ScrollView>
    </LinearGradient>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  screen: { flexGrow: 1, paddingTop: 40, paddingBottom: 20, alignItems: "center" },

  mascotRow: { width: "100%", paddingLeft: 22, marginBottom: 4 },
  mascot: { width: 70, height: 70, resizeMode: "contain" },

  header: { alignItems: "center", marginBottom: 12 },
  appTitle: { color: "#fff", fontSize: 22, fontWeight: "800" },
  subtitle: { color: "#fff", fontSize: 18, marginTop: 2 },
  caption: { color: "#ddd", marginTop: 6 },

  cardWrapper: { width: "100%", alignItems: "center", marginTop: 20 },
  card: { width: 351, backgroundColor: "#fff", borderRadius: 5, padding: 18, elevation: 4 },

  /* 🟦 IMAGE UPLOAD */
  imageUploadBox: { alignItems: "center", marginBottom: 8 },
  previewImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 6 },
  imagePlaceholder: { color: "#777", marginBottom: 6 },
  uploadBtn: { backgroundColor: "#0f3c8c", padding: 8, borderRadius: 6 },
  uploadText: { color: "#fff", fontWeight: "600" },

  /* 🟦 BLUE BORDER INPUTS */
  input: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#0f3c8c",
  },

  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#0f3c8c",
  },

  passwordInput: { flex: 1, paddingVertical: 12 },
  error: { color: "red", fontSize: 12, marginBottom: 6 },

  checkboxRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  checkboxBox: {
    height: 18,
    width: 18,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 8,
    borderColor: "#0f3c8c",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: { backgroundColor: "#0f3c8c" },

  checkboxText: { fontSize: 12 },

  registerBtn: { backgroundColor: "#0f3c8c", padding: 12, borderRadius: 6, marginTop: 8 },
  disabledBtn: { backgroundColor: "#8aa3ce" },

  registerText: { color: "#fff", textAlign: "center", fontWeight: "700" },

  orText: { textAlign: "center", marginVertical: 8 },

  socialRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 40, marginTop: 6 },

  loginLink: { textAlign: "center", marginTop: 10, color: "#0f3c8c", fontWeight: "600" },

  footerTitle: { textAlign: "center", color: "#fff", marginTop: 18, fontWeight: "600" },
});
