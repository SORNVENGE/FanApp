import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Actions } from 'react-native-router-flux';
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';
import Loading from '../Components/Loading'
export default class MainProgramScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainProgramData:[],
            statusLoading:false
        }
    }
    componentWillMount=()=>{
        this.setState({  statusLoading: true });
        CloudFireStoreUserHelper.readMainProgram((response) => {
            if (response) {
                this.setState({ mainProgramData: response, statusLoading: false });
            }
            else {
                this.setState({ statusLoading: false });
            }
        })
    }

    render() {
        const {statusLoading,mainProgramData } = this.state
        if (statusLoading) return <Loading />

        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {mainProgramData.map((eachData, index) => {
                        return (
                            <TouchableOpacity onPress={() =>Actions.MainProgramDetailScreen({ item: eachData })} style={{ padding: 10, flexDirection: 'column' }}>
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