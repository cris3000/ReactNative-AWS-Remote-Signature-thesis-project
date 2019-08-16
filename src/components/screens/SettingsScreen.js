// Import React
import React from 'react'
//import elements from react-native
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert
} from 'react-native'

//import elements from native-base
import {
  Container,
  Item,
  Input
} from 'native-base'

//import icons
import Ionicons from 'react-native-ionicons'

// import AWS Authentication 
import Auth from '@aws-amplify/auth'

// Class for SettingsScreen
export default class SettingsScreen extends React.Component {
  //Old Password, and New Password states
  state = {
    password1: '',
    password2: '',
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  // Change users password for the app if the password is correct, and it will update Cognito with new password without logging user out
  changePassword = async () => {
    const { password1, password2 } = this.state
    await Auth.currentAuthenticatedUser()
    .then(user => {
      return Auth.changePassword(user, password1, password2)
    })
    .then(data => console.log('Password changed successfully', data))
    .catch(err => {
      if (! err.message) {
        Alert.alert('Error: ', err)
      } else {
        Alert.alert('Error: ', err.message)
      }
    })
  }
  // Function to Sign Out of the Application, asks the user if they are sure to sign out i.e. Confirmation Request
  signOutAlert = async () => {
    await Alert.alert(
      'Log Out',
      'Are you sure you want to Log out from the app?',
      [
        {text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel'},
        {text: 'OK', onPress: () => this.signOut()},
      ],
      { cancelable: false }
    )
  }
  //Sign out Function upon Request-Async, Navigates to Authloading component to destroy Session Token, 
  // and clear the Async Storage
  signOut = async () => {
    await Auth.signOut()
    .then(() => {
      this.props.navigation.navigate('Authloading')
    })
    .catch(err => console.log('Error while signing out!', err))
  }
  //Render Function for the screen
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              {/*Infos*/}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <View style={[styles.buttonStyle, {borderRadius: 4, marginBottom: 20}]}>
                    <Text style={styles.buttonText}>Change password</Text>              
                  </View>
                  {/* Old password */}
                  <Item style={styles.itemStyle}>
                 
                    <Input
                      style={styles.input}
                      placeholder='Old password'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      onSubmitEditing={(event) => { this.refs.SecondInput._root.focus() }}
                      onChangeText={value => this.onChangeText('password1', value)}
                    />
                  </Item>    
                  {/* New password */}              
                  <Item style={styles.itemStyle}>
           
                    <Input
                      style={styles.input}
                      placeholder='New password'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='go'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      ref='SecondInput'
                      onChangeText={value => this.onChangeText('password2', value)}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={this.changePassword}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Submit
                    </Text>
                  </TouchableOpacity>
              
                  <View 
                    style={{justifyContent: 'center', alignItems: 'center', marginBottom: 100}}/>
                  <TouchableOpacity
                    style={[styles.buttonStyle, {flexDirection: 'row', justifyContent: 'center'}]}
                    onPress={this.signOutAlert}>
                  <Ionicons 
                      name="md-power" 
                      style={{color: '#fff', marginRight: 10, fontSize: 24}}
                    />
                    
                    <Text style={styles.buttonText}>
                      Sign out
                    </Text>
                    
                  </TouchableOpacity>

        
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

//Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5059ae',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 600,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#5059ae',
  },
  itemStyle: {
    marginTop: 20,
  },
  iconStyle: {
    color: '#fff',
    fontSize: 28,
    marginRight: 15
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#b44666',
    padding: 14,
    marginTop: 20,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
  },
})