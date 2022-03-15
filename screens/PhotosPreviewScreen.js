import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, useWindowDimensions } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { usePhotos } from "../utils/PhotosContext";
import ContinueButton from "../components/ContinueButton";

export default function PhotosPreviewScreen({ navigation }) {
  const { photos, setPhotos } = usePhotos();

  const window = useWindowDimensions();

  const handleClose = () => {
    navigation.navigate("PromptCapture");
    setPhotos([]);
  };

  const openCamera = () => {
    navigation.push("CameraCapture");
  };

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      asepct: [3, 4],
    });

    if (!result.cancelled) {
      setPhotos([result, ...photos]);
      navigation.navigate("PhotosPreview");
    }
  };

  const handleContinue = () => {
    navigation.navigate("ChooseLocation");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <AntDesign name="close" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>בחירת תמונות</Text>
        {/* Placeholder to align title to center */}
        <View></View>
      </View>

      {/* Photos */}
      <FlatList
        horizontal
        data={photos}
        renderItem={({ item }) => <Image source={item} style={styles.photo(window)} />}
        keyExtractor={(photo) => photo.uri}
        style={styles.list}
        contentContainerStyle={{ alignItems: "center" }}
      />

      {/* Buttons */}
      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openCamera}>
            <AntDesign name="camerao" size={43} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonTitle}>מצלמה</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openGallery}>
            <FontAwesome name="photo" size={40} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonTitle}>גלריה</Text>
        </View>
      </View>

      {/* Continue Button */}
      <ContinueButton onPress={handleContinue} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    marginTop: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Assistant-Bold",
    fontSize: 18,
    marginRight: 30,
  },
  closeButton: {
    marginLeft: 30,
  },
  list: {
    marginTop: 30,
  },
  photo: (window) => ({
    aspectRatio: 3 / 5,
    width: window.width / 1.6,
    resizeMode: "cover",
    marginHorizontal: 10,
    borderRadius: 15,
  }),
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 50,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: "2%",
  },
  button: {
    backgroundColor: "#BB0101",
    borderRadius: 100,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: "Assistant-Bold",
    fontSize: 20,
    marginTop: 10,
  },
});