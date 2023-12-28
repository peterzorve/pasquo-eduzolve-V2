import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'


// import DrawerNavigationHome from '../admin_home/DrawerNavigationHome'; 
// import LoginScreen  from './LoginScreen';
// import SalesScreen  from './SalesScreen';
// import StocksScreen from './StocksScreen';

import PasQuoSecAScreen from './PasQuoSecAScreen';
import PasQuoSecBScreen from './PasQuoSecBScreen';
// import PasQuoSecCScreen from './PasQuoSecCScreen';


const Tab = createBottomTabNavigator();


const PastQuestionScreen = () => {
    // const route = useRoute(); 
    // const firstname = route.params.firstname
    // const lastname  = route.params.lastname 
    
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarActiveTintColor: "red",
                headerShown: false, 
                tabBarIcon: ({color, size, focused}) => {
                    let iconName;
                    if      (route.name === "Section A")  { iconName = focused ? 'home-sharp' : 'home-outline'; } 
                    else if (route.name === "Section B")  { iconName = focused ? 'settings'   : 'settings-outline'; } 
                    // else if (route.name === "Section C") { iconName = focused ? 'wallet'     : 'wallet-outline'; } 
                    // else if (route.name === "Stats")  { iconName = focused ? 'settings'   : 'settings-outline'; }
                    return <Icon name={iconName} size={28} color={color} />;

                }
            })}
        >   
            <Tab.Screen name="Section A"    component={PasQuoSecAScreen} title="SecA" />
            <Tab.Screen name="Section B"    component={PasQuoSecBScreen} title="SecB" />
            {/* <Tab.Screen name="Section C"    component={PasQuoSecCScreen} title="SecC" /> */}
            {/* <Tab.Screen name="Stats"      component={LoginScreen} title="Sales" /> */}


        </Tab.Navigator>
    ); 
    }

export default PastQuestionScreen;