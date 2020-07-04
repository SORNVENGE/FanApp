import React, { Component } from 'react';
import {
    View, Text, ScrollView, TouchableHighlight,
    TextInput, StyleSheet
} from 'react-native';

export default class MainProgramDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', padding: 10 }}>

                    <Text style={{ fontSize: 15, paddingTop: 10 }}>
                        There is a demand among academic researchers for appropriate high quality in-country immersive Khmer language training.
                        However,not all have completed the two years of academic training in Khmer required for Advance Study in Khmer (ASK).
                        There is a demand among academic researchers for appropriate high quality in-country immersive Khmer language training.
                        
                        However,not all have completed the two years of academic training in Khmer required for Advance Study in Khmer (ASK).
                        it si the not all have completed the two years of academic training in Khmer required for Advance Study in Khmer (ASK).
                    </Text>
                   
                </View>
            </View>
        );
    }
}