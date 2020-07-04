import React,{Component} from 'react';
import {View,Text,ScrollView,TouchableHighlight,
    TextInput,StyleSheet} from 'react-native';

export default class FacebookScreen extends Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Text>Wellcome to Screen FacebookScreen ....</Text>
            </View>
        );
    }
}