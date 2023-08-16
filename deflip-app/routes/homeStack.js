import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import WelcomeScreen from "../screens/WelcomeScreen";
import RedeemScreen from "../screens/RedeemScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import TransactionScreen from "../screens/TransactionScreen";



const screens = {
  // Homepage: {
  //   screen: Home,
  //   navigationOptions: {
  //     headerShown: false,
  //   },  
  // },
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RedeemScreen: {
    screen: RedeemScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  CartScreen: {
    screen: CartScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  TransactionScreen: {
    screen: TransactionScreen,
    navigationOptions: {
      headerShown: false,
    },
  },

};


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);