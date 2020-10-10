import React, { Component } from 'react';
import { Images, Colors, Metrics, Fonts } from '../Themes'

import { View, Text, ScrollView, TextInput, Image } from 'react-native';

export default class FeeDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        }
    }

    render() {
        const { item } = this.state
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1, lexDirection: 'column',paddingBottom:30 }}>

                        <View style={{ backgroundColor: Colors.main_color, marginTop: 10, padding: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>តម្លៃសិក្សា {"\n"}Tuition Fee</Text>
                        </View>
                        <View style={{ padding: 10 }}><Text style={{ color: Colors.main_color }}> 1. បឋមសិក្សា(ថ្នាក់ទី១​-ទី៦) {"\n"}Elementary School(Grade 1-6)</Text></View>
                        <View style={{ padding: 10, height: 250, width: '100%' }}>
                            <Image source={ item.image1 } style={{ width: '100%', height: '100%', alignSelf: 'center', resizeMode: 'cover' }} />
                        </View>
                        <View style={{ padding: 10 }}><Text style={{ color: Colors.main_color }}> 2. មធ្យមសិក្សា(ថ្នាក់ទី៧​-ទី១២) {"\n"}Junior and Senior High School(Grade 7-12)</Text></View>
                        <View style={{ padding: 10, height: 250, width: '100%' }}>
                            <Image source={ item.image1 } style={{ width: '100%', height: '100%', alignSelf: 'center', resizeMode: 'cover' }} />
                        </View>
                        <View style={{ backgroundColor: Colors.main_color, marginTop: 10, padding: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>ថ្ងៃនិងម៉ោងសិក្សា {"\n"}​ Days & Date</Text>
                        </View>
                        <View style={{ padding: 10, height: 320, width: '100%' }}>
                            <Image source={item.image3} style={{ width: '100%', height: '100%', alignSelf: 'center', resizeMode: 'cover' }} />
                        </View>
                        <View style={{ padding: 10 }}><Text style={{ textAlign:'center',color: Colors.main_color }}> បវេសនកាលប្រចាំឆ្នាំ ចូលរៀនថ្ងៃទី០១ កញ្ញា រៀងរាល់ឆ្នាំ {"\n"} New Academic Year, September 01 at Every Year</Text></View>


                    </View>
                </ScrollView>

            </View>
        );
    }
}