import React from 'react'
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

import {
  Container,
  Item,
  Input
} from 'native-base'

import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";

import Ionicons from 'react-native-ionicons'

import Amplify, { API , graphqlOperation} from 'aws-amplify';



// Class for Profile Screen for customer user
export default class ProfileScreen extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    streetAddress:'',
    city:'',
    postcode:'',
    input: "",
  }
  
  // Update DB table with GRAPHQL function
  updateUserInformation= async () => {
    try {
        const info  = {
            // quote: this.state.quotes, 
            // ass: this.state.name,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            streetAddress: this.state.streetAddress,
            city:this.state.city,
            postcode: this.state.postcode,
            

        }
        this.setState({firstName:"" });
        this.setState({lastName: ""});
        this.setState({streetAddress:"" });
        this.setState({city: ""});
        this.setState({postcode:"" });
    

        
        // await API.graphql(graphqlOperation(mutations.createTodo,{input, name: object}))
       await API.graphql(graphqlOperation(mutations.updateUserInformation, {input: info}));
    } catch (err) {
        console.error(err);
    }
}

// Add information to DB
  addUserInformation = async () => {
    try {
        const info  = {
            
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          streetAddress: this.state.streetAddress,
          city:this.state.city,
          postcode: this.state.postcode,
            

        }
        this.setState({firstName:"" });
        this.setState({lastName: ""});
        this.setState({streetAddress:"" });
        this.setState({city: ""});
        this.setState({postcode:"" });
    
        // await API.graphql(graphqlOperation(mutations.createTodo,{input, name: object}))
       await API.graphql(graphqlOperation(mutations.createUserInformation, {input: info}));
    } catch (err) {
        console.error(err);
    }
}
  
 
  render() {
    return (
      
        <KeyboardAvoidingView style={styles.container} enabled>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              {/*Infos*/}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                         
                  

                  <Item style={styles.itemStyle}>
                 
                    <Input
                      style={styles.inputx}
                      placeholder='First Name'
                      placeholderTextColor='#adb4bc'
                      type="text" 
                      value={this.state.firstName}
                      onChangeText={(text) => this.setState({ firstName: text })}
                
                    />
                  </Item>
                  <Item style={styles.itemStyle}>
                 
                 <Input
                   style={styles.inputx}
                   placeholder='Last Name'
                   type="text" 
                   placeholderTextColor='#adb4bc'
                   value={this.state.lastName}
                   onChangeText={(text) => this.setState({ lastName: text })}
                 />
               </Item> 
               <Item style={styles.itemStyle}>
                 
                 <Input
                   style={styles.inputx}
                   placeholder='Street Address'
                   type="text" 
                   placeholderTextColor='#adb4bc'
                   value={this.state.streetAddress}
                   onChangeText={(text) => this.setState({ streetAddress: text })}
                 />
               </Item> 
               <Item style={styles.itemStyle}>
                 
                 <Input
                   style={styles.inputx}
                   type="text" 
                   placeholder='City'
                   placeholderTextColor='#adb4bc'
                   value={this.state.city}
                   onChangeText={(text) => this.setState({ city: text })}
                 />
               </Item> 
               <Item style={styles.itemStyle}>
                 
                 <Input
                   style={styles.inputx}
                   type="text" 
                   placeholder='Post Code'
                   placeholderTextColor='#adb4bc'
                   value={this.state.postcode}
                   onChangeText={(text) => this.setState({ postcode: text })}
                 />
               </Item> 
               <Item style={styles.itemStyle}>
                 
               
                  <TouchableOpacity 
                  
                  onPress={this.addUserInformation} 
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Submit
                    </Text>
                  </TouchableOpacity>
              
                 </Item>
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5059ae',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  inputx: {
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
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
  },
})