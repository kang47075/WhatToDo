import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import AccountScreen from '../screens/AccountScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);


HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const BookmarksStack = createStackNavigator(
  {
    Bookmarks: BookmarksScreen,
  },
  config
);

BookmarksStack.navigationOptions = {
  tabBarLabel: 'Bookmarks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-bookmark' : 'md-bookmark'} />
  ),
};

BookmarksStack.path = '';

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen,
  },
  config
);

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons focused={focused} name='account' size={29} color={focused ? '#4a94d5' : '#cbcbcb'} />
  ),
};

AccountStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  BookmarksStack,
  AccountStack,
});

tabNavigator.path = '';

export default tabNavigator;
