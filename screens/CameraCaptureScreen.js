import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { Camera } from "expo-camera";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function CameraCaptureScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const camera = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera == null) return;
    const photo = await camera.current.takePictureAsync();
    setPhoto(photo);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>אין לאפליקציה גישה למצלמה. אנא אפשרו גישה דרך הגדרות המכשיר.</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {!photo && (
        <Camera style={{ flex: 1 }} ref={camera}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <AntDesign name="camerao" size={50} color="#000000" />
          </TouchableOpacity>
        </Camera>
      )}
      {photo && (
        <View>
          <Image source={photo} style={{ width: "100%", height: "100%" }}></Image>
          <TouchableOpacity style={styles.captureButton}>
            <Feather name="check" size={50} color="#000000" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  captureButton: {
    width: 90,
    height: 90,
    backgroundColor: "#ffffff",
    position: "absolute",
    bottom: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.6)",
  },
});