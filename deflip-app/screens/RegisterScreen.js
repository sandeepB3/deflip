import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {

  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {

    const user = {
      firstName: fname,
      lastName: lname,
      phone,
      email,
      password,
    }

    try{
      const { data } = await axios.post("http://192.168.13.168:8000/user/signup", user)
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
        style={styles.regImg}
        source={require("../assets/images/register.png")}
      />

      <Text style={styles.register}>Register</Text>
      <TextInput style={styles.input} placeholder="First Name" value={fname} onChangeText={setFName} />
      <TextInput style={styles.input} placeholder="Last Name" value={lname} onChangeText={setLName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Phone No"value={phone} onChangeText={setPhone}  />
      <TextInput style={styles.input} password placeholder="Password" value={password} secureTextEntry={true}
 onChangeText={setPassword}/>

      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerTxt}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginTxt}>Already have a account? Login</Text>
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
  },
  register: {
    fontSize: 25,
    fontWeight: "600",
    letterSpacing: 1,
  },
  regImg: {
    height: "30%",
    width: "80%",
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
  registerBtn: {
    display: "flex",
    backgroundColor: "rgba(60,9,108,1)",
    borderRadius: 25,
    width: "25%",
    marginBottom:10
  },
  registerTxt: {
    fontSize: 15,
    padding: 15,
    color: "white",
    fontWeight: "500",
    textAlign:'center',
  },
  loginTxt:{
    fontSize:15,
    color:"rgba(60,9,108,1)",
  }
});

export default RegisterScreen;
