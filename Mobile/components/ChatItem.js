import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function ChatItem({ user, lastMessage, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View>
        <Text style={styles.user}>{user}</Text>
        <Text style={styles.message}>{lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },
  user: {
    fontWeight: "700",
    fontSize: 16
  },
  message: {
    color: "#777",
    marginTop: 4
  }
});
