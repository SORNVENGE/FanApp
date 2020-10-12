import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Actions } from 'react-native-router-flux';

import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';
import Loading from '../Components/Loading'
export default class FeeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusLoading:true,
            data: [
                { title: "I. General Education (Grade 1-12)",url:Images.feeimg1,image1: Images.img1, image2: Images.img2, image3: Images.img3 },
                { title: "II. ESL Program (Level 1-12)",url:Images.feeimg2,image1: Images.img3, image2: Images.img1, image3: Images.img2},
                { title: "III. Intelligent Mental-Arimethic IMA ",url:Images.feeimg3,image1: Images.img5, image2: Images.img3, image3: Images.img6},
                { title: "IV. Computer Training Course ",url:Images.feeimg4,image1: Images.img6, image2: Images.img3, image3: Images.img1},
                { title: "V. Intelligent Test Program Course",url:Images.feeimg5,image1: Images.img1, image2: Images.img4, image3: Images.img6},
            ]
        }
    }
    componentWillMount=()=>{
        setTimeout(() => {
            this.setState({statusLoading: false})
        }, 1000)
    }
    render() {

        const {statusLoading,data } = this.state
        if (statusLoading) return <Loading />
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {data.map((eachData, index) => {
                        return (
                            <TouchableOpacity onPress={() =>Actions.FeeDetailScreen({ item: eachData })} style={{ padding: 10, flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
                                    <View style={{ width: '30%', justifyContent: 'center' }}>
                                        <Image
                                            style={{ width: 85, height: 75, alignSelf: 'center', resizeMode: 'center' }}
                                            source={ eachData.url }
                                        />
                                    </View>
                                    <View style={{ width: '70%', flexDirection: 'column', justifyContent: 'center' }}>
                                        <View style={{}}>
                                            <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{eachData.title}</Text>
                                        </View>
                                        <View style={{}}>
                                            <Text style={{ fontSize: 14, color: 'black' }}>05/06/2020 11AM</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderBottomColor: 'grey', borderWidth: 0.2, marginLeft: "30%", marginTop: 5 }}></View>
                            </TouchableOpacity>
                        )
                    })}

                </ScrollView>

            </View>
        );
    }
}