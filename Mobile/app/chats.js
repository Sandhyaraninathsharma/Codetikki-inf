import { FlatList, View, Text, StyleSheet } from "react-native";
import ChatItem from "../components/ChatItem";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Chats() {
  const router = useRouter();

  const [chats] = useState([
    {
      id: "1",
      user: "John Doe",
      lastMessage: "Hey, how are you?"
    },
    {
      id: "2",
      user: "Sarah Smith",
      lastMessage: "Let’s meet tomorrow"
    },
    {
      id: "3",
      user: "Alex Johnson",
      lastMessage: "Got it 👍"
    }
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem
            user={item.user}
            lastMessage={item.lastMessage}
            onPress={() => router.push("/chat")}
          />
        )}
      />
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    padding: 16
  }
});
