import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try{
      const { data } = await axios.post("http://localhost:4000/user/signin", {email, password})
      console.log(data);
      const token = data.token;
      AsyncStorage.setItem("authToken", token);
      navigation.replace("Main");

    }catch(err){
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>

      <Image
        style={styles.logo}
        source={require("../assets/images/chainkart.png")}
      />

      <Image
        style={styles.loginImg}
        source={require("../assets/images/login.png")}
      />
      <Text style={styles.login}>Login In</Text>

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>
      <TextInput style={styles.input} password placeholder="Password" value={password} secureTextEntry={true}
 onChangeText={setPassword}/>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginTxt}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerTxt}>Do not have a account? Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  logo: {
    height: "17.95%",
    width: "80%",
    resizeMode: "contain",
  },
  login: {
    fontSize: 25,
    fontWeight: "600",
    letterSpacing: 1,
    marginTop: 10
  },
  loginImg: {
    height: "30%",
    width: "100%",
    resizeMode: "contain",
    // backgroundColor:'black',
  },
  input: {
    width: "75%",
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    fontSize: 15,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.3)',
  },
  loginBtn: {
    display: "flex",
    backgroundColor: "rgba(60,9,108,1)",
    borderRadius: 25,
    width: "25%",
    marginBottom:10
  },
  loginTxt: {
    fontSize: 15,
    padding: 15,
    color: "white",
    fontWeight: "500",
    textAlign:'center',
  },
  registerTxt:{
    fontSize:16,
    color:"rgba(60,9,108,1)",

  }
});

export default LoginScreen;
