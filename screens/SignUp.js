//https://medium.com/react-native-training/react-native-firebase-authentication-7652e1d2c8a2

import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";
import Loading from "./Loading";
import * as Font from "expo-font";
import { whileStatement } from "@babel/types";

export const CustomButton = props => {
  const { title = "Enter", style = {}, textStyle = {}, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};
export default class SignUp extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("Main"))
      .catch(error => this.setState({ errorMessage: error.message }));
    console.log("handleSignUp");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signup}>Sign Up</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="  Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="  Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <CustomButton title="Sign up" onPress={this.handleSignUp} />
        <CustomButton
          onPress={() => this.props.navigation.navigate("Login")}
          title="Already have an account? Login"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff3950",
    justifyContent: "center",
    alignItems: "center"
  },
  signup: {
    fontSize: 20,
    color: "white"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  },
  button: {
    marginTop: 20,
    display: "flex",
    height: 50,
    width: 250,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    shadowColor: "#c7c7c7",
    shadowOpacity: 0.2,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20
  },
  text: {
    fontSize: 15,
    color: "white"
  }
});
