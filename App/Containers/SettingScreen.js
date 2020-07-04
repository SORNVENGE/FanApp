import React, { Component } from 'react';
import {View, Text, Image,TouchableOpacity} from 'react-native';

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
                            <Image style={{ width: 60, height: 60, alignSelf: 'center', resizeMode: 'center' }}
                                source={{ uri: "https://cdn.webshopapp.com/shops/94414/files/53596372/cambodia-flag-image-free-download.jpg" }}
                            />
                        </View>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: "black", fontWeight: 'bold' }}>ភាសាខ្មែរ</Text>
                    </View>
                </TouchableOpacity>




                <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, paddingLeft: 20, paddingRight: 20 }}>
                    <View style={{ borderColor: 'grey', borderWidth: 0.5, height: 100, alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{paddingLeft:20,paddingRight:20}}> 
                            <Image style={{ width: 60, height: 60, alignSelf: 'center', resizeMode: 'center' }}
                                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Great_Britain_%28English_version%29.png" }}
                            />
                        </View>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: "black", fontWeight: 'bold' }}>ភាសាខ្មែរ</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        );
    }
}