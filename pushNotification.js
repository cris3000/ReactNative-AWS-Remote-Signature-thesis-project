import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert,TouchableOpacity, AsyncStorage, Button} from 'react-native';
import firebase from 'react-native-firebase';
import Fingerprint from  './src/components/screens/Fingerprint'


// Firebase Generate FCM Token for the device when Registering


export default class pushNotification extends Component{


  static navigationOptions= ({navigation}) =>({
    title: 'Fingerprint'
 
		});


    //4 
    async componentDidMount() {
      this.checkPermission();
      this.createNotificationListeners(); //add this line
    }
    // 5
    componentWillUnmount() {
      this.notificationListener;
      this.notificationOpenedListener;
    }
  
    //1
    async checkPermission() {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        this.getToken();
      } else {
        this.requestPermission();
      }
    }
  
    //3
    async getToken() {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          // user has a device token
          console.log('fcmToken:', fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
          this.subscribeUserToFcmTopic(fcmToken);
        }
      }
      console.log('fcmToken:', fcmToken);
    }
  
    subscribeUserToFcmTopic = async (fcmToken) => {
      // Create the URL with base URL and FCM Token
      const url = `https://us-central1-reactapp-d9bf6.cloudfunctions.net/fcm/subscribe/${fcmToken}`;
      
      // Needed to send notification title and body
      const options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };
      
      // Subscribe users to the Notification Channel
      // The response will tell if the request was a success or not.
   
      const response = await fetch(url, options);
      console.log('subscribe response:', response);
    }
  
    //2
    async requestPermission() {
      try {
        await firebase.messaging().requestPermission();
        //   authorization
        this.getToken();
      } catch (error) {
        //  Denied
        console.log('permission rejected');
      }
    }
  
    async createNotificationListeners() {
      /*
      * notification received in foreground
      * */
      this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        console.log('onNotification:');
        
          const localNotification = new firebase.notifications.Notification({
            sound: 'sampleaudio',
            show_in_foreground: true,
          })
          .setSound('sampleaudio.wav')
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .android.setChannelId('fcm_FirebaseNotifiction_default_channel')
          .android.setSmallIcon('@drawable/ic_launcher') 
          .android.setColor('#000000')     
          // .setClickAction(()=>alert('test'))   
          .android.setPriority(firebase.notifications.Android.Priority.High);
  
      
          firebase.notifications()
            .displayNotification(localNotification)
            .catch(err => console.error(err));
      });
  
      const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotifiction_default_channel', 'UniFinalApp', firebase.notifications.Android.Importance.High)
        .setDescription('Demo app description')
        .setSound('sampleaudio.wav');
      firebase.notifications().android.createChannel(channel);
  
      
      // If the app is in background, you can listen when opened :
 
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        console.log('onNotificationOpened:');
        
      });
  
     
      // If the app is closed, check if it was opened as follows:
      
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        console.log('getInitialNotification:');
        Alert.alert(title, body)
      }
      /*
      * Triggered for data only payload in foreground
      * */
     this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log("JSON.stringify:", JSON.stringify(message));
    });
  }
render() {
  
    return (
      <View >
<TouchableOpacity onPress={() => navigation.navigate("Home")}>
	</TouchableOpacity>
       
      </View>
    );
  }
}

