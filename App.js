// React Import

import React from 'react';
import firebase from 'react-native-firebase';
// React Native Imports
import { View, TouchableOpacity,Platform, StyleSheet, Alert, AsyncStorage } from 'react-native'

//React Navigation Imports
import { 
  createSwitchNavigator, 
  createStackNavigator ,
  createDrawerNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation'

//Icons imports
import Ionicons from 'react-native-ionicons'

// Auth stack screen imports
import AuthLoadingScreen from './src/components/screens/AuthLoadingScreen'
import WelcomeScreen from './src/components/screens/WelcomeScreen'
import SignUpScreen from './src/components/screens/SignUpScreen'
import SignInScreen from './src/components/screens/SignInScreen'
import ForgetPasswordScreen from './src/components/screens/ForgetPasswordScreen'
import AuthDeliveryScreen from './src/components/screens/AuthDeliveryScreen'

// App stack screen imports
import HomeScreen from './src/components/screens/HomeScreen'
import SettingsScreen from './src/components/screens/SettingsScreen'
import ProfileScreen from './src/components/screens/ProfileScreen'
import Fingerprint from './src/components/screens/Fingerprint'
import UserDetails from './src/components/screens/UserDetails'
import AcceptButton from './src/components/screens/AcceptButton'
//import Update from './src/components/screens/Update'

// DeliveryUser

import HomeScreenDelivery from './src/components/screens/HomeScreenDelivery'
import DeliveryList from './src/components/screens/DeliveryList'
import Map from './src/components/screens/Map'
import AddDelivery from './src/components/screens/AddDelivery'
import ResponsePage from './src/components/screens/ResponsePage'
// Amplify imports and config
import Amplify,{ API } from '@aws-amplify/core'
import config from './src/aws-exports'
Amplify.configure(config)
import { Auth } from "aws-amplify";



// Screens for Delivery user
const configurationsDelivery = {
  Home: {
    
    screen: HomeScreenDelivery,
    navigationOptions: {
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-home" />
      )
    }
  },
  // Profile: {
  //   screen: ProfileScreen,
  //   navigationOptions: {
  //     tabBarLabel: 'Profile',
  //     tabBarIcon: ({tintColor}) => (
  //       <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-person" />
  //     )
  //   }
  // },

  Add: {
    screen: AddDelivery,
    navigationOptions: {
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-settings" />
      )
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-settings" />
      )
    }
  },
  Deliveries: {
    screen: DeliveryList,
    navigationOptions: {
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-car" />
       )
     }
    }, 
    Response: {
      screen: ResponsePage,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-checkbox" />
         )
       }
      }, 
/* Update: {
  screen: Update,
  navigationOptions: {
    tabBarLabel: 'Update Details',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-settings" />
     )
   }
  },*/
  Map: {
  screen: Map,
  navigationOptions: {
    tabBarLabel: ' ',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-map" />
     )
   }
  }, 
}


// Configurations for Customer user
const configurationsCustomer = {
  Home: {
    
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-home" />
      )
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: ' ',
      tabBarIcon: ({tintColor}) => (
        <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-person" />
      )
    }
  },

  UserDetails: {
    screen: UserDetails,
    navigationOptions: {
      tabBarLabel: ' ',
      tabBarIcon: ({tintColor}) => (
        <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-person" />
      )
    }
  },
  
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-settings" />
      )
    }
  },  Decision: {
    screen: AcceptButton,
    navigationOptions: {
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-radio-button-on" />
      )
    }
  },
  Fingerprint: {
    screen: Fingerprint,
    navigationOptions: {
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-finger-print" />
      )
    }
  },
  // Deliveries: {
  //   screen: DeliveryList,
  //   navigationOptions: {

  //     tabBarIcon: ({ tintColor }) => (
  //       <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-settings" />
  //      )
  //    }
  //   }, 
/* Update: {
  screen: Update,
  navigationOptions: {
    tabBarLabel: 'Update Details',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-settings" />
     )
   }
  },*/
  // Map: {
  // screen: Map,
  // navigationOptions: {
  //   tabBarLabel: 'Map',
  //   tabBarIcon: ({ tintColor }) => (
  //     <Ionicons style={{fontSize: 26, color: tintColor}} name="ios-settings" />
  //    )
  //  }
  // }, 
  }


// Styles for the navigation options
const options = {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  navigationOptions: {
    tabBarVisible: true
  },
  tabBarOptions: {
    showLabel: true,
    activeTintColor: '#fff',
    inactiveTintColor: '#fff9',
    style: {
      backgroundColor: '#f16f69',
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 12,
      marginTop:12,
    },
    indicatorStyle: {
      height: 0,
    },
    showIcon: true,
  }
}

// Tabs displaying at the bottom of the app, to allow the user to navigate without menu bar
//Customer
const AppTabNavigator = createMaterialTopTabNavigator(configurationsCustomer, options)

// // Creation of Dynamic Header title 
AppTabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index]
  let headerTitle = routeName
  return {
    headerTitle,
  }
}

//Delivery Tab Navigator

const AppTabNavigatorDelivery = createMaterialTopTabNavigator(configurationsDelivery, options)

// // Creation of Dynamic Header title 
AppTabNavigatorDelivery.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index]
  let headerTitle = routeName
  return {
    headerTitle,
  }
}

// AppStackNavigator Var that will display the header, BurgerMenu Icon, and left movement
const AppStackNavigator = createStackNavigator({
  Header: {
    screen: AppTabNavigator,
    // Set the header icon
    navigationOptions: ({navigation}) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{paddingHorizontal: 10}}>
            <Ionicons size={24} name="md-menu" />
          </View>
        </TouchableOpacity>
      )
    })
  }    
})



// AppStackNavigator Var that will display the header, BurgerMenu Icon, and left movement--Delivery
const AppStackNavigatorDelivery = createStackNavigator({
  Header: {
    screen: AppTabNavigatorDelivery,
    // Set the header icon
    navigationOptions: ({navigation}) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{paddingHorizontal: 10}}>
            <Ionicons size={24} name="md-menu" />
          </View>
        </TouchableOpacity>
      )
    })
  }    
})

// App Customer Drawerstack for the burger-menu which opens as a side-drawer
const AppDrawerNavigator = createDrawerNavigator({
  Tabs: AppStackNavigator, // defined above
  Home: HomeScreen,
  Profile: ProfileScreen,
  Settings: SettingsScreen,
  // Fingerprint:Fingerprint,
  UserDetails:UserDetails,
  Button:AcceptButton
})
// App Delivery Drawerstack for the burger-menu which opens as a side-drawer
const AuthDeliveryStackNavigator = createDrawerNavigator({
  Tabs: AppStackNavigatorDelivery, // defined above
  Home: HomeScreenDelivery,
  Deliveries: DeliveryList,
  Settings: SettingsScreen,
  Map: Map,
  AddDelivery: AddDelivery,
  Response:ResponsePage,
  
})


// Authentication Stack Navigator, showing the pages available to unauthenticated users

const AuthStackNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      title: `Remote Signature App `, // for the header screen
      headerBackTitle: 'Back'
    }),
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: `Create a new account`,
    }),
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Log in to your account`,
    }),
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: `Create a new password`,
    }),
  },
})





export default createSwitchNavigator({

  Authloading: AuthLoadingScreen,

 // Authentication stack navigator that will redirect to login page if failed
  Auth: AuthStackNavigator,

  //Delivery User stack navigator
  AuthDelivery: AuthDeliveryStackNavigator, 
  
  // Customer User stack navigator
  App: AppDrawerNavigator, 
  

   
})
