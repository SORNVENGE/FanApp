import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class DetailScreen extends Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>Actions.HomeScreen()}><Text>Click here</Text></TouchableOpacity>
            </View>
        );
    }
}