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
class ELearningSubjectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusLoading: true,
            item: this.props.item,
            data: [
            ],

        }
    }

    _handleNextScreen = (item, index) => {
        console.tron.log(item)
        if (Actions.currentScene == 'ELearningSubjectScreen') {
            Actions.ELearningSubjectVideosScreen({ item: item })
        }
    }

    _handleBackScreen = () => {
        if (Actions.currentScene == 'ELearningSubjectScreen') {
            Actions.pop()
        }
    }

    componentWillMount = () => {
        const { item } = this.state
        CloudFireStoreUserHelper.readSubjectElearning(item.id, (response) => {
            if (response) {
                this.setState({ statusLoading: false, data: response, })
            }
        })
    }

    renderItemView = ({ item, index }) => {

        return (
            <TouchableOpacity onPress={() => this._handleNextScreen(item, index)} style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 10, paddingHorizontal: 20, height: 'auto', }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: Colors.main_color, paddingBottom: 10 }}>
                    <Image
                        style={{ width: 70, height: 100, resizeMode: 'stretch' }}
                        source={{
                            uri: 'https://3.bp.blogspot.com/-YobbTaxVVVM/VoFhoXMovyI/AAAAAAAADDw/PohFKJJPf9o/s400/1935074_2005265309697736_376548635984517981_n.jpg',
                        }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%', }}>
                        <Text style={{ fontWeight: 'bold', width: '70%', textAlign: 'left', color: Colors.main_color, fontSize: 21, marginLeft: 20, }}>{item.title}</Text>
                        <Text style={{ width: '15%', textAlign: 'right', color: Colors.main_color, fontSize: 12, }}>Next</Text>
                        <Icon type="Entypo" name="chevron-right" style={{ fontSize: 20, color: Colors.main_color, }} />
                    </View>
                </View>


            </TouchableOpacity>
        )
    }

    render() {
        const { statusLoading, data, item } = this.state
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
                    Please Select Subject
                </Text>
                {data.length > 0 ?
                    <View style={{ flex: 1, marginTop: 5 }}>
                        <FlatList
                            style={{ width: '100%', backgroundColor: 'white' }}
                            data={data}
                            renderItem={this.renderItemView}
                            keyExtractor={(item, index) => index.toString()} />
                    </View>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: width, height: height }}>
                        <Text style={{ fontSize: 21, fontWeight: 'bold', }}>Coming Soon...</Text>
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

export default connect(mapStateToProps, null)(ELearningSubjectScreen)
