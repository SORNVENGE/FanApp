import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import Loading from '../Components/Loading'
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';

export default class NewsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusLoading: false,
            newsData: []
        }
    }
    componentWillMount = () => {
        this.setState({ statusLoading: true });
        CloudFireStoreUserHelper.readNews((response) => {
            if (response) {
                this.setState({ newsData: response, statusLoading: false });
            }
            else {
                this.setState({ statusLoading: false });
            }
        })
    }

    render() {
        const { statusLoading, newsData } = this.state
        if (statusLoading) return <Loading />
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>


                    {newsData.map((eachData, index) => {
                        return (
                            <View style={{ padding: 10, flexDirection: 'column' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
                                    <View style={{ width: '30%', justifyContent: 'center' }}>
                                        <Image source={{ uri: eachData.image }} style={{ width: 80, height: 80, alignSelf: 'center' }} />
                                    </View>
                                    <View style={{ width: '70%', flexDirection: 'column', justifyContent: 'center' }}>
                                        <View style={{}}>
                                            <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{eachData.title}</Text>
                                        </View>
                                        <View style={{}}>
                                            <Text style={{ fontSize: 14, color: 'black' }}>{eachData.date}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ borderBottomColor: 'grey', borderWidth: 0.2, marginLeft: "30%", marginTop: 5 }}></View>
                            </View>

                        );
                    })}


                </ScrollView>

            </View>
        );
    }
}