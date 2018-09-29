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

export default class App extends Component{
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
