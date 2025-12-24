import { TextInput, StyleSheet } from "react-native";

export default function Input(props) {
  return <TextInput {...props} style={styles.input} />;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F2F2F2",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
});
