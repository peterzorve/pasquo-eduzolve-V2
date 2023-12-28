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
import { useSelector } from "react-redux";




const RegisterButton = async () => { }

const ProfileAccountScreen = ( { route } ) => { 

    // const user = route.params
    const user = useSelector((state) => state.user.user); 
    const fullName = user?.fullName
    const userEmail = user?.providerData.uid 


    // console.log("User Information 2:", user)

    return (

      <ImageBackground source={require('../../assets/background/backdround2.jpg')} style={styles.backgroundImage} >

      <ScrollView showsVerticalScrollIndicator={false} >
      <View style={styles.root}>
            <View style={styles.container}>
                    <Text style={styles.nameTitle}>Name</Text>
                    <Text style={styles.nameText}>{fullName}</Text>
            </View>
            <View style={styles.horizontalLine} />     
            <View style={styles.container}>
                    <Text style={styles.nameTitle}>Email</Text>
                    <Text style={styles.nameText}>{userEmail}</Text>
            </View>
            <View style={styles.horizontalLine} />     
            <View style={styles.container}>
                    <Text style={styles.nameTitle}>Phone number</Text>
                    <Text style={styles.nameText}>+358417289032</Text>
            </View>
            <View style={styles.horizontalLine} />   
            <View style={styles.container}>
                    <Text style={styles.nameTitle}>Address</Text>
                    <Text style={styles.nameText}>Accra - Ghana</Text>
            </View>
            <View style={styles.horizontalLine} />     
            <View style={styles.container}>
                    <Text style={styles.nameTitle}>Level</Text>
                    <Text style={styles.nameText}>Junior High School</Text>
            </View>
            <View style={styles.horizontalLine} />     
            <View style={styles.container}>
                    <Text style={styles.nameTitle}>Date registered number</Text>
                    <Text style={styles.nameText}>1st Dec. 2023</Text>
            </View>
            <View style={styles.horizontalLine} />   
            <View style={styles.container}>
                    <Text style={styles.nameTitle}>Referral code</Text>
                    <Text style={styles.nameText}>peterzorve</Text>
            </View>

            <View style={styles.horizontalLine} />  

      </View>
  </ScrollView>
  </ImageBackground>
    );
  }


const styles = StyleSheet.create({
  root: {
    // alignItems: "center", 
    padding: 20, 
    marginBottom: 100,
    // marginTop: 100
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },

  nameTitle: {
    paddingTop: 10,
    paddingLeft: 5, 
    // fontWeight: "bold"
    color: "white"
  },

  nameText: {
    // paddingTop: 10,
    paddingLeft: 5, 
    color: "white",
    fontSize: 18,
    fontWeight: "bold", 
    marginBottom: 15
  }, 

  horizontalLine: {
     height: 3, backgroundColor: '#cccccc' 
  }


}); 



export default ProfileAccountScreen;

