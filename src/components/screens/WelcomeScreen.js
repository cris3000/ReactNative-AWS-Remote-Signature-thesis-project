//React Imports
import React from 'react'

// React Native Imports
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'

//Class For Welcome Screen, the first page a user will see once app is opened.
export default class WelcomeScreen extends React.Component {

  // Navigation to clicked link
  handleRoute = async (destination) => {
    await this.props.navigation.navigate(destination)
  }
  //Render method
  render() {
    return (

      // Container providing render dimensions of the app
      <View style={styles.container}>
    
        <TouchableOpacity 
        // On Press Button that will Send user to Login page
          onPress={() => this.handleRoute('SignIn')}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
         // On Press Button that will Send user to Register page
          onPress={() => this.handleRoute('SignUp')}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity 
         // On Press Button that will Send user to Forget Password page
          onPress={() => this.handleRoute('ForgetPassword')}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Forget password</Text>
        </TouchableOpacity>
        
      </View>
    )
  }
}
//Stylesheet 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b44666', // #b13366
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    padding: 20,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    color: '#fff'
  }
})