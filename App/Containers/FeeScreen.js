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
            feeData:[],
            statusLoading:false,
            data: [
                { title: "I. General Education (Grade 1-12)", lefeICon: "https://i7.pngflow.com/pngimage/877/789/png-student-group-education-college-university-student-tshirt-blue-people-university-clipart-thumb.png", image1: Images.img1, image2: Images.img2, image3: Images.img3 },
                { title: "II. ESL Program (Level 1-12)", lefeICon: "https://w7.pngwing.com/pngs/343/187/png-transparent-student-university-institute-school-education-student-class-people-public-relations.png", image1: Images.img1, image2: Images.img2, image3: Images.img3 },
                { title: "III. Intelligent Mental-Arimethic IMA ", lefeICon: "https://imacorp.com/wp-content/uploads/2018/01/IMA_Gardner_BLUE.png", image1: Images.img1, image2: Images.img2, image3: Images.img3 },
                { title: "IV. Computer Training Course ", lefeICon: "https://images.ctfassets.net/fevtq3bap7tj/4rsL8Wiv2EuyaOKgwC0OOU/93dc05128009c2ec38cd34e35dd46fb2/Home_illustration.png", image1: Images.img1, image2: Images.img2, image3: Images.img3 },
                { title: "V. Intelligent Test Program Course", lefeICon: "https://f1.pngfuel.com/png/612/755/809/educational-test-of-english-as-a-foreign-language-toefl-educational-testing-service-book-text-technology-number-blue-png-clip-art.png", image1: Images.img1, image2: Images.img2, image3: Images.img3 },
            ]
        }
    }
    componentWillMount=()=>{
        this.setState({  statusLoading: true });
        CloudFireStoreUserHelper.readFee((response) => {
            if (response) {
                this.setState({ feeData: response, statusLoading: false });
            }
            else {
                this.setState({ statusLoading: false });
            }
        })
    }
    render() {

        const {statusLoading,feeData } = this.state
        if (statusLoading) return <Loading />
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {feeData.map((eachData, index) => {
                        return (
                            <TouchableOpacity onPress={() =>Actions.FeeDetailScreen({ item: eachData })} style={{ padding: 10, flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
                                    <View style={{ width: '30%', justifyContent: 'center' }}>
                                        <Image
                                            style={{ width: 85, height: 75, alignSelf: 'center', resizeMode: 'center' }}
                                            source={{ uri: eachData.image }}
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