import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello 👋", sender: "other" },
    { id: "2", text: "Hi! How are you?", sender: "me" }
  ]);

  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        sender: "me"
      }
    ]);

    setText("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.sender === "me" ? styles.me : styles.other
            ]}
          >
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />

      {/* INPUT */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Type a message"
          style={styles.input}
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  list: {
    padding: 16
  },
  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8
  },
  me: {
    backgroundColor: "#4A90E2",
    alignSelf: "flex-end"
  },
  other: {
    backgroundColor: "#E5E5EA",
    alignSelf: "flex-start"
  },
  text: {
    color: "#000"
  },
  inputRow: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd"
  },
  input: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  sendBtn: {
    marginLeft: 10,
    justifyContent: "center"
  },
  sendText: {
    color: "#4A90E2",
    fontWeight: "700"
  }
});
