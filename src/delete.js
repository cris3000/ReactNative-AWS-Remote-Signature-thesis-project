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




export default class DeliveryList extends Component {

  constructor(props) {
    super(props);
   
    this.state = {
       firstName:"",
       lastName:"",
        streetAddress:"",
        city:"",
        postCode:"",
        quer:"",
    };
  }

 componentDidMount() {
 this.getOrderDetailsList();
  API.graphql(graphqlOperation(subscriptions.onCreateOrderDetail)).subscribe({
      next: (data) => {
          console.log(data);
          const addedOrderDetail = data.value.data.onCreateOrderDetail;
          // Just this to fix
          this.setState({ quotes: [addedQuote, ...this.state.quotes] });
          this.setState()
      }
  });
 }
  getOrderDetailsList = async () => {
    try {
      const response = await API.graphql(graphqlOperation(queries.listOrderDetails));
        this.setState({ quer: response.data.listOrderDetails.items });
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
                            <Text style={styles.item}>"{item.firstName}" "{item.lastName}""{item.city}"</Text>
        </View>
        )}
                />
            </View>
        )

    }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 22,
      marginLeft: 20,
      marginRight: 20
  },
  item: {
      padding: 10,
      fontSize: 18,
      height: 44,
  }
});

//////////////////////


// eslint-disable
// this is an auto generated file. This will be overwritten

// export const getUserInformation = `query GetUserInformation($id: ID!) {
//   getUserInformation(id: $id) {
//     id
//     firstName
//     lastName
//     streetAddress
//     city
//     postCode
//   }
// }
// `;
// export const listUserInformations = `query ListUserInformations(
//   $filter: ModelUserInformationFilterInput
//   $limit: Int
//   $nextToken: String
// ) {
//   listUserInformations(filter: $filter, limit: $limit, nextToken: $nextToken) {
//     items {
//       id
//       firstName
//       lastName
//       streetAddress
//       city
//       postCode
//     }
//     nextToken
//   }
// }
// `;
// export const getOrderDetail = `query GetOrderDetail($id: ID!) {
//   getOrderDetail(id: $id) {
//     id
//     firstName
//     lastName
//     streetAddress
//     city
//     postCode
//   }
// }
// `;
// export const listOrderDetails = `query ListOrderDetails(
//   $filter: ModelOrderDetailFilterInput
//   $limit: Int
//   $nextToken: String
// ) {
//   listOrderDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
//     items {
//       id
//       firstName
//       lastName
//       streetAddress
//       city
//       postCode
//     }
//     nextToken
//   }
// }
// `;
// export const getOrderHistory = `query GetOrderHistory($id: ID!) {
//   getOrderHistory(id: $id) {
//     id
//     User
//   }
// }
// `;
// export const listOrderHistorys = `query ListOrderHistorys(
//   $filter: ModelOrderHistoryFilterInput
//   $limit: Int
//   $nextToken: String
// ) {
//   listOrderHistorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
//     items {
//       id
//       User
//     }
//     nextToken
//   }
// }
// `;
