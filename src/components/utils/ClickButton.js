//React Imports
import React, {Component} from 'react';
//React Native imports
import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';

//Class for Clickable Button
export default class ClickButton extends Component{
  render() {
    return (
      
      //Button
        <TouchableHighlight
        //Style for a Round Red Button
        style = {{
          borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
          width: Dimensions.get('window').width * 1,
          height: Dimensions.get('window').width *1,
          backgroundColor:'#f00',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        underlayColor = '#ccc'
        // Click
        onPress = { () => alert('Pressed!') }
      >
        <Text> Click to Accept Parcel </Text>
      </TouchableHighlight>
    );
  }
}

