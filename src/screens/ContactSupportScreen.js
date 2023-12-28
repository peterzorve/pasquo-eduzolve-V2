import React, { useEffect,  useState } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ImageBackground } from 'react-native'



// import { auth, app, db } from '../../../firebaseConfig';

// import { addDoc, collection, doc, setDoc, getDoc, getDocs   } from 'firebase/firestore';
// import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";


import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomInputMultiLine from '../components/CustomInputMultiLine';

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


const ContactSupportScreen = () => { 

    const navigation = useNavigation()

    const [message, setMessage] = useState("");
    // const [address, setAddress] = useState("")
    // const [code, setCode] = useState(""); 
    // const [email, setEmail] = useState("zorvepeter28@gmail.com"); 
    // const [password, setPassword] = useState("zorvepeter28");
    // const [passwordrepeat, setPasswordRepeat] = useState("zorvepeter28");

    // === Customize Signin Button ==================================================================
    const [buttontext, setButtonText] = useState("Send");
    const [disablebutton, setDisableButton] = useState(false);

    
    const RegisterButton = async () => { 
        // try {
          if ( !message) { alert("Invalid phone number")  }
          else { 
            setButtonText("Sending message, please wait.")
            setDisableButton(true)
            try {
                // Handle submit code here 
                setMessage("")
                setButtonText("Send")
                setDisableButton(false)
            }
            catch (error) { 
                alert("Something went wrong. Try again later.") 
                setButtonText("Send")
                setDisableButton(false)
            }
        }    
      }
    
    return (
        <ImageBackground source={require('../../assets/background/backdround17.jpg')} style={styles.backgroundImage} >
          <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.root}>
                
                <View style={styles.container}>
                    <Text style={styles.messageTitle}>You concern will be addressed as soon as possible. It takes 1-3 working days to get a reply from the support time. </Text>
                </View>

                  <CustomInputMultiLine placeholer="Message"      value={message}     setValue={setMessage}     secureTextEntry={false} minHeight={100} />
                  <CustomButton text={buttontext}                   onPress={RegisterButton}      bgColor="#DDF2D1" fgColor="#285d09" lnColor="#285d09" lnWidth="2" btnLength="85%" />

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

  messageTitle: {
    paddingLeft: 5
  }


}); 



export default ContactSupportScreen;

  