import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ImageBackground, FlatList, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase';
import Loading from '../Components/Loading'
import randomColor from 'randomcolor';  
import _ from 'lodash'

import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';
const db = firebase.firestore();

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class ELearningScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusLoading: true,
            data: [],
        }
    }

    _handleNextScreen = (item, index) => {
        console.tron.log(item)
        if (Actions.currentScene == 'ELearningScreen') {
            Actions.ELearningItemScreen({item: item})
        }
    }

    _handleBackScreen = () => {
        if (Actions.currentScene == 'ELearningScreen') {
            Actions.HomeScreen()
        }
    }


    componentWillMount = () => {
        CloudFireStoreUserHelper.readElearning((response) => {
            if (response) {
                this.setState({ statusLoading: false, data: response, })
            }
        }) 
        list = [
            {title: 'Lesson 1: Graph', title_kh: 'មេរៀនទី១ :​ ក្រាប', no: 1, mainSubject: '5TVKw8beK4AdPJcu5hzk', link: 'https://www.youtube.com/watch?v=SdghBW7jQdM' },
            {title: 'Lesson 2: Standards', title_kh: 'មេរៀនទី២ : មាត្រដ្ធាន', no: 2, mainSubject: '5TVKw8beK4AdPJcu5hzk', link: 'https://www.youtube.com/watch?v=Vf6kmbL8nA4'},
            {title: 'Lesson 3: Equations', title_kh: 'មេរៀនទី៣ :​ សមីការ', no: 3, mainSubject: '5TVKw8beK4AdPJcu5hzk', link: 'https://www.youtube.com/watch?v=zZ2nSzW9nyM'},
            {title: 'Lesson 4: Probability', title_kh: 'មេរៀនទី៤ :​ ប្រូបាប', no: 4, mainSubject: '5TVKw8beK4AdPJcu5hzk', link: 'https://www.youtube.com/watch?v=abXkaw3BLkM'},
            {title: 'Lesson 5: Statistics', title_kh: 'មេរៀនទី៥ : ស្ថិតិ', no: 5, mainSubject: '5TVKw8beK4AdPJcu5hzk', link: 'https://www.youtube.com/watch?v=7yQy3Q7UPTI'},
        ]
        // list.map((eachLand) => {
        //     	db.collection("tbl_elearning_video").add({
        //             title: eachLand.title, 
        //             title_kh: eachLand.title_kh,
        //             no: eachLand.no,
        //             mainSubject: eachLand.mainSubject,
        //             link: eachLand.link
        //     	}).then((data) => {
        //     		console.tron.log(data._documentPath._parts[1])
        //             db.collection("tbl_elearning_video").doc(data._documentPath._parts[1]).update({
        //                 id: data._documentPath._parts[1]
        //             });
        //     	}).catch((error) => {
        //     		console.tron.log(`error adding Firestore document = ${error}`);
        //     	});
        //     })

    }

    renderItemView = ({ item, index }) => {
        console.tron.log(item)
        return (
            <TouchableOpacity onPress={() => this._handleNextScreen(item, index)}style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 10, paddingHorizontal: 20, height: 'auto', }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: index%2==0 ? '#4747d1' : '#4d79ff', borderRadius: 5, }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '15%', paddingVertical: 30, }}>
                        <Icon type="AntDesign" name="star" style={{ fontSize: 25, color: 'white', marginLeft: 5, }} />
                    </View>
                    <View style={{
                        borderRadius: 3, justifyContent: 'center', alignItems: 'center', width: '15%', height: '100%', backgroundColor: 'white', shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.30,
                        shadowRadius: 4.65,
                        elevation: 8,
                    }}>
                        <Text style={{ fontWeight: 'bold', width: '100%', textAlign: 'center', color: '#4D4646', fontSize: 24 }}>{item.no}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '65%', flexDirection: 'row', paddingLeft: 20, }}>
                        <Text style={{ fontWeight: 'bold', width: '80%', textAlign: 'left', color: 'white', fontSize: 14 }}>{item.title}</Text>
                        <Icon type="Entypo" name="chevron-right" style={{ fontSize: 25, color: 'white', }} />
                    </View>
                </View>
                {/* <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ width: '100%', textAlign: 'left', color: 'white', fontSize: 16 }}>{item.sessionTime}</Text>
                        <Text style={{ width: '100%', textAlign: 'left', color: 'white', fontSize: 14, marginTop: 10 }}>{item.openDate}</Text>
                    </View>
                    <View style={{ width: '50%', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={{ width: '100%', textAlign: 'right', color: 'white', fontSize: 14 }}>{item.tool == 'tissue' ? I18n.t('tissue') : I18n.t('pipe')}</Text>
                        <Text style={{ width: '100%', textAlign: 'right', color: 'white', fontSize: 14, marginTop: 10 }}>{item.status == 'pending' ? I18n.t('pending') : I18n.t('open')}</Text>
                    
                    </View> */}


            </TouchableOpacity>
        )
    }

    render() {
        const { statusLoading, data } = this.state
        let sortData = []
		sortData = _.orderBy(data, [item => item.no], ['asc']);
        if (statusLoading) return <Loading />
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {data.map((eachData, index) => {
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

export default connect(mapStateToProps, null)(ELearningScreen)
