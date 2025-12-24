import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function SocialButton({ icon }: any) {
  return (
    <TouchableOpacity style={styles.btn}>
      <FontAwesome name={icon} size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 6
  }
});
