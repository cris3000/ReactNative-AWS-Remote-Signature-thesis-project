import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import Ionicons from 'react-native-ionicons'


//class for HomeScreen For DeliveryUser
export default class HomeScreenDelivery extends React.Component {

  render() {
    return (
    
      
      <View style={styles.container}> 
      <Text style={styles.textStylex}>Icon Definitions</Text>
      <Text style={styles.textStylexx}><Ionicons style={styles.IconStyle} name="ios-home" />   Home 
      {' '}  <Ionicons  style={styles.IconStyle} name="ios-settings" /> Add Delivery to Database</Text>
    
      <Text style={styles.textStylexx}>  <Ionicons style={styles.IconStyle} name="ios-car" /> {' '} Available Deliveries  
      {' '}  <Ionicons  style={styles.IconStyle} name="ios-checkbox" /> Delivery Response   </Text>
      <Text style={styles.textStylexx}>  <Ionicons  style={styles.IconStyle}  name="ios-map" />   Map   </Text>
        <Testapp/>
    
        <Text style={styles.textStyle}>Instructions </Text>
        <Text style={styles.textStylex}>Check Delivery List and Submit Request on the necessary Delivery</Text>
        <Text style={styles.textStylex}>Add Delivery to database by Inputting Delivery Details on Delivery Page</Text>
        <Text style={styles.textStylex}>Check Response Page for the Customers Reponse</Text>
        <Text> </Text>
      </View>

    )
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
    fontSize: 25,
    padding: 10,
    color: '#fff'
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