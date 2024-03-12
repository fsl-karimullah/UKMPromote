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
import {InterBold} from '../resources/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../redux/slices/userSlices';
import {useNavigation} from '@react-navigation/native';
import Fav from '../screens/FavScreen/Fav';
import Octicon from 'react-native-vector-icons/Octicons'
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import EducationalDetailScreen from '../screens/DetailShop/EducationalDetailScreen';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import NearbyScreen from '../screens/SearchShop/NearbyScreen';
import EducationScreen from '../screens/Education/EducationScreen';
import FundingScreen from '../screens/Funding/FundingScreen';
import FundingDetail from '../screens/Funding/FundingDetail';
import InformationScreen from '../screens/Auth/InformationScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: heightPercentageToDP(7),
        },
        tabBarActiveTintColor: COLOR_PRIMARY,
        tabBarLabelStyle: {
          marginBottom: 4,
          fontFamily: InterBold,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          headerShown: false,
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color, size}) => (
            <Entypo name="shop" color={color} size={size} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="SearchShopScreen"
        options={{
          headerTitle: 'Explorasi',
          tabBarLabel: 'Explorasi',
          tabBarIcon: ({color, size}) => (
            <MaterialIcon name="explore" color={color} size={size} />
          ),
        }}
        component={SearchShop}
      />
      <Tab.Screen
        name="FavoritesScreen"
        options={{
          headerTitle: 'Favorit',
          tabBarLabel: 'Favorit',
          tabBarIcon: ({color, size}) => (
            <Octicon name="feed-star" color={color} size={size} />
          ),
        }}
        component={Fav}
      />
      <Tab.Screen
        name="FundingScreen"
        options={{
          headerTitle: 'Para Investor Umkm',
          tabBarLabel: 'Pendanaan',
          tabBarIcon: ({color, size}) => (
            <MaterialIcon name="money" color={color} size={size} />
          ),
        }}
        component={FundingScreen}
      />
      <Tab.Screen
        name="ProfileScreen"
        options={{
          headerTitle: 'Profile',
          tabBarLabel: 'Profil',
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
  const userData = useSelector(registerUser);
  const [isLogin, setisLogin] = React.useState(false);

  React.useEffect(() => {
    setisLogin(userData.payload.user.isLogin);
  }, [userData.payload.user.isLogin]);

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
              name="Tab"
              component={MyTabs}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="DetailShop"
              component={DetailShop}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EducationalDetail"
              component={EducationalDetailScreen}
              options={{
                headerTitle: 'Edukasi UMKM',
              }}
            />
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPassword}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="NearbyScreen" 
              component={NearbyScreen}
              options={{
                headerTitle: 'Bisnis Sekitar',
              }}
            />
            <Stack.Screen
              name="EducationalScreen"
              component={EducationScreen}
              options={{
                headerTitle: 'Artikel dan Edukasi',
              }}
            />
            <Stack.Screen
              name="FundingDetailScreen"
              component={FundingDetail}
              options={{
                headerTitle: 'Detail Investor',
              }}
            />
            <Stack.Screen
              name="InformationResetPassword"
              component={InformationScreen}
              options={{
                headerTitle: 'Reset Password',
                headerBackVisible:false,
                headerTitleAlign:'center'
              }}
            />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
