import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.loginImg}
        source={require("../assets/images/login.png")}
      />
      <Text style={styles.login}>Login In</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} password placeholder="Password" />
      <TouchableOpacity style={styles.loginBtn} onPress={() => {}}>
        <Text style={styles.loginTxt}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => {}}>
        <Text style={styles.registerTxt}>Do not have a account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    fontSize: 25,
    fontWeight: "600",
    letterSpacing: 1,
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
    fontSize:13,
    color:"rgba(60,9,108,1)",
  }
});

export default LoginScreen;
