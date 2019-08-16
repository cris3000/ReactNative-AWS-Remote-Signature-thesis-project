import React, { Component } from 'react';
import HomeScreen from './HomeScreen'
import Testapp from '../../../pushNotification';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
  DeviceEventEmitter,
  ViewPropTypes,
  StyleSheet,
  Button
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";

import Ionicons from 'react-native-ionicons'

import Amplify, { API , graphqlOperation} from 'aws-amplify';


 
class Fingerprint extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
      response : '',
      status: 'Scan Your Fingerprint',
      
    }
  }
 //addOrderDetail = async () => {
  //////////////
  addOrderDetail = async () => {
    try {
   
        const info  = {
            // quote: this.state.quotes, 
            // ass: this.state.name,
            AcceptedDelivery: this.state.response,
            
        }
   
// alert('7');
        // await API.graphql(graphqlOperation(mutations.createTodo,{input, name: object}))
       await API.graphql(graphqlOperation(mutations.createUserInformation, {input: info}));
    } catch (err) {
        console.error(err);
    }
}


  componentDidMount() {
    DeviceEventEmitter.addListener('FINGERPRINT_SCANNER_AUTHENTICATION',(msg)=>{
      this.setState({status:msg})
      
    });  
    
    this.scan().then(success=>success?this.setState
      ({status: 'authentication success'}): console.log('success'))
      
    // this.addOrderDetail();
      
    // alert('2');


   
  }
  // Update Component to call Add Function upon Authentication
  componentDidUpdate(){
    this.add();
  }
 
async scan(){ 
  // alert('3');
  
  return await NativeModules.ReactNativeFingerprintScanner.authenticate(); 
 
}

//Post Accept or Reject to DB
  add = async () => {

    if(this.state.status==='authentication success'){
      this.state.response='Accept';
    

    this.addOrderDetail();
}else{
  this.state.response='Reject';
    

  this.addOrderDetail();
}
}



    reject = async () => {

  
    this.state.response='Reject';
    this.addOrderDetail();

    Alert.alert(
          'Sent',
         'Delivery Rejected');
    }


  render() {
        // Add Push to DataBase here- If success then YES, else No. Make DB column Boolean
    if(this.state.status=='authentication success'){
      
      this.state.response='Accept';
 
    }else{
      this.state.response='Reject';

    }

  
    return (
      <View style={styles.container}   > 
  
      <Image
        
        style={{width:250, height: 250, opacity: 0.1}}
        resizeMode="contain"
    // URL for image
        source={{uri 
          :'https://media.kasperskydaily.com/wp-content/uploads/sites/92/2015/12/06023350/fingerprints-FB-1.jpg'}}
        /> 
        <View >
 
        <Text style={styles.textStyle}>
                    {this.state.status} 
                    
          </Text>
          </View>   
                    <TouchableOpacity 
                  
                  onPress={this.reject} 
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                        Reject Delivery
                    </Text>
                  </TouchableOpacity>
            </View>
    );
  }
}
//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5059ae',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    color: '#fff'
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#b44666',
    padding: 11,
    marginTop: 50,
    borderRadius: 3,
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
  },
})

export default Fingerprint;