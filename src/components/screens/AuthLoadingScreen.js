import React from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'


// Import AWS AUTHENTICATION
import Auth from '@aws-amplify/auth'

// class for AUthentication Loading Screen, and Navigation Decision based off user Cognito Group
export default class AuthLoadingScreen extends React.Component {
  // Storing States
  state = {
    userToken: null,
    DeliveryUser: "",
      User:null
  }

   async componentDidMount () {
     this.loadApp();
  }
  
  // Session to store logged in Users, and their User Group
  loadApp = async () => {
     await Auth.currentAuthenticatedUser()
    .then(user => {
       this.setState({userToken: user.signInUserSession.accessToken.jwtToken});
       AsyncStorage.setItem('mytoken',JSON.stringify(this.state.userToken));

    })
    .catch(err => console.log(err))
    Auth.currentSession()
    .then(data => console.log(data))
    .catch(err => console.log(err));
    Auth.currentSession()
    .then(data =>{
      
      this.setNav(data);
      
    })
    .catch(err => console.log(err));

// Conditional Logic to decide which user Group the user belongs to i.e. Delivery or Customer
//  alert(this.state.User); 
// AsyncStorage to init and assign Json AsyncStorage token to new variable
let mytoken=JSON.parse(await AsyncStorage.getItem('mytoken'));

//Clear AsyncStorage to prevent loop, App will crash upon log-out if DELETED

 AsyncStorage.clear();  

// alert(mytoken);

if (this.state.User===true){
    this.props.navigation.navigate(mytoken ? 'AuthDelivery' : 'Auth')
}else {
this.props.navigation.navigate(mytoken ? 'App' : 'Auth')

}
  }


  // Set Navigation Menu based off User Group within AWS Cognito
  setNav(data){
    // alert(data);
      DeliveryUser = data.accessToken.payload['cognito:groups'][0]
//  alert(this.state.User);    
  if (DeliveryUser==='DeliveryUser'){
          this.state.User=true;
      }else{
        this.state.User=false;
      }
  }
  
  render() {
    
    return (
      <View style={styles.container}> 
        <ActivityIndicator size="large" color="#fff" />
       
      </View>
    )
  }
}

//Styles
const styles = StyleSheet.create({
  container: {  
    flex: 1,
    backgroundColor: '#b44666',
    alignItems: 'center',
    justifyContent: 'center',
  },
})