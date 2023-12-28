import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
// import { Logo } from "../assets";

// import Logo from "../assets/eduzolve-logo1.png"
import Logo from "../../../assets/eduzolve-logo.png"

// 'assets/splash.png'

// import { firebaseAuth, firestoreDB } from "../config/firebase.config";
// import { auth, db } from "./firebase";
import { auth, db } from "../../../firebaseConfig";


import { useNavigation } from "@react-navigation/native";
import { doc, getDoc }   from "firebase/firestore";

// import { SET_USER } from "../context/actions/userActions";
// import { SET_USER } from "../context/actions/userActions";
import { SET_USER } from "../../context/actions/userActions";

import { useDispatch } from "react-redux"; 

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    checkLoggedUser();
  }, []);

  const checkLoggedUser = async () => {
    await auth.onAuthStateChanged((userCredential) => {
      if (userCredential?.uid) {
        getDoc(doc(db, "users", userCredential?.uid))
          .then((docSnap) => { 
            if (docSnap.exists()) { dispatch(SET_USER(docSnap.data())); }
            })
          .then(() => { setTimeout(() => { navigation.replace("DrawerNavprofile"); }, 3000); } );
      } else {
        navigation.replace("LoginScreen"); 
      }
    });
  };

  return (
    <View 
      className="flex-1 items-center justify-center space-y-24"
      style={styles.container}
    >
      <Image source={Logo} className="w-10 h-10" resizeMode="contain" />
      <ActivityIndicator size={"large"} color={"#43C651"} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1, // 'flex-1' in CSS
    alignItems: 'center', // 'items-center' in CSS
    justifyContent: 'center', // 'justify-center' in CSS
    marginTop: 32, // 'space-y-24' in CSS
  },
});

export default SplashScreen;


