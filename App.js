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
import VehicleDetails from './src/components/ALPR/VehicleDetails';

export default class App extends Component{
  componentWillMount(){
    // Initialize Firebase
    if (!firebase.apps.length) {
      const config = {
        apiKey: "AIzaSyDBa5IOIdomv1I8Fi8LCw9ueSsg2_S_doE",
        authDomain: "malpr-4c337.firebaseapp.com",
        databaseURL: "https://malpr-4c337.firebaseio.com",
        projectId: "malpr-4c337",
        storageBucket: "malpr-4c337.appspot.com",
        messagingSenderId: "384049723713"
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
