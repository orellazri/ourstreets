import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Share, Image, useWindowDimensions } from "react-native";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../utils/firebase";
import Logo from "../components/Logo";
import { colors } from "../utils/data";
import { useReport } from "../utils/ReportContext";

export default function ReportConfirmationScreen({ navigation }) {
  const [appStoreLink, setAppStoreLink] = useState("");

  const window = useWindowDimensions();

  const { resetReport } = useReport();

  useEffect(async () => {
    // Get app store link meta
    const docSnapshot = await getDoc(doc(db, "meta", "app-store-link"));
    if (docSnapshot.exists()) {
      setAppStoreLink(docSnapshot.data().value);
    }
  }, []);

  const handleBackButton = () => {
    navigation.navigate("Welcome");
    resetReport();
  };

  const handleShareButton = async () => {
    try {
      await Share.share({
        message: "גם אני דיווחתי דרך אפליקציית ברחובות שלנו!\n" + appStoreLink,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Red background */}
      <View style={styles.redBackground(window)}></View>

      {/* Logo */}
      <Logo />

      {/* Background */}
      <Image source={require("../assets/images/confirmation-logo.png")} style={styles.confirmationLogo} />

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>הדיווח התקבל!</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
          <Text style={styles.backButtonText}>עשיתי את שלי</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShareButton}>
          <Text style={styles.shareButtonText}>שיתוף הדיווח</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow,
    alignItems: "center",
    paddingTop: "5%",
  },
  redBackground: (window) => ({
    backgroundColor: colors.red,
    bottom: 0,
    width: window.width,
    height: window.height / 1.5,
    position: "absolute",
  }),
  confirmationLogo: {
    position: "absolute",
    top: "20%",
    resizeMode: "contain",
    height: 200,
  },
  textContainer: {
    position: "absolute",
    top: "60%",
  },
  title: {
    fontFamily: "Assistant-Bold",
    fontSize: 22,
    color: "white",
  },
  buttonsContainer: {
    position: "absolute",
    top: "70%",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  backButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
  },
  shareButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  shareButtonText: {
    fontSize: 18,
  },
});
