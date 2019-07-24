import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

// import the different screens
import MainTabNavigator from "./MainTabNavigator";
import Loading from "../screens/Loading";
import SignUp from "../screens/SignUp";
import Login from "../screens/Login";

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Main: MainTabNavigator,
      Loading,
      SignUp,
      Login
    },
    {
      initialRouteName: "Loading"
    }
  )
);
