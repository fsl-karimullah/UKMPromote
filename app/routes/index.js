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
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLOR_GRAY_SECONDARY, COLOR_PRIMARY} from '../resources/colors';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import DetailShop from '../screens/DetailShop/DetailShop';
import {InterBold} from '../resources/fonts';
import Fav from '../screens/FavScreen/Fav';
import Octicon from 'react-native-vector-icons/Octicons';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import EducationalDetailScreen from '../screens/DetailShop/EducationalDetailScreen';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import NearbyScreen from '../screens/SearchShop/NearbyScreen';
import EducationScreen from '../screens/Education/EducationScreen';
import FundingScreen from '../screens/Funding/FundingScreen';
import FundingDetail from '../screens/Funding/FundingDetail';
import InformationScreen from '../screens/Auth/InformationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ComingSoon from '../screens/ComingSoon/ComingSoon';
import BussinessClass from '../screens/Education/BussinessClass';
import BusinessClassDetail from '../screens/Education/BussinessClassDetail';
import NewsDetails from '../screens/News/NewsDetails';
import ListAllNews from '../screens/News/ListAllNews';
import BussinessAreaScreen from '../screens/BussinessArea/BussinessAreaScreen';
import TemplateWebsiteScreen from '../screens/TemplateWebsiteScreen/TemplateWebsiteScreen';
import MentorScreen from '../screens/Mentors/MentorScreen';
import TermsAndConditions from '../screens/Mentors/TermsAndConditions';
import WebinarScreen from '../screens/Webinars/WebinarScreen';
import WebinarDetailScreen from '../screens/Webinars/WebinarDetailScreen';
import OnlineCourseScreen from '../screens/OnlineCourse/OnlineCourseScreen';
import DetailOnlineCourse from '../screens/OnlineCourse/DetailOnlineCourse';
import PaymentWebView from '../screens/OnlineCourse/PaymentWebview';
import OnlineCourseVideo from '../screens/OnlineCourse/OnlineCourseVideo';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
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
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
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
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
          tabBarIcon: ({color, size}) => (
            <Octicon name="feed-star" color={color} size={size} />
          ),
        }}
        component={Fav}
      />
      <Tab.Screen
        name="BussinessAreaScreen"
        options={{
          headerTitle: 'Halaman Entepreneur Bisnis',
          tabBarLabel: 'Area Pebisnis',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcon name="school" color={color} size={size} />
          ),
        }}
        component={BussinessAreaScreen}
      />
      <Tab.Screen
        name="ProfileScreen"
        options={{
          headerTitle: 'Profile',
          tabBarLabel: 'Profil',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user-circle" color={color} size={size} />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Intro">
      <Stack.Screen
        name="Intro"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{
          headerTitle: 'Buat Akun Baru',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InformationResetPassword"
        component={InformationScreen}
        options={{
          headerTitle: 'Reset Password',
          headerBackVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="Tab"
        component={MainAppStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function MainAppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MyTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailShop"
        component={DetailShop}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EducationalDetail"
        component={EducationalDetailScreen}
        options={{
          headerTitle: 'Edukasi UMKM',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="NearbyScreen"
        component={NearbyScreen}
        options={{
          headerTitle: 'Bisnis Sekitar',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="EducationalScreen"
        component={EducationScreen}
        options={{
          headerTitle: 'Artikel dan Edukasi',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="TemplateWebsiteScreen"
        component={TemplateWebsiteScreen}
        options={{
          headerTitle: 'Pilihan Template',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="MentorScreen"
        component={MentorScreen}
        options={{
          headerTitle: 'Mentor',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{
          headerTitle: 'Syarat & Ketentuan Mentoring',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetails}
        options={{
          headerTitle: 'Detail Berita',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="WebinarDetailScreen"
        component={WebinarDetailScreen}
        options={{
          headerTitle: 'Detail Webinar',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="ListAllNews"
        component={ListAllNews}
        options={{
          headerTitle: 'Artikel dan Blog',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="OnlineCourseScreen"
        component={OnlineCourseScreen}
        options={{
          headerTitle: 'Kelas Online',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="DetailCourseScreen"
        component={DetailOnlineCourse}
        options={{
          headerTitle: 'Detail Kelas',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="OnlineCourseVideo"
        component={OnlineCourseVideo}
        options={{
          headerTitle: 'Belajar Sekarang',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="PaymentWebView"
        component={PaymentWebView}
        options={{
          headerTitle: 'Checkout Kelas',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="WebinarScreen"
        component={WebinarScreen}
        options={{
          headerTitle: 'Webinar & Event',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="FundingDetailScreen"
        component={FundingDetail}
        options={{
          headerTitle: 'Detail Investor',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="ComingSoonScreen"
        component={ComingSoon}
        options={{
          headerTitle: 'Fitur Akan Datang',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="BussinessDetailScreen"
        component={BusinessClassDetail}
        options={{
          headerTitle: 'Kelas Bisnis Detail',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="BussinessVideo"
        component={BussinessClass}
        options={{
          headerTitle: 'Kelas Bisnis',
          headerStyle: {
            backgroundColor: COLOR_PRIMARY,
          },
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  const [isToken, setIsToken] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // console.log('IS tokeNNN', isToken);
    
    const getData = async () => {
      try {
        setIsLoading(true);
        const token = await AsyncStorage.getItem('@userToken');
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

        if (token !== null) {
          setIsToken(token);
        }

        if (isLoggedIn !== null) {
          setIsLoggedIn(isLoggedIn);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isToken === null ? <AuthStack /> : <MainAppStack />}
    </NavigationContainer>
  );
}

export default App;
