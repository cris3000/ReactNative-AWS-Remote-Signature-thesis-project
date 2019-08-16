//Import React 
import React from 'react'
//Import React Native elements
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
  Modal,
  FlatList,
  Animated,
} from 'react-native'

//Import elements from native base
import {
  Container,
  Item,
  Input} from 'native-base'

// Import AWS Amplify modular Authentication 
import Auth from '@aws-amplify/auth'

// Import the list of country data from Countries file
import data from '../countriesData'


// Country Flag rendering
const defaultFlag = data.filter(
  obj => obj.name === 'United Kingdom'
  )[0].flag

// Country Codes rendering
const defaultCode = data.filter(
  obj => obj.name === 'United Kingdom'
  )[0].dial_code


  // Class for Sign up screen
export default class SignUpScreen extends React.Component {
  // State variables
  state = {
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    flag: defaultFlag,
    authCode: '',
  }
  // Receieve User Input
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }

  
 
  // Signing Up Users with AWS Authentication, 
  async signUp() {
    const { username, password, email, phoneNumber } = this.state
    // Variable to conform with AWS AUTH FIELDS
    const phone_number = phoneNumber
    await Auth.signUp({
      username,
      password,
      attributes: { email, phone_number }
    })
    .then(() => {
      Alert.alert('Provide confirmation code sent to your email address')
    })
    .catch(err => {
      if (! err.message) {
        Alert.alert('Error when signing up: ', err)
      } else {
        Alert.alert('Error when signing up: ', err.message)
      }
    })
  }
  // user confirmation and Re-Direction
  async confirmSignUp() {
    const { username, authCode } = this.state
    await Auth.confirmSignUp(username, authCode)
    .then(() => {
      this.props.navigation.navigate('SignIn')
    })
    .catch(err => {
      if (! err.message) {
        Alert.alert('Wrong Code: ', err)
      } else {
        Alert.alert('Wrong Code: ', err.message)
      }
    })
  }
  // Re-sending the confirmation code if it has not already been received by the user
  async resendSignUp() {
    const { username } = this.state
    await Auth.resendSignUp(username)
    .then(() => console.log('Confirmation code resent successfully'))
    .catch(err => {
      if (! err.message) {
        Alert.alert('Requesting New Code: ', err)
      } else {
        Alert.alert('Requesting New Code: ', err.message)
      }
    })
  }
  // Rendering Page
  render() {
    let { fadeOut, fadeIn, isHidden, flag } = this.state
    const countryData = data
    return (
      <SafeAreaView style={styles.container}>
     
        <KeyboardAvoidingView 
          style={styles.container} 
       
          disabled>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
            
           
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  {/* USER  INPUT  */}
                  <Item style={styles.itemStyle}>
                  
                    <Input
                      style={styles.input}
                      placeholder='Username'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'email-address'}
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      onChangeText={value => this.onChangeText('username', value)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/*  PASSWORD  INPUT  */}
                  <Item style={styles.itemStyle}>
               
                    <Input
                      style={styles.input}
                      placeholder='Password'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      // Password will not be visible to user
                      secureTextEntry={true} 
                      onChangeText={value => this.onChangeText('password', value)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* EMAIL INPUT */}
                  <Item style={styles.itemStyle}>
                    
                    <Input
                      style={styles.input}
                      placeholder='Email'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'email-address'}
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={false}
                      onChangeText={value => this.onChangeText('email', value)}

                    />
                  </Item>
                  <Item style={styles.itemStyle}>
                    <View><Text style={{fontSize: 40}}>{flag}</Text></View>
     
                  
                    <Input
                      style={styles.input}
                      placeholder='+447555555'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'phone-pad'}
                      returnKeyType='done'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref='FourthInput'
                      value={this.state.phoneNumber}
                      onChangeText={(val) => {
                        if (this.state.phoneNumber===''){
                          // UK AreaCode is default
                          this.onChangeText('phoneNumber', defaultCode + val)
                        } else {
                          this.onChangeText('phoneNumber', val)
                        }}
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                    <Modal
                      animationType="slide" 
                      transparent={false}
                      visible={this.state.modalVisible}>
                      <View style={{ flex: 1 }}>
                        <View style={{ flex: 10, paddingTop: 80, backgroundColor: '#5059ae' }}>
                          <FlatList
                            data={countryData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={
                              ({ item }) =>
                                <TouchableWithoutFeedback 
                                  onPress={() => this.getCountry(item.name)}>
                                  <View 
                                    style={
                                      [
                                        styles.countryStyle, 
                                        {
                                          flexDirection: 'row', 
                                          alignItems: 'center',
                                          justifyContent: 'space-between'
                                        }
                                      ]
                                    }>
                                    <Text style={{fontSize: 45}}>
                                      {item.flag}
                                    </Text>
                                    <Text style={{fontSize: 20, color: '#fff'}}>
                                      {item.name} ({item.dial_code})
                                    </Text>
                                  </View>
                                </TouchableWithoutFeedback>
                            }
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => this.hideModal()} 
                          style={styles.closeButtonStyle}>
                          <Text style={styles.textStyle}>
                            Close
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Modal>
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.signUp()}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                  {/* Confirmation Code input box  */}
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
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.confirmSignUp()}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Confirm Sign Up
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.resendSignUp()}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Resend code
                    </Text>
                  </TouchableOpacity>
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
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
 
  itemStyle: {
    marginBottom: 10,
  },

  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#b44666',
    padding: 14,
    marginBottom: 10,
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
    bottom: 270,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textStyle: {
    padding: 5,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  countryStyle: {
    flex: 1,
    backgroundColor: '#5059ae',
    borderTopColor: '#211f',
    borderTopWidth: 1,
    padding: 12,
  },
  closeButtonStyle: {
    flex: 1,
    padding: 12,
    alignItems: 'center', 
    backgroundColor: '#b44666',
  }
})