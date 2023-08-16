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

const RegisterScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.regImg}
        source={require("../assets/images/register.png")}
      />
      <Text style={styles.register}>Register</Text>
      <TextInput style={styles.input} placeholder="First Name" />
      <TextInput style={styles.input} placeholder="Last Name" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Phone No" />
      <TextInput style={styles.input} password placeholder="Password" />

      <TouchableOpacity style={styles.registerBtn} onPress={() => {}}>
        <Text style={styles.registerTxt}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.loginTxt}>Already have a account? Login</Text>
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
  register: {
    fontSize: 25,
    fontWeight: "600",
    letterSpacing: 1,
  },
  regImg: {
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
    fontSize:13,
    color:"rgba(60,9,108,1)",
  }
});

export default RegisterScreen;
