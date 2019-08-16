// Import from React
import React from 'react'
//Import Elements from React Native
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native'

//Import from native base
import {
  Container,
  Item,
  Input
} from 'native-base'

// Import AWS Amplify Authentication 
import Auth from '@aws-amplify/auth'

// Class for Signing into the app navigated from the welcomescreen
export default class SignInScreen extends React.Component {
  //State to store username and password for the user
  state = {
    username: '',
    password: '',

  }
  
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  // AWS AUthentication Sign-In
  async signIn() {
    const { username, password } = this.state
    await Auth.signIn(username, password)
    .then(user => {
      this.setState({ user })
      this.props.navigation.navigate('Authloading')
    })
    .catch(err => {
      if (! err.message) {
        Alert.alert('Error: ', err)
      } else {
        Alert.alert('Error: ', err.message)
      }
    })
  }

  // Render Function
  render() {
   
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
          <TouchableWithoutFeedback 
            style={styles.container} 
            onPress={Keyboard.dismiss}>
            <View style={styles.container}>
           
             
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <Item style={styles.itemStyle}>
               
                    <Input
                      style={styles.input}
                      placeholder='Username'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'email-address'}
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                       // On submit/Enter, the cursor will move to the next field
                      onSubmitEditing={(event) => {this.refs.SecondInput._root.focus()}}
                      onChangeText={value => this.onChangeText('username', value)}
                     
                    />
                  </Item>
                  <Item style={styles.itemStyle}>
                  
                    <Input
                      style={styles.input}
                      placeholder='Password'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='go'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      ref='SecondInput'
                      onChangeText={value => this.onChangeText('password', value)}
                 
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.signIn()}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Sign In
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
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 200,
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
    fontSize: 30,
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
    height: 400,
    bottom: 180,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})