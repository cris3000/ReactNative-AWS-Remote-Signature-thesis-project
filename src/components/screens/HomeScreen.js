import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'


import Ionicons from 'react-native-ionicons'

//class for HomeScreen page for Customer User
export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}> 
        <Text style={styles.textStylex}>Icon Definitions</Text>
      <Text style={styles.textStylexx}><Ionicons style={styles.IconStyle} name="ios-home" />   Home 
      {' '}  <Ionicons  style={styles.IconStyle} name="ios-person" />Profile</Text>
    
      <Text style={styles.textStylexx}>  <Ionicons style={styles.IconStyle} name="ios-settings" /> {' '} Settings  
      {' '}  <Ionicons  style={styles.IconStyle} name="ios-radio-button-on" /> Accept Button   </Text>

        <Testapp/>
    
        <Text style={styles.textStylex}>  {`\n\n\n`} Instructions  {`\n`} </Text>
      
        <Text style={styles.textStylex} >Enter your address within the Profile page </Text>
        <Text style={styles.textStylex}>When a notification is received. Accept by FingerPrint, 
        or navigating to Accept page and clicking Accept{`\n\n\n\n\n\n\n\n`} </Text> 

        <Text> </Text>
      </View>
    )
  }
}
//Styles
const styles = StyleSheet.create({
  container: {
 
    backgroundColor: '#5059ae',
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconStyle:{
    color: '#2fb007',
  },
  textStylex: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    color: '#fff'
  },
  textStylexx: {
    fontWeight: 'bold',
    fontSize: 12,
    padding: 0,
  
    flexDirection: 'column',
    color: '#fff'
  }
})