import React, {useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ImageBackground } from 'react-native'
// import Logo from "../../../assets/images/cop.gif"
import { useRoute } from '@react-navigation/native'

// import { addDoc, collection, doc, setDoc, getDoc, getDocs   } from 'firebase/firestore';
// import { auth, app, db } from '../../../firebaseConfig';

import CustomButton from '../components/CustomButton'

// import CustomButton from '../../components/CustomButton' 
// import CustomInput  from '../../components/CustomInput'

import {useNavigation} from '@react-navigation/native';

import * as Font from 'expo-font';

import { useSelector } from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Linking } from 'react-native';


const HomepageScreen = (  ) => {

    const user = useSelector((state) => state.user.user); 
    const fullName = user?.fullName
    const userEmail = user?.providerData.uid 

    const {height} = useWindowDimensions()
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [userCredential, setUserCredential] = useState([{"email": "", "password": "", "phonenumber": "", "status": "", "username": ""}])


    // useEffect(() => {
    //   Font.loadAsync({
    //     'LibreBaskerville-Bold':    require('../../assets/fontfamily/LibreBaskerville-Bold.ttf'),
    //     'LibreBaskerville-Italic':  require('../../assets/fontfamily/LibreBaskerville-Italic.ttf'),
    //     'LibreBaskerville-Regular':    require('../../assets/fontfamily/LibreBaskerville-Regular.ttf'),
    //   });
    // }, []);




    const LogoutBtn = async () => { navigation.replace('LoginScreen'); } 



    return (
      <ImageBackground source={require('../../assets/background/image1.jpg')} style={styles.backgroundImage} >

        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.root}>

                <View style={styles.flatlist_view}>
                      {/* <Text style={ styles.flatlist_title }>Akumadan Gilgah - English Assembly</Text> */}
                      <Text style={ styles.flatlist_subtitle1 }>{fullName} </Text>
                      {/* <Text style={ styles.flatlist_description }> +358417289032  </Text> */}
                      {/* <Text style={ styles.flatlist_description }> {userEmail} </Text> */}
                </View>

                <View style={styles.theme_view}>
                      <Text style={styles.title}>EduZolve Educational Platform</Text>
                      <Text style={styles.theme}>We are commited to helping students and young preofesionals in their academic. </Text>
                      <Text style={styles.theme}>We provide you with the best study materials.  </Text>
                      <Text style={styles.themeText}>Training the next generation of students and young professionals</Text>

                      <TouchableOpacity onPress={() => {Linking.openURL("https://www.eduzolve.com/");}}>
                        <Text style={styles.readMore}>Read More ... </Text>
                      </TouchableOpacity>
                </View>
                {/* <CustomButton text="Logout" onPress={LogoutBtn}       type='SECONDARY' bgColor="#fae9ea" fgColor="#dd4d44" lnColor="#fae9ea"/> */}
                <CustomButton text="Logout"  onPress={LogoutBtn}                       bgColor="#fae9ea" fgColor="#dd4d44" lnColor="#fae9ea" lnWidth="1"  />

            </View>
        </ScrollView>
      </ImageBackground>
    )
  }

const styles = StyleSheet.create({ 
  root:  { alignItems: "left", padding: 20,  marginBottom: 50  },

  readMore: {
    fontSize: 16, 
    color: "red", 
    padding: 5, 

  },
  
  title: { 
    fontSize: 19,  
    margin: 5,    
    color: "blue",  
    fontWeight: 'bold', 
    marginTop: 2, 
    // fontFamily: 'LibreBaskerville-Bold',
    // fontWeight: "bold"
  },


  theme: {fontSize: 14, marginLeft: 5, color: "black", margin:4}, 
  themeText: {marginLeft: 5, marginBottom: 15, fontSize: 13, fontWeight: "bold", marginTop:5}, 
  subTitle1: { fontSize: 18,  margin: 10,    color: "red",  fontWeight: 'bold', marginTop: 2  },

  
  flatlist_view: {
    padding: 12,
    alignItems: 'left', 
    width: "100%",
    minWidth: "100%",
    backgroundColor: "#F8FFFF",
    marginVertical: 5,
    borderColor: "#ffffff", 
    borderWidth: 1,
    borderRadius: 8,
    },

    theme_view: {
      padding: 6,
      alignItems: 'left', 
      width: "100%",
      minWidth: "100%",
      backgroundColor: "#fae9ea",
      marginVertical: 5,
      borderColor: "#ffffff", 
      borderWidth: 1,
      borderRadius: 8,
      },

    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch' or 'contain'
      // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },

flatlist_title: {
    fontSize: 16, 
    paddingLeft: 4, 
    paddingTop: 1,
    paddingBottom: 8,
    color: "red",
    fontWeight: "bold", 
  },

flatlist_subtitle1: {
      fontSize: 17, 
      paddingLeft: 4, 
      paddingTop: 8, 
      paddingBottom: 4,
      fontWeight: "bold", 


    },

flatlist_description: {
      fontSize: 14, 
      paddingLeft: 4, 
      paddingTop: 4, 

  }, 
}); 


export default HomepageScreen;   