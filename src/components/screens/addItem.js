import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  AlertIOS
} from 'react-native';


import Amplify, { API } from 'aws-amplify';
import aws_exports from '../../aws-exports';
Amplify.configure(aws_exports);


let addItem = item => {
  db.ref('/UserInfo').push({
    name: item,
    firstName: item,
    lastName: item,
    streetAddress:item,
    city:item,
    postCode:item,
  });
};
// DUMMY CLASS. NO IMPACT ON APP
export default class AddItem extends Component {
  state = {
      firstName: '',
    lastName: '',
    streetAddress:'',
    city:'',
    postCode:'',
  };

  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  };
  handleSubmit = () => {
    addItem(this.state.firstName);
    
  };
  handleSubmit = () => {
    addItem(this.state.lastName);
    
  };
  handleSubmit = () => {
    addItem(this.state.streetAddress);
    
  };
  handleSubmit = () => {
    addItem(this.state.city);
    
  };
  handleSubmit = () => {
    addItem(this.state.postCode);
    
  };

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Add Item</Text>
        <TextInput style={styles.itemInput} onChange={this.handleChange} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});