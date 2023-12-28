import React, { useEffect,  useState } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ImageBackground } from 'react-native'



// import { auth, app, db } from '../../../firebaseConfig';

import { app, db,  auth } from '../../../firebaseConfig';

// import { addDoc, collection, doc, setDoc, getDoc, getDocs   } from 'firebase/firestore';
// import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { addDoc, collection, doc, setDoc, getDoc, getDocs   } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";

import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

// import CustomButton from '../../components/CustomButton';
// import CustomInput  from '../../components/CustomInput';
// import CustomInputMultiple from '../../components/CustomInputMultiple'

// import CustomInputMultiLine from '../../components/CustomInputMultiLine';


import {useNavigation} from '@react-navigation/native';


const SignupScreen = () => { 

    const navigation = useNavigation()

    const [username, setUsername] = useState("Kenneth Ozio Nyave");
    const [email, setEmail] = useState("kennethozio@gmail.com"); 
    const [password, setPassword] = useState("kennethozio");
    const [passwordrepeat, setPasswordRepeat] = useState("kennethozio");
    const [imageURL, setImageURL] = useState("https://www.bootdey.com/img/Content/avatar/avatar2.png") 


    // === Customize Signin Button ==================================================================
    const [buttontext, setButtonText] = useState("Register");
    const [disablebutton, setDisableButton] = useState(false);

    const capitalizeFirstLetters = (text) => { 
      // const text = text.toLowerCase()
      return text.toLowerCase().replace(/(^\w{1})|(\s\w{1})/g, match => match.toUpperCase());
    }
    
    const RegisterButton = async () => { 
        // try {
          if (!username, !email, !password, !passwordrepeat) { alert("All columns must be filled")  }
          else { 
              if (password === passwordrepeat) { 
                if (password.length < 8 ) { alert("Password must be at least 8 characters")  } 
                else { 
                    setButtonText("Signing up. please wait.. ")
                    setDisableButton(true)
                    
                      await createUserWithEmailAndPassword(auth, email, password)
                      .then((userCredential) => {
                          const data = {
                              _id: userCredential?.user.uid, 
                              fullName: capitalizeFirstLetters(username), 
                              profilePic: imageURL, 
                              password: password,
                              providerData: userCredential.user.providerData[0]
                          }

                          setDoc(doc(db, "users", userCredential?.user.uid), data)
                          .then(() => { 
                            setUsername("")
                            setEmail("")
                            setPassword("")
                            setPasswordRepeat("")
                            setButtonText("Register")
                            setDisableButton(false)
                            navigation.replace("DrawerNavprofile") 
                          })  
                    })
                    // }
                  .catch( (error) => { 

                    // const errorCode = error.code;
                    const errorMessage = error.message;
                      alert("Something went wrong\n" + errorMessage)
                      setButtonText("Register")
                      setDisableButton(false)
                    }
                  )
                }
              }
              else { alert( "Password mismatch" ) }
          }      
      }
    
      const BackToSignInButton = () => { 
          navigation.navigate('DrawerNavprofile'); 
          // navigation.goBack()
          setUsername("")
          // setPhoneNumber("")
          // setCode("")
          setEmail("")
          // setAddress("")
          setPassword("")
          setPasswordRepeat("") 
        }
  



    return (
        <ImageBackground source={require('../../../assets/background/createAccount.jpg')} style={styles.backgroundImage} >
          <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.root}>

                  <CustomInput placeholer="Full name"         value={username}        setValue={setUsername}        secureTextEntry={false} />
                  {/* <CustomInput placeholer="Phone number"      value={phonenumber}     setValue={setPhoneNumber}     secureTextEntry={false} keyboardType="numeric"/> */}
                  {/* <CustomInput placeholer="Home address"      value={address}        setValue={setAddress}        secureTextEntry={false} /> */}
                  {/* <CustomInput placeholer="Registration code" value={code}            setValue={setCode}            secureTextEntry={false} /> */}
                  <CustomInput placeholer="Email"             value={email.replace(" ", "")}           setValue={setEmail}           secureTextEntry={false} />
                  <CustomInput placeholer="Password"          value={password.replace(" ", "")}        setValue={setPassword}        secureTextEntry={true} />
                  <CustomInput placeholer="Confirm password"  value={passwordrepeat.replace(" ", "")}  setValue={setPasswordRepeat}  secureTextEntry={true} />

                  {/* <CustomButton text={buttontext}                   onPress={RegisterButton}      type="PRIMARY" disabled={disablebutton} /> */}
                  <CustomButton text={buttontext}                   onPress={RegisterButton}      bgColor="#DDF2D1" fgColor="#285d09" lnColor="#285d09" lnWidth="2"  />
                  <CustomButton text="Registered already? Sign in"  onPress={BackToSignInButton}  fgColor="#2D8729" lnColor="#285d09" lnWidth="2" /> 
                  {/* <CustomButton text="Resend verification email"    onPress={resendVerificationEmailButton}       type='SECONDARY' bgColor="#fae9ea" fgColor="#dd4d44" lnColor="#dd4d44"/>  */}
              </View>
          </ScrollView>
          </ImageBackground>
      )
  }


const styles = StyleSheet.create({
  root: {
    alignItems: "center", 
    padding: 20, 
    marginBottom: 100
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },




}); 



export default SignupScreen;

