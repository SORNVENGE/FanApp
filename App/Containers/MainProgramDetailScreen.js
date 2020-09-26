import React, { Component } from 'react';
import {View, Text, ScrollView, TouchableHighlight,TextInput, StyleSheet} from 'react-native';
import Loading from '../Components/Loading'


export default class MainProgramDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item:props.item,
            statusLoading:false
        }
    }

    render() {
        const {statusLoading,item } = this.state
        if (statusLoading) return <Loading />
        return (
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 15, paddingTop: 10,paddingLeft:10 }}>
                        {item.description}
                    </Text>
                   
                </View>
            </View>
        );
    }
}