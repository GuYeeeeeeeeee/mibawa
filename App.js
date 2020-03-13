import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Home from "./Screen/Home"
import Search from "./Screen/Search"
import Profile from "./Screen/Profile"
import Selection from "./Screen/Selection"
import Login from "./Screen/Login"
import SignUp from "./Screen/SignUp"
import Icon from 'react-native-vector-icons/FontAwesome';
import Featured from "./Screen/Featured"
import Played from "./Screen/Played"
import Settings from './Screen/Settings'
import {createStackNavigator,createBottomTabNavigator} from "react-navigation"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
     <StackNavigator />
    );
  }
}

const BottomStack = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Icon
            name="home"
            size={20}
            focused={focused}
            color={focused ? '#EE5A4E' : 'grey'}
          />
        ),
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
         
        tabBarIcon: ({focused}) => (
          <Icon
            name="search"
            size={20}
            focused={focused}
            color={focused ? '#EE5A4E' : 'grey'}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {

        tabBarIcon: ({focused}) => (
          <Icon
            name="user"
            size={20}
            focused={focused}
            color={focused ? '#EE5A4E' : 'grey'}
          />
        ),
      },
    }
    },
  {
    navigationOptions: ({ navigation }) => {
      const routeParams = navigation.state.params;
      return {
        // tabBarLabel: 'Demo',
        tabBarVisible: routeParams && routeParams.tabBarVisible,
      }
    },
    'lazy': true,
    tabBarPosition: 'bottom',

    swipeEnabled: true,
    animationEnabled: true,
  tabBarPosition:'top',
  
    // tabBarVisible:false,
    tabBarOptions: {
      scrollEnabled: true,
      activeTintColor: '#EE5A4E',
      inactiveTintColor: 'grey',
      showLabel: false,
      style: {
        borderTopWidth: 0,
        pNotiicationsingTop: 3,
        pNotiicationsingBottom: 4,
        elevation:3,
        backgroundColor:'white',
        borderTopWidth:0.5,
        height: 50,
        shadowColor: '#EE5A4E',
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: {width: 0, height: 0},
      },
    },
  },
);
const StackNavigator = createStackNavigator({
  Selection:Selection,
  Login:Login,
  Settings:Settings,
  SignUp:SignUp,
  Home:BottomStack,
  Played:Played,
  Featured:Featured
},{
  navigationOptions:{
    header:null
  }
})

export default App;
