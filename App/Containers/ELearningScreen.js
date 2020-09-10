import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ImageBackground, FlatList, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase';
import Loading from '../Components/Loading'

import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class ELearningScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusLoading: false,
            data: [],

        }
    }

    componentWillMount = () => {
        this.setState({ statusLoading: true });

        CloudFireStoreUserHelper.readMainProgram((response) => {
            if (response) {
                this.setState({ data: response, statusLoading: false });
            }
        })
    }

    render() {
        const { statusLoading, data } = this.state
        if (statusLoading) return <Loading />
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {data.map((eachData, index) => {
                        console.tron.log({eachData:eachData})
                        return (
                            <TouchableOpacity onPress={() => Actions.MainProgramDetailScreen({ item: eachData })} style={{ padding: 10, flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
                                    <View style={{ width: '30%', justifyContent: 'center' }}>
                                        <Image source={eachData.image} style={{ width: '100%', height: '100%', alignSelf: 'center', resizeMode: 'cover' }} />
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
const mapStateToProps = (state) => {
    return {
        tempUser: state.tempUser,
    }
}

export default connect(mapStateToProps, null)(ELearningScreen)
