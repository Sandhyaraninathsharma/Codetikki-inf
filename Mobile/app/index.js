import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Doorly</Text>
      <Text style={styles.subtitle}>
        Log in or create your account to explore apartments.
      </Text>

      <Image
        source={require("../assets/images/join.png")}
        style={styles.image}
        contentFit="contain"
      />

      <Link href="/login" asChild>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Continue with Email</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "700" },
  subtitle: { color: "#666", marginVertical: 10 },
  image: { width: 250, height: 250 },
  btn: {
    backgroundColor: "#eee",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    width: 250,
  },
  btnText: { textAlign: "center", fontWeight: "600" },
});
