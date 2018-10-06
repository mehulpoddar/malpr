/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import PlateDetector from './src/components/ALPR/PlateDetector';
import firebase from 'firebase';

export default class App extends Component{
  componentWillMount(){
    // Initialize Firebase
    if (!firebase.apps.length) {
      const config = {
        apiKey: 'AIzaSyBZYTCnfIfMOB8NE3Kqpnc91VV4US1c-Ug',
        authDomain: 'dsceapp-5ed7f.firebaseapp.com',
        databaseURL: 'https://dsceapp-5ed7f.firebaseio.com',
        projectId: 'dsceapp-5ed7f',
        storageBucket: 'dsceapp-5ed7f.appspot.com',
        messagingSenderId: '359041235154',
      };
      firebase.initializeApp(config);
    }
  }
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1, justifyContent:"center", alignItems:"center", elevation:11,backgroundColor:'#fff', shadowColor:'#000', shadowOffset: {width:2, height:2}, shadowOpacity:0.2}}>
          <Text style={{fontSize:18, color:'#000'}}>MALPR</Text>
        </View>
        <View style={{flex:10}}>
        <PlateDetector />
        </View>
      </View>
    );
  }
}
