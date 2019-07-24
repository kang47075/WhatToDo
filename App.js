import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppNavigator from "./navigation/AppNavigator";

import { createSwitchNavigator, createAppContainer } from "react-navigation";
// import the different screens
import Loading from "./screens/Loading";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import Main from "./screens/Main";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAHV3P2L3tquFM8B5NkU_J-HsR4MGW76qo",
  authDomain: "whattodo-e3e8d.firebaseapp.com",
  databaseURL: "https://whattodo-e3e8d.firebaseio.com",
  storageBucket: ""
};

firebase.initializeApp(firebaseConfig);
const App = createAppContainer(
  createSwitchNavigator(
    {
      Loading,
      SignUp,
      Login,
      Main
    },
    {
      initialRouteName: "Loading"
    }
  )
);

export default App;
// export default function App(props) {
//   const [isLoadingComplete, setLoadingComplete] = useState(false);

//   if (!isLoadingComplete && !props.skipLoadingScreen) {
//     return (
//       <AppLoading
//         startAsync={loadResourcesAsync}
//         onError={handleLoadingError}
//         onFinish={() => handleFinishLoading(setLoadingComplete)}
//       />
//     );
//   } else {
//     return (
//       <View style={styles.container}>
//         {Platform.OS === "ios" && <StatusBar barStyle="default" />}
//         <AppNavigator />
//       </View>
//     );
//   }
// }

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png")
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
