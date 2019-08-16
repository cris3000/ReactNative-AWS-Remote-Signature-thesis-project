// Import React
import React from 'react'
//Import Styling elements from React native
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
  Alert,
  Animated
} from 'react-native'
// imports Layout elements from native base
import {
  Container,
  Item,
  Input} from 'native-base'

// Import AWS AUTHENTICATION
import Auth from '@aws-amplify/auth'

//Forgot passward Class
export default class ForgetPasswordScreen extends React.Component {
  //State to hold vars
  state = {
    username: '',
    authCode: '',
    newPassword: '',
    fadeIn: new Animated.Value(0),  // Initial value for opacity: 0
    fadeOut: new Animated.Value(1),  // Initial value for opacity: 1
    isHidden: false
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  // async Function To Request a users New Password
  async forgotPassword() {
    const { username } = this.state
    await Auth.forgotPassword(username)
    .then(data => console.log('New code sent', data))
    .catch(err => {
      if (! err.message) {
        Alert.alert('Error: ', err)
      } else {
        Alert.alert('Error: ', err.message)
      }
    })
  }
  // async Function to Redirect User to Signin Screen once the request has been made
  async forgotPasswordSubmit() {
    const { username, authCode, newPassword } = this.state
    await Auth.forgotPasswordSubmit(username, authCode, newPassword)
    .then(() => {
      this.props.navigation.navigate('SignIn')
    })
    .catch(err => {
      if (! err.message) {
        Alert.alert('Error: ', err)
      } else {
        Alert.alert('Error: ', err.message)
      }
    })
  }
  //Render Function
  render() {
    
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <KeyboardAvoidingView 
          style={styles.container} 
          behavior='padding' 
          enabled 
          keyboardVerticalOffset={23}>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
   
              <View style={styles.logoContainer}>
             
              </View>
              {/* Information */}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  {/* User detail */}
                  <Item style={styles.itemStyle}>
                  
                    <Input
                      style={styles.input}
                      placeholder='Username'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'email-address'}
                      returnKeyType='go'
                      autoCapitalize='none'
                      autoCorrect={false}
                      onChangeText={value => this.onChangeText('username', value)}
                      onFocus={this.fadeOut.bind(this)}
                      onEndEditing={this.fadeIn.bind(this)}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.forgotPassword()}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Send Code
                    </Text>
                  </TouchableOpacity>
                  {/* Section that allows new password,*/}
                  <Item style={styles.itemStyle}>
                  
                    <Input
                      style={styles.input}
                      placeholder='New password'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      onSubmitEditing={(event) => { this.refs.SecondInput._root.focus() }}
                      onChangeText={value => this.onChangeText('newPassword', value)}
                      onFocus={this.fadeOut.bind(this)}
                      onEndEditing={this.fadeIn.bind(this)}
                    />
                  </Item>
                  {/* Section That Confirms the Code Sent two-factor authentication either SMS or Email  */}
                  <Item style={styles.itemStyle}>
                   
                    <Input
                      style={styles.input}
                      placeholder='Confirmation code'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'numeric'}
                      returnKeyType='done'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={false}
                     
                      onChangeText={value => this.onChangeText('authCode', value)}
                    
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.forgotPasswordSubmit()}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Confirm the new password
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
//Styles
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
    position: 'relative',
    left: 0,
    right: 0,
    height: 300,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#5059ae',
  },
  itemStyle: {
    marginBottom: 20,
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
    marginBottom: 20,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 600,
    bottom: 180,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})