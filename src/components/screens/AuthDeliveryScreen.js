import React from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native'

// AWS Amplify modular import
import Auth from '@aws-amplify/auth'

var DeliveryUser;
var User;


// Class for Delivery User Navigation Bar


export default class AuthDeliveryScreen extends React.Component {
  //State for AWS User Token
  state = {
    userToken: null
  }

  //function that will wait until loadApp function is completed to render app
  async componentDidMount () {
    await this.loadApp()
  }



  
  // Function that will get the logged in users, and store them as a session.
  loadApp = async () => {
    await Auth.currentAuthenticatedUser()
    .then(user => {
      this.setState({userToken: user.signInUserSession.accessToken.jwtToken})
      
    })
    .catch(err => console.log(err))
    // Navigation to AuthDelivery in the App.js, 
    this.props.navigation.navigate(this.state.userToken ? 'AuthDelivery' : 'Auth')
    
  }

  // Render
  render() {
    return (
      // Styles container
      <View style={styles.container}> 
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }
}

// Styles 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b44666',
    alignItems: 'center',
    justifyContent: 'center',
  },
})