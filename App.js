import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Store from './src/context/store';
import { Provider } from 'react-redux';

// import SplashScreen from './src/screens/setups/SplashScreen'; 

// import SplashScreen from './src/screens/setups/SplashScreen';

import LoginScreen from './src/screens/setups/LoginScreen';
import SignupScreen from './src/screens/setups/SignupScreen';
import DrawerNavprofile from './src/screens/DrawerNavProfile';
import ChatScreen from './src/screens/chats/ChatScreen';

import SplashScreen from './src/screens/setups/SplashScreen';

const Stack = createNativeStackNavigator()

export default function App() { 
    return (
        <NavigationContainer> 
          <Provider  store={Store}>
                <View style={styles.container}>
                    <Stack.Navigator screenOptions={{ headerBackTitle: "Back",   }} initialRouteName="SplashScreen">

                        <Stack.Screen name="SplashScreen"     component={SplashScreen}      options={ ({route}) => ({ title: "Create an account"})} />
                        <Stack.Screen name="SignupScreen"     component={SignupScreen}      options={ ({route}) => ({ title: "Create an account"})} />
                        <Stack.Screen name="LoginScreen"      component={LoginScreen}       options={ ({route}) => ({ title: "Signup Screen",     headerShown: false})} />
                        <Stack.Screen name="DrawerNavprofile" component={DrawerNavprofile}  options={ ({route},) => ({ title: "Create an account", headerShown: false})} />
                        <Stack.Screen name="ChatScreen"       component={ChatScreen}        options={ ({route}) => ({ title: "Create an account", headerShown: false})} />

                    </Stack.Navigator>
                <StatusBar style="auto" />
              </View>
            </Provider>
        </NavigationContainer>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
