import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Home from '../screens/Homepage/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchShop from '../screens/SearchShop/SearchShop';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLOR_GRAY_SECONDARY, COLOR_PRIMARY} from '../resources/colors';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import DetailShop from '../screens/DetailShop/DetailShop';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
          tabBarStyle: {
            display: 'flex',
            position: 'absolute',
            bottom: 20,
            left: 25,
            right: 25,
            elevation: 5,
            backgroundColor: '#f7f7f7',
            borderRadius: 20,
            height: heightPercentageToDP(7),

          },
          tabBarShowLabel: false,
          tabBarActiveTintColor:COLOR_PRIMARY,
      }}
      >
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Entypo name="shop" color={color} size={size} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="SearchShopScreen"
        options={{
          tabBarShowLabel: false,
          headerTitle: 'Explorasi',

          tabBarIcon: ({color, size}) => (
            <MaterialIcon name="explore" color={color} size={size} />
          ),
        }}
        component={SearchShop}
      />
      <Tab.Screen
        name="ProfileScreen"
        options={{
          tabBarShowLabel: false,
          headerTitle: 'Profile',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user-circle" color={color} size={size} />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Intro"
          options={{
            headerShown: false,
          }}
          component={Login}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={Register}
          options={{
            headerTitle: 'Buat Akun Baru',
          }}
        />
        <Stack.Screen
          name="DetailShop"
          component={DetailShop}
          options={{
            headerTitle:'Detail',
          }}
        />
        <Stack.Screen
          name="Tab"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
