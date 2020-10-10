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
            statusLoading:false,
            data: [
                { title: "I. General Education (Grade 1-12)",image:"https://media.istockphoto.com/vectors/scholarship-icon-vector-id980135014?k=6&m=980135014&s=612x612&w=0&h=30Nm_7aHTwnjWmk9YvUMoB8kblWPD2Gv5W5C8BPxN9A=",image1: Images.img1, image2: Images.img2, image3: Images.img3 },
                { title: "II. ESL Program (Level 1-12)",image:"https://www.archivistonline.pk/wp-content/uploads/2015/06/school-fee-collection-software.jpg",image1: Images.img3, image2: Images.img1, image3: Images.img2},
                { title: "III. Intelligent Mental-Arimethic IMA ",image:"https://missionvalleynews.com/wp-content/uploads/2017/03/o-TUITION-COSTS-facebook.jpg",image1: Images.img5, image2: Images.img3, image3: Images.img6},
                { title: "IV. Computer Training Course ",image:"https://cdn.modernghana.com/images/content/31201995703_i4ep276gfa_threewaysstudyingabroadcanhelpyourpostgradjobsearch_16001154_800783681_0_0_14039927_500.jpg",image1: Images.img6, image2: Images.img3, image3: Images.img1},
                { title: "V. Intelligent Test Program Course",image:"https://lh3.googleusercontent.com/proxy/coQET0iD5HL7_YTML3NlO_jCXzibYdDelrTWSs335hMxU0CutjvN5Wo923G8qiKz9NhbN_5okRBOzdtr_qmLPyLF-Td97cbiydlEiOT1C0lGUDMBjC5kS-2w5RRvgVt2jdpSJudKDxuG6g_9UMjTgSbFiXN7pWycI5xSSVys31d1Mr9Pco35ac7SxX3eD77FxtD62COlJQU88g",image1: Images.img1, image2: Images.img4, image3: Images.img6},
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