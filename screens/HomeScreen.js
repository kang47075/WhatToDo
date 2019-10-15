import { SearchBar } from "react-native-elements";
import React, { Component } from "react";
import * as firebase from "firebase";
import { Font } from "expo";
import { StackActions } from "react-navigation";

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  FlatList,
  ActivityIndicator
} from "react-native";

import { MonoText } from "../components/StyledText";
import { AppLoading } from "expo";
import { whileStatement } from "@babel/types";

export const CustomButton = props => {
  const { title = "Enter", style = {}, textStyle = {}, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default class HomeScreen extends React.Component {
  state = {
    categories: [],
    loaded: false
  };
  componentDidMount() {
    const currentUser = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`Category`)
      .orderByChild("Index")
      .on("value", snapshot => {
        var categories = [];
        snapshot.forEach(child => {
          categories.push({
            id: child.key,
            icon: child.val().Icon
          });
        });
        this.setState({ categories, loaded: true });
      });
  }
  handlelogout = () => {
    firebase.auth().signOut();
  };
  renderItem = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => this.onPressItem(item.id)}
      >
        <Image
          source={{ uri: item.icon }}
          style={styles.gridIcon}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
    );
  };
  onPressItem = id => {
    this.props.navigation.push("Categories", {
      id,
      navigation: this.props.navigation
    });
  };

  render() {
    console.log(this.state.categories);
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={require("../assets/images/what2domeme.png")}
              style={styles.welcomeImage}
            />
          </View>
          <SearchBar
            inputStyle={{ backgroundColor: "white", fontSize: 15 }}
            containerStyle={{
              backgroundColor: "transparent",
              borderBottomColor: "transparent",
              borderTopColor: "transparent"
            }}
            placeholder="  Search here..."
            onChangeText={text => {
              console.log(text);
            }}
            style={styles.search}
            onPressCancel={() => {
              this.filterList("");
            }}
            onPress={() => alert("onPress")}
          />
          <View style={styles.container2}>
            {!this.state.loaded ? (
              <ActivityIndicator size="large" color="blue" />
            ) : (
              <FlatList
                style={styles.grid}
                renderItem={this.renderItem}
                numColumns={2}
                data={this.state.categories}
              />
            )}
            <CustomButton
              onPress={this.handlelogout}
              title="Login"
            ></CustomButton>
          </View>
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff3950"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 0,
    marginBottom: 0
  },
  welcomeImage: {
    width: 300,
    height: 100,
    resizeMode: "contain",
    marginTop: 0,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  grid: {
    width: "100%",
    alignSelf: "stretch"
  },
  gridItem: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 30,
    marginTop: 20,
    borderWidth: 0,
    width: "50%"
  },
  gridIcon: {
    width: "100%",
    height: 100
  },
  button: {
    display: "flex",
    height: 30,
    width: 300,
    alignSelf: "center",
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2b3039",
    shadowColor: "#c7c7c7",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20
  },
  customButton: {
    color: "white",
    fontSize: 12
  },
  container2: {
    backgroundColor: "white",
    flex: 2
  }
});
