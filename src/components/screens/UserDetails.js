import React, { Component } from 'react';
import {
  StyleSheet,
  Text,FlatList,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback, 
  TouchableHighlight,
  Keyboard,
  Alert,
  Image,
  ListView,
  TouchableOpacity
} from 'react-native';
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";
import Amplify, { API , graphqlOperation} from 'aws-amplify';
import {
    Container,
    Item,

  } from 'native-base'
// const ListOrderDetails = `query ListOrderDetails {
//   listOrderDetails {
//     items {
//       id
//       firstName
//   lastName
//   streetAddress
//   city
//   postCode
//     }
//   }
// }`



// Class to display customer user details
export default class UserDetails extends Component {

  constructor(props) {
    super(props);
   
    this.state = {
       firstName:"",
       lastName:"",
        streetAddress:"",
        city:"",
        postCode:"",
        quer:"",
        input: "",
    };
  }
    componentDidMount() {
        this.getUserSpecificInformationsList();
           //Function re-render app once new info is in the  DB table
        API.graphql(graphqlOperation(subscriptions.onCreateUserInformation)).subscribe({
          next: (data) => {
              console.log(data);
              const addedUserDetail = data.value.data.onCreateUserInformation;
              this.setState({quer:[addedUserDetail, this.state.firstName]});
              this.setState({quer:[addedUserDetail, this.state.lastName]});
              this.setState({quer:[addedUserDetail, this.state.streetAddress]});
              this.setState({quer:[addedUserDetail, this.state.city]});
              this.setState({quer:[addedUserDetail, this.state.postCode]});
             
          }
        });
     }
    
   //Function post to  DB table
    addUserInformation = async () => {
        try {
            const info  = {
                firstName: this.state.firstName,
                firstName: this.state.lastName,
                streetAddress: this.state.streetAddress,
                city:this.state.city,
                postCode: this.state.postCode,
            }
            this.setState({firstName:"" });
            this.setState({lastName: ""});
            this.setState({streetAddress:"" });
            this.setState({city: ""});
            this.setState({postCode:"" });
           await API.graphql(graphqlOperation(mutations.createUserInformation, {input: info}));
        } catch (err) {
            console.error(err);
        }
    }
    //Function and API call to query DB table
    getUserSpecificInformationsList = async () => {
    try {
      const response = await API.graphql(graphqlOperation(queries.listUserInformations));
        this.setState({ quer: response.data.listUserInformations.items });
    } catch (err) {
        console.error(err);
    }
}
//Render function
render() {
   return (
      <FlatList  data={this.state.quer}
        renderItem={({ item }) => (
        <View style={styles.container}>
        <Text style={styles.textStylex}>First Name:</Text>
         <Text style={styles.textStyle}>{item.firstName}</Text>
        <Text style={styles.textStylex}>Last Name:</Text>
        <Text style={styles.textStyle}>{item.lastName}</Text>
         <Text style={styles.textStylex}>Street Address:</Text>
        <Text style={styles.textStyle}>{item.streetAddress}</Text>
         <Text style={styles.textStylex}>City:</Text>
        <Text style={styles.textStyle}>{item.city}</Text>
         <Text style={styles.textStylex}>Post Code:</Text>
        <Text style={styles.textStyle}>{item.postcode}{`\n\n`}</Text>

        </View>
                             
        )}  
           /> 
        
        );

    }
}
// Styles for screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:70,
    backgroundColor: '#5059ae',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 22,
    padding: 10,
    color: '#fff'
  },
  textStylex: {
    fontSize: 15,
    padding: 5,
    color: '#fff'
  }
})