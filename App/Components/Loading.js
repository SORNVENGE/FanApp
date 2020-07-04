import React, { Component } from 'react';
import {View} from 'native-base'
import { Spinner } from 'native-base';
import { Colors } from '../Themes'
import { UIActivityIndicator } from 'react-native-indicators';
export default class Loading extends Component {
  render() {
      return (
          <View style={{alignItems:'center',justifyContent:'center', height: "100%", backgroundColor: Colors.white}}>
            <UIActivityIndicator color={Colors.main_color} size={40} style={{  zIndex: 1000 }} />
          </View>
      );
    }
}