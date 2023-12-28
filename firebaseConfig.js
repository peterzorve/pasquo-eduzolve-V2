import { initializeApp } from "firebase/app"; 
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"




// ==== New Version =========================================================
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import {ReactNativeAsyncStorage, AsyncStorage } from '@react-native-async-storage/async-storage'; 

var firebaseConfig = {
    apiKey: "AIzaSyC7i04ZxdFlvU9u3mQmXcsTbmSoaGLXp9Q",
    authDomain: "eduzolve-chatapp.firebaseapp.com",
    projectId: "eduzolve-chatapp",
    storageBucket: "eduzolve-chatapp.appspot.com",
    messagingSenderId: "416574865260",
    appId: "1:416574865260:web:986c6389e49b097e16bd49"
  };
  
export const app  = initializeApp(firebaseConfig) 
export const db   = getFirestore(app)
export const auth = initializeAuth(app, {  persistence: getReactNativePersistence(ReactNativeAsyncStorage), });
