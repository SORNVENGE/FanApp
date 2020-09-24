import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ImageBackground, FlatList, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase';
import Loading from '../Components/Loading'
import _ from 'lodash'

import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class ELearningItemScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusLoading: true,
            item: this.props.item,
            data: [],

        }
    }

    componentWillMount = () => {
        const { item } = this.state
        CloudFireStoreUserHelper.readGradeElearning(item.id, (response) => {
            if (response) {
                this.setState({ statusLoading: false, data: response, })
            }
        })

    }
    _handleNextScreen = (item, index) => {
        if (Actions.currentScene == 'ELearningItemScreen') {
            Actions.ELearningSubjectScreen({ item: item })
        }
    }

    _handleBackScreen = () => {
        if (Actions.currentScene == 'ELearningItemScreen') {
            Actions.pop()
        }
    }

    renderItemView = ({ item, index }) => {

        return (
            <TouchableOpacity onPress={() => this._handleNextScreen(item, index)} style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 10, paddingHorizontal: 20, height: 'auto', }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 5, height: 60 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#797F89', borderTopLeftRadius: 60 / 2, borderBottomLeftRadius: 60 / 2, }}>
                        <Text style={{ fontWeight: 'bold', width: 60, textAlign: 'center', color: 'white', fontSize: 21, height: 60, backgroundColor: 'red', borderRadius: 60 / 2, textAlignVertical: 'center' }}>{item.no}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '86%', height: 60, backgroundColor: '#797F89', paddingRight: 10, }}>
                        <Text style={{ fontWeight: 'bold', width: '70%', textAlign: 'left', color: 'white', fontSize: 21, marginLeft: 20, }}>{item.title}</Text>
                        <Text style={{ width: '15%', textAlign: 'right', color: 'white', fontSize: 12, }}>Next</Text>
                        <Icon type="Entypo" name="chevron-right" style={{ fontSize: 20, color: 'white', }} />
                    </View>

                </View>


            </TouchableOpacity>
        )
    }

    render() {
        const { statusLoading, data, item } = this.state
        let sortData = []
        sortData = _.orderBy(data, [item => item.no], ['asc']);
        if (statusLoading) return <Loading />
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 56, backgroundColor: Colors.main_color }}>
                    <TouchableOpacity onPress={() => this._handleBackScreen()} style={{ width: '10%', alignItems: 'flex-end' }}>
                        <Icon name='arrowleft' type="AntDesign" style={{ color: Colors.white, fontSize: 26, fontWeight: "bold" }} />
                    </TouchableOpacity>

                    <View style={{ width: '80%' }}>

                        <Text style={{ fontSize: Fonts.size.input, color: Colors.white, textAlign: 'center', }}>{item.title}</Text>
                    </View>
                    <View style={{ width: '10%' }} />
                </View>
                <Text style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: '#005DFF', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: '#4D4646', }}>
                    Please Select Class
                </Text>
                {sortData.length > 0 ?
                    <View style={{ flex: 1, marginTop: 5 }}>


                        <FlatList
                            style={{ width: '100%', backgroundColor: 'white' }}
                            data={sortData}
                            renderItem={this.renderItemView}
                            keyExtractor={(item, index) => index.toString()} />

                    </View> :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: width, height: height }}>
                        <Text  style={{fontSize: 21, fontWeight: 'bold', }}>Coming Soon...</Text>
                    </View>

                }
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
    },

});

const mapStateToProps = (state) => {
    return {
        tempUser: state.tempUser,
    }
}

export default connect(mapStateToProps, null)(ELearningItemScreen)
