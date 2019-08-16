import React, { Component } from 'react';
import {
  StyleSheet,
  Text,FlatList,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  ListView,
  TouchableOpacity
} from 'react-native';
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";
import Amplify, { API , graphqlOperation} from 'aws-amplify';
import CountDown from 'react-native-countdown-component';

// import *  from "../../functions/routes/index";



export default class DeliveryList extends Component {

  constructor(props) {
    super(props);
   
    this.state = {
       firstName:"",
       lastName:"",
        streetAddress:"",
        city:"",
        postcode:"",
        quer:"",
        input: "",

    };
  }

  

  // The following function will trigger on press of the submit button
 handleRequestSubmitted = async () => {
 	//  title of the notification, String only else breaks.
	const title = "Parcel Notification";

	//  notification body, String only else breaks..  
	const body = "Signature Required click";

	//  POST request  created and sent "notify" Firebase endpoint.

	const url = "https://us-central1-reactapp-d9bf6.cloudfunctions.net/fcm/notify";
  const bodyParams  = {title, body}; // Body parameters of the POST request

  const options = {
    // Request type
    method: 'POST',

    
    headers: {
     'Accept': 'application/json',
  		'Content-Type': 'application/json',
    },

    // Append the requestbody
    body: JSON.stringify(bodyParams),
  };

  const response = await fetch(url, options);

	// Can check if the notification sent or not.
	// Can check the logs in Firebase functions (in Firebase console) to see the errors.

 }
  addOrderDetail = async () => {
    try {
        const info  = {
            // quote: this.state.quotes, 
          
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
    
       await API.graphql(graphqlOperation(mutations.createUserInformation, {input: info}));
    } catch (err) {
        console.error(err);
    }
}
// Subscribe function to Re-Render From DB 
    componentDidMount() {
    this.getOrderDetailsList();
    API.graphql(graphqlOperation(subscriptions.onCreateUserInformation)).subscribe({
      next: (data) => {
          console.log(data);
          const addedOrderDetail = data.value.data.onCreateUserInformation;
          this.setState({quer:[addedOrderDetail, this.state.firstName]});
          this.setState({quer:[addedOrderDetail, this.state.lastName]});
          this.setState({quer:[addedOrderDetail, this.state.streetAddress]});
          this.setState({quer:[addedOrderDetail, this.state.city]});
          this.setState({quer:[addedOrderDetail, this.state.postcode]});
         
      }
    });
 }
// Query from DB
  getOrderDetailsList = async () => {
    try {
      const response = await API.graphql(graphqlOperation(queries.listUserInformations));
        this.setState({ quer: response.data.listUserInformations.items });
        // this.setState({ lastName: response.data.listOrderDetails.items });
        // this.setState({ streetAddress: response.data.listOrderDetails.items });
        // this.setState({ city: response.data.listOrderDetails.items });
        // this.setState({ postCode: response.data.listOrderDetails.items });
        
    } catch (err) {
        console.error(err);
    }
}



  render() {
    return (
      <View style={styles.container}>
    
    <FlatList
                    data={this.state.quer}
                    renderItem={({ item }) => (
                        <View key={item.id}>
                            <View >
              
              <View style={styles.boxContent}>
                 <Text > <Text style={styles.textStylex}>Name: { item.firstName } { item.lastName }
                 {"\n"} Street: { item.streetAddress }{"\n"} City: { item.city } 
                  {"\n"} Post Code:  { item.postcode }</Text>
    
                            </Text>      
                            <TouchableOpacity 
                  
                  onPress={this.handleRequestSubmitted} 
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}
                    >
                      Submit Request
                    </Text>
                  </TouchableOpacity>

                                 </View>
                                 </View>   
        </View>
        )}
/>
            {/* <CountDown
               until={10}
               timeToShow={['S']}
               timeLabels={{ s: 'Seconds'}}
               size={20}
               running='  '
             /> */}
            </View>
              
        )

    }
}


const styles = StyleSheet.create({
  image: {
    width: 100,
    height:100,
  },
  textStylex: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    color: '#fff',
    
  },
  box: {
    padding:20,
    marginTop:5,
    marginBottom:5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  boxContent: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  
    marginLeft:10,
    color: '#fff'
  },
  title:{
    fontSize:18,
    color:"#151515",
  },
  description:{
    fontSize:15,
    color: "#646464",
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#b44666',
    padding: 14,
    marginTop: 20,
    borderRadius: 3,
    width: '122%',
  },
  icon:{
    width:20,
    height:20,
  },
  view: {
    backgroundColor: "#FF1493",
  },
  container: {
    flex: 1,
    backgroundColor: '#5059ae',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  message: {
    backgroundColor: "#228B22",
  },
});
 