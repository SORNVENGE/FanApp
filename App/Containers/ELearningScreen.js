import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ImageBackground, FlatList, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';

import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import Swiper from 'react-native-swiper'
import FilePickerManager from 'react-native-file-picker';
import { connect } from 'react-redux'
import firebase from 'react-native-firebase';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class ELearningScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tap: [
                {
                    key: "Total Student",
                    title: "Total Student"
                },
                {
                    key: "Upload File",
                    title: 'Upload File',
                },
                {
                    key: "Score",
                    title: "Score"
                }
            ],
            listData: [
                { name: 'Main Program', image: Images.glocery },
                { name: 'Admission', image: Images.berverages },
                { name: 'Tuition Fee', image: Images.bakery },
                { name: 'Setting', image: Images.flower },
                { name: 'Youtube', image: Images.bakery },
                { name: 'E-Learning', image: Images.stationary },
            ],
            key_tab: 'Total Student',
        }
        this.type_clicked = "Total Student";
    }
    handlePresstap = (tab) => {
        this.type_clicked = tab.key
        this.setState({ tap: [...this.state.tap], key_tab: tab.key });
    }
    _renderTab = ({ item, index }) => {
        IsTab = this.state.key_tab == item.key ? true : false;
        return (
            <TouchableOpacity onPress={() => this.handlePresstap(item)} style={{ borderRadius: 5, backgroundColor: IsTab ? Colors.main_color : Colors.white, width: '32%', height: 40, alignItems: 'center', justifyContent: 'center', marginRight: index == 2 ? 0 : 5, borderWidth: 1, borderColor: IsTab ? Colors.main_color : Colors.black, marginBottom: 5 }}>
                <Text style={{ textAlign: 'center', fontSize: 15, color: IsTab ? Colors.white : Colors.black }}>{item.title}</Text>
            </TouchableOpacity>
        );
    };
    _renderCard = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.handleOnEachCard(item, index)} style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '33.33%',
                height: width / 3,
                // height: height < 731 ? width / 2.2 : width / 2,
                borderWidth: 10,
                borderColor: "white",
                backgroundColor: Colors.main_color,
                borderRadius: 20,
            }}>

                <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
                    <View>
                        <Image source={item.image} style={{ width: 50, height: 50 }} />
                    </View>
                    <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', height: '40%' }}>
                        <Text style={{ fontSize: Fonts.size.regular, fontWeight: 'bold', fontFamily: Fonts.type.khmer_os, color: "white", paddingTop: Metrics.mainMargin, textAlign: 'center', paddingBottom: 10, paddingHorizontal: 5, }}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    handleOnEachCard = () => {

    }
    handleSearchRealTime = () => {

    }
    handleOnUploadFile = () => {
        const { tempUser } = this.props
        console.tron.log({ tempUser: tempUser })


        FilePickerManager.showFilePicker(null, (response) => {
            if (response.didCancel) {

                console.tron.log('User cancelled file picker');
            }
            else if (response.error) {
                console.tron.log('FilePickerManager Error: ', response.error);
            }
            else {
                const pathToFile = response.path;
                firebase
                    .storage()
                    .ref('/document/' + response.fileName)
                    .putFile(response.path)
                    .then((snapshot) => {
                        var ext = snapshot.ref.substr(snapshot.ref.lastIndexOf('.') + 1);
                        var type = ''
                        if (ext == 'jpeg' || ext == 'jpg' || ext == 'png') {
                            type = 'image'
                        } else if (ext == 'pdf') {
                            type = 'pdf'
                        }
                        let mergeObj = {
                            created_date: firebase.firestore.FieldValue.serverTimestamp(),
                            file: snapshot.downloadURL,
                            fileName: response.fileName,
                            teacherId:tempUser.user_id,
                            teacherName:tempUser.username,
                            title:"",
                            classId:tempUser,
                            className:tempUser,
                            type: type,
                            file_size: response.size
                        }
                        // CloudFireStoreUserHelper.updateUserFileSize(uid, sizeFile)
                        // CloudFireStoreUserHelper.addDocumentByUser(mergeObj)
                        // this.setState({ statusIsProgress: false, progress_bar: 0 })
                        // if (Actions.currentScene == 'DocumentScreen') {
                        //     Actions.DocumentPreview({ selectedFile: mergeObj })
                        // }
                    })
                    .catch(

                    );
            }
        });
    }
    render() {
        const { tap } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <View style={{ flex: 5.3 }}>
                    <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 1, width: '100%' }} />
                    <View style={{ padding: Metrics.marginVertical }}>
                        <FlatList
                            style={{ marginTop: Metrics.baseMargin }}
                            data={tap}
                            numColumns={3}
                            renderItem={this._renderTab}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    {console.tron.log(this.type_clicked)}
                    {this.type_clicked == "Total Student" ?
                        <View style={{ padding: 10 }}>
                            <Text>Total Student</Text>
                        </View>
                        : this.type_clicked == "Upload File" ?
                            <View style={{ padding: 10 }}>
                                <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 10, backgroundColor: Colors.background, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, height: 45 }}>
                                    <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity>
                                            <Icon name='search1' type="AntDesign" style={{ color: Colors.black, fontSize: 22, fontWeight: "bold" }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '70%', justifyContent: 'center' }}>
                                        <TextInput
                                            style={{ paddingLeft: 5, textAlignVertical: 'center', width: '100%', fontSize: Fonts.size.regular }}
                                            placeholder="What would you like to eat...?"
                                            onChangeText={(text) => this.handleSearchRealTime(text)}
                                        />
                                    </View>
                                    <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => this.handleOnUploadFile()}>
                                            <Icon name='upload' type="FontAwesome" style={{ color: Colors.black, fontSize: 22, fontWeight: "bold" }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: Colors.white }}>
                                    <FlatList
                                        data={this.state.listData}
                                        numColumns={3}
                                        renderItem={this._renderCard}
                                        keyExtractor={(item, index) => index.toString()}
                                    />

                                </View>
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

export default connect(mapStateToProps, null)(ELearningScreen)
