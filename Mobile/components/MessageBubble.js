import { View, Text } from "react-native";

export default function MessageBubble({ text, isMe }) {
  return (
    <View
      style={{
        alignSelf: isMe ? "flex-end" : "flex-start",
        backgroundColor: isMe ? "#E5C8FF" : "#F1F1F1",
        padding: 12,
        margin: 6,
        borderRadius: 16,
        maxWidth: "75%"
      }}
    >
      <Text>{text}</Text>
    </View>
  );
}
