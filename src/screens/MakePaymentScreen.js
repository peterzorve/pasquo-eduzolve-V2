import React, { useEffect,  useState } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ImageBackground } from 'react-native'



// import { auth, app, db } from '../../../firebaseConfig';

// import { addDoc, collection, doc, setDoc, getDoc, getDocs   } from 'firebase/firestore';
// import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";


import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

// import CustomButton from '../../components/CustomButton';
// import CustomInput  from '../../components/CustomInput';
// import CustomInputMultiple from '../../components/CustomInputMultiple'

// import CustomInputMultiLine from '../../components/CustomInputMultiLine';


import {useNavigation} from '@react-navigation/native';



// async function fetchRegistrationCode() {
//     const signup_codes_elder      = [];
//     const signup_codes_deacon     = [];
//     const signup_codes_deaconness = [];
//     const signup_codes_member     = [];
//     try { 
//         const queryElders     = await getDocs(collection(db, "signup_code_elder"));
//         const queryDeacon     = await getDocs(collection(db, "signup_code_deacon"));
//         const queryDeaconness = await getDocs(collection(db, "signup_code_deaconness"));
//         const queryMember     = await getDocs(collection(db, "signup_code_member")); 
//         queryElders.forEach((doc)     => { signup_codes_elder.push( doc.data().code ) })
//         queryDeacon.forEach((doc)     => { signup_codes_deacon.push( doc.data().code ) });
//         queryDeaconness.forEach((doc) => { signup_codes_deaconness.push( doc.data().code ) })
//         queryMember.forEach((doc)     => { signup_codes_member.push( doc.data().code ) })
//         return [signup_codes_elder, signup_codes_deacon, signup_codes_deaconness, signup_codes_member ]
//       }
//     catch (error) {
//         return [signup_codes_elder, signup_codes_deacon, signup_codes_deaconness, signup_codes_member ]
//     }
    
//   } 


const MakePaymentScreen = () => { 

    const navigation = useNavigation()
    // const [username, setUsername] = useState("Peter Zorve");
    const [phonenumber, setPhoneNumber] = useState("");
    // const [address, setAddress] = useState("")
    // const [code, setCode] = useState(""); 
    // const [email, setEmail] = useState("zorvepeter28@gmail.com"); 
    // const [password, setPassword] = useState("zorvepeter28");
    // const [passwordrepeat, setPasswordRepeat] = useState("zorvepeter28");

    // === Customize Signin Button ==================================================================
    const [buttontext, setButtonText] = useState("Pay");
    const [disablebutton, setDisableButton] = useState(false);

    const capitalizeFirstLetters = (text) => { 
      // const text = text.toLowerCase()
      return text.toLowerCase().replace(/(^\w{1})|(\s\w{1})/g, match => match.toUpperCase());
    }
    
    const RegisterButton = async () => { 
        // try {
          if ( !phonenumber) { alert("Invalid phone number")  }
          else { 
            //   if (password === passwordrepeat) { 
                // if (password.length < 8 ) { alert("Password must be at least 8 characters")  } 
                // else { 
                    setButtonText("Registering, please wait.. ")
                //     setDisableButton(true)

                  try {
                    //   const fullname_email = username + " " + phonenumber
                    //   const data = {username: capitalizeFirstLetters(username), phonenumber: phonenumber, email: email,  password: password}   
                      // const userCredential = await createUserWithEmailAndPassword(auth, email, password) 
                      // await setDoc(doc(db, "church_elders", fullname_email), data) 
                      // await setDoc(doc(db, "church_presbytery", fullname_email), data) 
                      // await setDoc(doc(db, "church_members", fullname_email), data) 
                      // const user = userCredential.user;
                      // await sendEmailVerification(user); 
                      // alert("Check your email and verify your account ")
                    //   setUsername("")
                      setPhoneNumber("")
                      // setAddress("")
                      // setCode("")
                    //   setEmail("")
                    //   setPassword("")
                    //   setPasswordRepeat("")
                      setButtonText("Pay")
                      setDisableButton(false)

                    //   console.log(data)
                    }
                  catch (error) { 
                      alert("Something went wrong with the payment. Wait and try again later. ") 
                      setButtonText("Pay")
                      setDisableButton(false)
                    }
                }
        //         }
        //       else { alert( "Password does not match" ) }
        //   }      
      }
    
    //   const BackToSignInButton = () => { 
    //       navigation.navigate('SignIn'); 
    //       setUsername("")
    //       setPhoneNumber("")
    //       // setCode("")
    //       setEmail("")
    //       // setAddress("")
    //       setPassword("")
    //       setPasswordRepeat("") 
    //     }
  



    return (
        <ImageBackground source={require('../../assets/background/backdround1.jpg')} style={styles.backgroundImage} >
          <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.root}>
                
                <View style={styles.container}>
                    <Text style={styles.amountText}>€ 8.00 </Text>
                    <Text style={styles.paymentText}>Enter your mobile money number</Text>
                </View>
                  {/* <CustomInput placeholer="Full name"         value={username}        setValue={setUsername}        secureTextEntry={false} /> */}
                  <CustomInput placeholer="Phone number"      value={phonenumber}     setValue={setPhoneNumber}     secureTextEntry={false} keyboardType="numeric" centerAlign={true} />
                  {/* <CustomInput placeholer="Home address"      value={address}        setValue={setAddress}        secureTextEntry={false} /> */}
                  {/* <CustomInput placeholer="Registration code" value={code}            setValue={setCode}            secureTextEntry={false} /> */}
                  {/* <CustomInput placeholer="Email"             value={email.replace(" ", "")}           setValue={setEmail}           secureTextEntry={false} /> */}
                  {/* <CustomInput placeholer="Password"          value={password.replace(" ", "")}        setValue={setPassword}        secureTextEntry={true} /> */}
                  {/* <CustomInput placeholer="Confirm password"  value={passwordrepeat.replace(" ", "")}  setValue={setPasswordRepeat}  secureTextEntry={true} /> */}

                  {/* <CustomButton text={buttontext}                   onPress={RegisterButton}      type="PRIMARY" disabled={disablebutton} /> */}
                  <CustomButton text={buttontext}                   onPress={RegisterButton}      bgColor="#DDF2D1" fgColor="#285d09" lnColor="#285d09" lnWidth="2"  />
                  {/* <CustomButton text="Registered already? Sign in"  onPress={BackToSignInButton}  fgColor="#2D8729" lnColor="#285d09" lnWidth="2" />  */}
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
    resizeMode: 'cover', 
  },

  paymentText: {
    // paddingLeft: 5
    marginBottom: 10 
  }, 
  amountText: {
    textAlign: "center", 
    color: "red", 
    fontSize:  25, 
    fontWeight: "bold", 
    marginVertical: 10 
  }


}); 



export default MakePaymentScreen;

