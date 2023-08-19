import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import FavouriteScreen from "../screens/Favourite";
import NotificationScreen from "../screens/NotificationScreen";
import ProductDetails from "../screens/ProductDetail";
import OrderHistory from "../screens/OrderHistory";
import OrderDetails from "../screens/OrderDetails";
function BottomNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>

<Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#3C096C",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={30} color="#3C096C" />
            ) : (
              <Ionicons name="home-outline" size={24} color="black" />
            ),
        }}
      />


<Tab.Screen
        name="Misc"
        component={OrderHistory}
        options={{
          tabBarLabel: "Misc",
          tabBarLabelStyle: { color: "#3c096c" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={30} color="#3c096c" />
            ) : (
              <Ionicons name="person-outline" size={30} color="black" />
            ),
        }}
      />






<Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarColor: "#3c096c",
          headerShown: false,
          tabBarLabelStyle: { color: "#3c096c" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="notifications" size={30} color="#3c096c" />
            ) : (
              <Ionicons name="notifications-outline" size={30} color="black" />
            ),
        }}
      />


      
      <Tab.Screen
        name="Favourites"
        component={FavouriteScreen}
        options={{
          tabBarLabel: "Favourites",
          tabBarColor: "#3c096c",
          tabBarLabelStyle: { color: "#3c096c" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="heart" size={30} color="#3c096c" />
            ) : (
              <Entypo name="heart-outlined" size={30} color="black" />
            ),
        }}
      />

      
<Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#3c096c" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={30} color="#3c096c" />
            ) : (
              <Ionicons name="person-outline" size={30} color="black" />
            ),
        }}
      />


   
     
    </Tab.Navigator>
  );
}

export default BottomNavigator;
