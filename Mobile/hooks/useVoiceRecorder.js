import { Audio } from "expo-av";
import { useState } from "react";

export default function useVoiceRecorder() {
  const [recording, setRecording] = useState(null);

  const startRecording = async () => {
    await Audio.requestPermissionsAsync();
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    setRecording(recording);
  };

  const stopRecording = async () => {
    await recording.stopAndUnloadAsync();
    return recording.getURI();
  };

  return { startRecording, stopRecording };
}
