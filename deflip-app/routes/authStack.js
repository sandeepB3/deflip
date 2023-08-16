import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";


const screens = {
    WelcomeScreen: {
        screen: WelcomeScreen,
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
};

const authStack = createStackNavigator(screens);

export default createAppContainer(authStack);