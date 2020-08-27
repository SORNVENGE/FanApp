import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ImageBackground, FlatList, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';

import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import FilePickerManager from 'react-native-file-picker';
import { connect } from 'react-redux'
import firebase from 'react-native-firebase';
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';
import Loading from '../Components/Loading'

class MyDocumentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: props.tempUser,
            user_key: "",
            classData: [],
            statusLoading: false,
            tap: [
                {
                    key: "All Class",
                    title: "All Class"
                },
                {
                    key: "Score",
                    title: "Score"
                }
            ],
            key_tab: 'All Class',
        }
        this.type_clicked = "All Class";
    }
    componentWillMount = () => {
        const { userData, user_key } = this.state
        this.setState({ statusLoading: true });
        userData.data.map((eachData, ind) => {
            CloudFireStoreUserHelper.readClassByTeacherId(eachData.user_id, (response) => {
                if (response) {
                    this.setState({ classData: response, statusLoading: false });
                }
                else {
                    this.setState({ statusLoading: false });
                }
            })
        })
    }
    handlePresstap = (tab) => {
        this.type_clicked = tab.key
        this.setState({ tap: [...this.state.tap], key_tab: tab.key });
    }
    _renderTab = ({ item, index }) => {
        IsTab = this.state.key_tab == item.key ? true : false;
        return (
            <TouchableOpacity onPress={() => this.handlePresstap(item)} style={{ borderRadius: 5, backgroundColor: IsTab ? Colors.main_color : Colors.white, width: '48%', height: 40, alignItems: 'center', justifyContent: 'center', marginRight: index == 2 ? 0 : 5, borderWidth: 1, borderColor: IsTab ? Colors.main_color : Colors.black, marginBottom: 5 }}>
                <Text style={{ textAlign: 'center', fontSize: 15, color: IsTab ? Colors.white : Colors.black }}>{item.title}</Text>
            </TouchableOpacity>
        );
    };
    clickOnEachClass=(eachData)=>{
        console.tron.log({eachData:eachData})
    }
    render() {
        const { tap, statusLoading, classData } = this.state
        if (statusLoading) return <Loading />
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <View style={{ flex: 5.3 }}>
                    <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 1, width: '100%' }} />
                    
                    <View style={{ padding: Metrics.marginVertical }}>
                        <FlatList
                            style={{ marginTop: Metrics.baseMargin }}
                            data={tap}
                            numColumns={2}
                            renderItem={this._renderTab}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                   
                    {this.type_clicked == "All Class" ?
                        <View style={{ padding: 10 }}>
                            {classData.map((eachData, inde) => {
                                return (
                                    <TouchableOpacity onPress={() => this.clickOnEachClass(eachData)} style={{ marginTop:10,flexDirection: 'row', backgroundColor: Colors.main_color, padding: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.5, shadowRadius: 2, elevation: 0.5, borderRadius: 5 }}>
                                        <View style={{ justifyContent: 'center', width: '20%' }}>
                                            <Image source={{ uri: 'https://dyl80ryjxr1ke.cloudfront.net/p/assets/images/graphic-tutorial-bulk-clipping@2x_1f8c938ff20a0315dddf79fe36d0c8ec.png' }} style={{ width: 45, height: 45, borderRadius: 50 }} />
                                        </View>
                                        <View style={{ justifyContent: 'center', width: '80%' }}><Text style={{ color: 'white', fontWight: 'bold', fontSize: 16 }}>{eachData.class_name}</Text></View>
                                    </TouchableOpacity>
                                )
                            })}

                        </View>
                        :
                        <View style={{ padding: 10 }}>
                            <Text>Score of Student</Text>
                        </View>
                    }
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        tempUser: state.tempUser,
    }
}

export default connect(mapStateToProps, null)(MyDocumentScreen)
