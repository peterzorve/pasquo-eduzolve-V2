import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ImageBackground } from 'react-native'

// import UserImage from "./assets/user.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerItemList } from "@react-navigation/drawer";

import { NavigationContainer } from '@react-navigation/native';

// import DrawerItem from '@react-navigation/drawer';

import UserImage from '../../assets/user-profile.png'

import CustomButton from '../components/CustomButton'; 


import ContactSupportScreen from './ContactSupportScreen';
import HomepageScreen from './HomepageScreen';
import PastQuestionScreen from './PastQuestionScreen'; 
import TextBooksScreen from './TextBooksScreen';
import MakePaymentScreen from './MakePaymentScreen';
import ProfileAccountScreen from './ProfileAccountScreen';
import MentorScreen from './chats/MentorScreen';
import AddToChatScreen from './chats/AddToChatScreen';

import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();





const DrawerNavprofile = ({route, navigation}) => {  


  const user = useSelector((state) => state.user.user);


  // console.log("=========================================================================================================================================");
  // console.log("1. User Data: ", docSnap.data());
  // console.log("User Information:   ", user );
  // console.log("=========================================================================================================================================");

    // const { username } = route.params; 

    // const SettingsScreen = () => (
    //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //       <Text>Settings Screen</Text>
    //     </View>
    //   );



    const userName = user.fullName 
    const userEmail = user.providerData.uid 
    const profilePic = user.profilePic

      

    const logoutBtn = () => {navigation.replace('SignIn');}

    return (

 
            <Drawer.Navigator  

      
            initialRouteName="Mentor"

            drawerContent={
                (props) => {
                  return (
                    <SafeAreaView>
                      <View
                        style={{
                          height: 180,
                        //   width: '100%',
                          justifyContent: "center",
                          alignItems: "center",
                          borderBottomColor: "#f4f4f4",
                          borderBottomWidth: 5, 
                        //   backgroundColor: "yellow", 
                          margin: 10
                        }}
                      >
                        <Image source={UserImage} style={{  height: 80, width: 80,  borderRadius: 65 }} />
                        <Text style={{ fontSize: 22, marginVertical: 3, fontWeight: "bold", color: "#111" }}> { userName }</Text>
                        <Text style={{ fontSize: 16, color: "#111" }} > {userEmail} </Text>
                        {/* <CustomButton text="Logout"  onPress={logoutBtn}    fgColor="#ee2400"  /> */}
                      </View>
                      <DrawerItemList {...props} />
                    </SafeAreaView>
                  )
                }
              }

            



            screenOptions={{
                // headerShown: false,
                // initialRouteName: "HomeScreen",
                drawerActiveBackgroundColor: "#bcedaf", 
                drawerActiveTintColor: "green",
                drawerItemStyle: {
                    borderWidth: 0.5,
                    borderRadius: 5,
                    borderColor: "#757a73"
                    // margin: 20
                }, 

                

                drawerLabelStyle: {
                  marginLeft: -20,
                  padding: 5,
                  margin: 2, 
                //   borderWidth: 1,
                //   borderRadius: 10
                },
              }}
            > 

                

                <Drawer.Screen 
                    name="ProfileAccount"                
                    component={ProfileAccountScreen}               
                    initialParams={{ params: route.params }}  
                    options={ ({route}) => ({ 
                        
                        title: "Profile Information" ,  
                        drawerIcon: ({focused, color, size}) => (  <Icon name="home-sharp" size={22} color={color} />), 

                    }) }  
                />
  



                <Drawer.Screen 
                    name="HomeScreen"                
                    component={HomepageScreen}               
                    initialParams={{ params: route.params }}  
                    options={ ({route}) => ({ 
                        title: "Home", 
                        drawerIcon: ({focused, color, size}) => (  <Icon name="home-sharp" size={22} color={color} />
                        ), }) }  
                />


                <Drawer.Screen 
                    name="PastQuestions"               
                    component={PastQuestionScreen} 
                    options={ ({route}) => ({ 
                        title: "Past Questions", 
                        drawerIcon: ({focused, color, size}) => (  <Icon name="book" size={22} color={color} />
                        ), })}                   
                />


                <Drawer.Screen 
                    name="TextBooks"               
                    component={TextBooksScreen}              
                    options={ ({route}) => ({ 
                        title: "Text Books", 
                        drawerIcon: ({focused, color, size}) => (  <Icon name="book" size={22} color={color} />
                        ), })}                   
                />

                <Drawer.Screen 
                    name="Mentor"               
                    component={MentorScreen}              
                    options={ ({route}) => ({ 
                        title: "Mentor", 
                        drawerIcon: ({focused, color, size}) => (  <Icon name="book" size={22} color={color} />
                        ), })}                   
                />

                <Drawer.Screen 
                    name="AddToChatScreen"  
                    component={AddToChatScreen} 
                    options={ ({route}) => ({ 
                        title: "Mentor Registration", 
                        drawerIcon: ({focused, color, size}) => (  <Icon name="person-add" size={22} color={color} />
                        ), })}      
                />

                <Drawer.Screen 
                    name="ContactSupport"  
                    component={ContactSupportScreen} 
                    options={ ({route}) => ({ 
                        title: "Contact Support", 
                        drawerIcon: ({focused, color, size}) => (  <Icon name="person-add" size={22} color={color} />
                        ), })}      
                />



                <Drawer.Screen 
                    name="MakePayment"       
                    component={MakePaymentScreen}      
                    options={ ({route}) => ({ 
                        title: "Make Payment", 
                        drawerIcon: ({focused, color, size}) => (  <Icon name="book" size={22} color={color} />
                        ), })}         
                />

                {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
 
                
            </Drawer.Navigator>

  
        );
    }

export default DrawerNavprofile;  

const styles = StyleSheet.create({
    root: {
      // alignItems: "center", 
      padding: 20, 
      marginBottom: 100
    },
  
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', 
    },
  
    paymentText: {
      paddingLeft: 5
    }
  
  
  }); 