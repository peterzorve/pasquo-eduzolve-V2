import React, { useState } from 'react'
import {useNavigation} from '@react-navigation/native';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ImageBackground } from 'react-native'

import EduZolveLogo from "../../../assets/eduzolve-logo.png"


import CustomButton from '../../components/CustomButton';
import CustomInput from  '../../components/CustomInput';
// import CustomButton from '../../components/CustomButton';

import { useDispatch } from 'react-redux';
import { SET_USER } from '../../context/actions/userActions';


// import { auth, app, db  } from './firebase';
import { auth, app, db } from '../../../firebaseConfig';

import { addDoc, collection, doc, setDoc, getDoc, getDocs   } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile, onAuthStateChanged   } from "firebase/auth";

import UserTextInput from '../../components/UserTextInput';


const LoginScreen = () => {
    const {height} = useWindowDimensions()
    const navigation = useNavigation();
    const dispatch = useDispatch()
    // const [email, setEmail] = useState("beatricefianyo@gmail.com"); 
    const [email, setEmail] = useState("kennethozio@gmail.com");
    // const [password, setPassword] = useState("beatricefianyo");
    const [password, setPassword] = useState("kennethozio");
    const [buttontext, setButtonText] = useState("Sign in");
    const [disablebutton, setDisableButton] = useState(false);
    const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);


    const SignInButton = async ()  => { navigation.replace('DrawerNavprofile');   }

    const loginBtn = async () => {
      setDisableButton(true)
      await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
          // console.log("User ID:", userCredential?.user.uid )
          getDoc(doc(db, "users", userCredential?.user.uid))
              .then( (docSnap) => {
                  if (docSnap.exists()) { 
                      dispatch(SET_USER(docSnap.data()))
                      navigation.replace("DrawerNavprofile")
                      setDisableButton(false)
                  } 
              })
      })

// navigation.navigate("Chat")

      .catch((error) => {
        setDisableButton(false)
          if (error.message.includes("wrong-password")) {
              setAlert(true);
              setAlertMessage("Password Incorrect");
            } else if (error.message.includes("user-not-found")) {
              setAlert(true);
              setAlertMessage("User Not Found");
            } else {
              setAlert(true);
              setAlertMessage("Invalid Email Address");
            }
            setInterval(() => { setAlert(false); }, 4000);
      })
  }

  // useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, (user) => {
  //         if (user) {
  //           const uid = user.uid;
  //           setUser(user)
  //           navigation.replace("Chat") 
  //         } else {
  //           navigation.canGoBack() && navigation.popToTop();
  //           setUser(null);
  //         }
  //       });
  //       return unsubscribe
  // }, [])




    const signupBtn = () => { navigation.replace('SignupScreen'); }
    const ForgetPassword = () => {};





          

 



    return (
      <ImageBackground source={require('../../../assets/background/backdround9.jpg')} style={styles.backgroundImage} >

        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.root}>
                <Image source={EduZolveLogo} style={[styles.logo, {height: height * 0.25}]} resizeMode='contain'/>
                <CustomInput placeholer="Emaill address" value={email.replace(" ", "")} setValue={setEmail} secureTextEntry={false} centerAlign="true" />
                <CustomInput placeholer="Password"       value={password.replace(" ", "")} setValue={setPassword} secureTextEntry={false} centerAlign="true"/>

                <CustomButton text="Login"         onPress={loginBtn}     bgColor="#DDF2D1" fgColor="#285d09" lnColor="#285d09" lnWidth="2"  disabled={disablebutton}/>
                <CustomButton text="Create account"  onPress={signupBtn}    bgColor="#ffefea" fgColor="#ee2400" lnColor="#ee2400"  lnWidth="2"  />

                {alert && (<Text style={styles.alertmessage} >{alertMessage}</Text>  )}


                {/* <CustomButton text="Forget password" onPress={ForgetPassword} fgColor="#ffd800"   /> */}



                {/* <UserTextInput placeholder="Email" isPass={false}  setValue={setUsername}   setGetEmailValidationStatus={setGetEmailValidationStatus} />
                
                <UserTextInput  placeholder="Password"  isPass={true}   setStatValue={setPassword}   /> */}

            </View>
        </ScrollView>

        </ImageBackground>
    )
  }


const styles = StyleSheet.create({
  root: {
    alignItems: "center", 
    padding: 20,
    marginBottom: 50
  },

 backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },

  logo: {
    width: "70%", 
    maxWidth: 500, 
    maxHeight:300,
    marginTop: 70, 
    marginBottom: 50
  },

  title: {
    fontSize: 24, 
    marginTop: 15,
    color: "blue", 
    fontWeight: 'bold'
  },
  title2: {
    fontSize: 17, 
    marginBottom: 15,
    color: "red", 
    fontWeight: 'bold'
  },
  alertmessage: {
    fontSize: 24, 
    color: "red", 
    alignItems: "center"
}
}); 

export default LoginScreen;