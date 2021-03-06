//https://medium.com/react-native-training/react-native-firebase-authentication-7652e1d2c8a2

import React from "react";
import { Font } from "expo";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as firebase from "firebase";
export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "Main" : "SignUp");
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
