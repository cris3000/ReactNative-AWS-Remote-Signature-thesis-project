import React, { Component } from 'react';
import HomeScreen from './HomeScreen'
import Testapp from '../../../pushNotification';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,Dimensions,
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


 // Class to Accept or Reject Delivery for Customer User,
class AcceptButton extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
        answer:'Accept Parcel',
      response : 'Accept',
      answertwo:'Reject Parcel',
      response2: 'Reject'
    }
  }
 //Function for GraphQL operation to create post to DB for Accepting parcel

  addOrderDetail = async () => {
    try {
   
        const info  = {
            // quote: this.state.quotes, 
            // ass: this.state.name,
            AcceptedDelivery: this.state.response,
          
        
        }
        this.setState({answer: 'Parcel Accepted'})
        alert('Accepted');
// alert('7');
 
       await API.graphql(graphqlOperation(mutations.createUserInformation, {input: info}));
    } catch (err) {
        console.error(err);
    }
}
//Function for GraphQL operation to create post to DB for Rejecting parcel

addOrderDetailTwo = async () => {
    try {
   
        const info  = {

            AcceptedDelivery: this.state.response2,
          
        
        }
        this.setState({answertwo: 'Parcel Rejected'})
        alert('Rejected');

       
       await API.graphql(graphqlOperation(mutations.createUserInformation, {input: info}));
    } catch (err) {
        console.error(err);
    }
}



// componentDidUpdate() {
//   if(this.state.status=='authentication success'){
      
//     this.state.firstName='wooof';

// // this.order();
// }else{

// }
// }

  render() {
     
  
    return (
      <View style={styles.container}   > 
  
     
        <TouchableOpacity 
                  
                  onPress={this.addOrderDetail}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                    {this.state.answer} 
                    </Text>
                  </TouchableOpacity>
  

                  <TouchableOpacity 
                  
                  onPress={this.addOrderDetailTwo}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                    {this.state.answertwo} 
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

export default AcceptButton;