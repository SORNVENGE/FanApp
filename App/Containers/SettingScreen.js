import React, { Component } from 'react';
import {View, Text, Image,TouchableOpacity} from 'react-native';
import { Images, Metrics, Colors, Fonts } from '../Themes'

export default class SettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ padding: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: "black", fontWeight: 'bold' }}>Please Choose your Language</Text>
                </View>

                <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, paddingLeft: 20, paddingRight: 20 }}>
                    <View style={{ borderColor: 'grey', borderWidth: 0.5, height: 100, alignItems: 'center', flexDirection: 'row',opacity:8 }}>
                        <View style={{paddingLeft:20,paddingRight:20}}> 
						<Image source={Images.english} style={{ width: 60, height: 60, alignSelf: 'center', resizeMode: 'center' }} />

                        </View>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: "black", fontWeight: 'bold' }}>English</Text>
                    </View>
                </TouchableOpacity>




                <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, paddingLeft: 20, paddingRight: 20 }}>
                    <View style={{ borderColor: 'grey', borderWidth: 0.5, height: 100, alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{paddingLeft:20,paddingRight:20}}> 
						<Image source={Images.khmer} style={{ width: 60, height: 60, alignSelf: 'center', resizeMode: 'center' }} />
                        </View>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: "black", fontWeight: 'bold' }}>Khmer</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        );
    }
}