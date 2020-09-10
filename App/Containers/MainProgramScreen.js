import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Actions } from 'react-native-router-flux';

export default class MainProgramScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { title: "I. General Education (Grade 1-12)", lefeICon: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcStIVmje-5YIdLKCsMGiwBmphMVvqDWsDjiLRVm6nELHesjU0-u&usqp=CAU", image1: Images.img1, image2: Images.img2, image3: Images.img3 },
                { title: "II. ESL Program (Level 1-12)", lefeICon: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSpZg_NdNCgRJsZN0RA6BNACcbJ7IMkXRdiIO9oRpzgirgUmwKp&usqp=CAU", image1: Images.img1, image2: Images.img2, image3: Images.img3 },
                { title: "III. Intelligent Mental-Arimethic IMA ", lefeICon: "https://imagevars.gulfnews.com/2020/03/09/Distance-learning_170bf3e45b1_large.jpg", image1: Images.img1, image2: Images.img2, image3: Images.img3 },
                { title: "IV. Computer Training Course ", lefeICon: "https://images.ctfassets.net/fevtq3bap7tj/4rsL8Wiv2EuyaOKgwC0OOU/93dc05128009c2ec38cd34e35dd46fb2/Home_illustration.png", image1: Images.img1, image2: Images.img2, image3: Images.img3 },
                { title: "V. Intelligent Test Program Course", lefeICon: "https://i2.wp.com/clickstudies.com/wp-content/uploads/university-library-clickstudies.jpg?resize=640%2C426&ssl=1", image1: Images.img1, image2: Images.img2, image3: Images.img3 },
            ]
        }
    }

    render() {
        const { data } = this.state
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {data.map((eachData, index) => {
                        return (
                            <TouchableOpacity onPress={() =>Actions.MainProgramDetailScreen({ item: eachData })} style={{ padding: 10, flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
                                    <View style={{ width: '30%', justifyContent: 'center' }}>
                                        <Image
                                            style={{ width: 85, height: 75, alignSelf: 'center', resizeMode: 'center' }}
                                            source={{ uri: eachData.lefeICon }}
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