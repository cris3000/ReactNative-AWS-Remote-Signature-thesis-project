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
//GRaphQL imports
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";
import Amplify, { API , graphqlOperation} from 'aws-amplify';
import {
    Container,
    Item,

  } from 'native-base'
// Class Response Page
export default class ResponsePage extends Component {
//Constructor and States
  constructor(props) {
    super(props);
   
    this.state = {
        AcceptedDelivery:"",
        createdAt:"",
        quer:"",
        input: "",
        owner:"",
        
    };
  }

    componentDidMount() {
        this.getUserSpecificInformationsList();
         //Subscriber function to re-render when DB changes

        API.graphql(graphqlOperation(subscriptions.onCreateUserInformation)).subscribe({    
          next: (data) => {
              console.log(data); 
              const addedUserDetail = data.value.data.onCreateUserInformation;
               this.setState({quer:[addedUserDetail, this.state.AcceptedDelivery]});
         
           
          }
        });

        //Subscriber function to re-render when DB changes

        API.graphql(graphqlOperation(subscriptions.onDeleteUserInformation)).subscribe({
          next: (data) => {
              console.log(data);
              const removedQuote = data.value.data.onDeleteUserInformation;
              const updatedList = this.state.quer.filter((quer => {
                  return quer.id !== removedQuote.id;
              }))
              this.setState({ quer: updatedList });
          }
      });
     }
    
  // Add response to DB
    addUserInformation = async () => {
        try {
            const info  = {
                response: this.state.response,
             }
            this.setState({response:"" });
           await API.graphql(graphqlOperation(mutations.createUserInformation, {input: info}));
        } catch (err) {
            console.error(err);
        }
    }
    //Query from DB
    getUserSpecificInformationsList = async () => {
    try {
      const responses = await API.graphql(graphqlOperation(queries.listUserInformations));
        this.setState({ quer: responses.data.listUserInformations.items });
    } catch (err) {
        console.error(err);
    }
}
// Delete Function and clear Page
deleteResponse = async (id) => {
  try {
      await API.graphql(graphqlOperation(mutations.deleteUserInformation, { input: { id: id } }))
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
        <Text style={styles.textStylex}>{`Response:\n\n\n\n\n\n`}</Text>
         <Text  style={styles.textStyle}>{item.AcceptedDelivery} {`\n\n\n`}</Text>
         <Button title="Clear"   onPress={() => this.deleteUserInformation(item.id)} />
        </View>              
        )}  
           /> 
        );
    }
}
//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:105,
    backgroundColor: '#5059ae',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 40,
    padding: 10,
    color: '#fff'
  },
  textStylex: {
    fontSize: 15,
    padding: 5,
    color: '#fff'
  },

  
})