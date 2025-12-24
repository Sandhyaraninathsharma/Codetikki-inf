import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export const sendMessage = (chatId, text, senderId) =>
  addDoc(collection(db, "chats", chatId, "messages"), {
    text,
    senderId,
    createdAt: Date.now(),
    read: false
  });

export const listenMessages = (chatId, cb) =>
  onSnapshot(
    query(collection(db, "chats", chatId, "messages"), orderBy("createdAt")),
    snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  );
