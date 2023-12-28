import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ImageBackground } from 'react-native'

import TenetScreen from './ContactSupportScreen';
import HomepageScreen from './HomepageScreen';
import PastQuestionScreen from './PastQuestionScreen'; 
import TextBooksScreen from './TextBooksScreen';
import MakePaymentScreen from './MakePaymentScreen';

const Drawer = createDrawerNavigator();





const DrawerNavprofile2 = ({route, navigation}) => {  

    const user = useSelector((state) => state.user.user);

    return (

            <Drawer.Navigator  

            
            initialRouteName="ContactInformationsAdmin"
            screenOptions={{
                // headerShown: false,
                drawerActiveBackgroundColor: "green",
                drawerActiveTintColor: "white",
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
                    name="ContactInformationsAdmin"  
                    component={TenetScreen} 
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
                
            </Drawer.Navigator>
        );
    }

export default DrawerNavprofile2;  

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