import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ImageBackground, FlatList, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
import { Container, Header, Content, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import FilePickerManager from 'react-native-file-picker';
import { connect } from 'react-redux'
import firebase from 'react-native-firebase';
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';
import Loading from '../Components/Loading'
import Pdf from 'react-native-pdf';
class MyClassDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: props.tempUser,
            classData: props.classDetail,
            classId: props.classDetail.user_id,
            studentData: [],
            documentData: [],
            statusLoading: false,
            tap: [
                {
                    key: "Information",
                    title: "Information"
                },
                {
                    key: "Document File",
                    title: "Document File"
                }
            ],
            key_tab: 'Information',
        }
        this.type_clicked = "Information";

    }
    componentWillMount = () => {
        const { classId, userData } = this.state
        this.setState({ statusLoading: true });
        var teacherId = "";
        var teacherName = ""
        userData.data.map((eachData, ind) => {
            teacherId = eachData.user_id,
            teacherName = eachData.username
        })
        CloudFireStoreUserHelper.readDocument(classId, teacherId, (response) => {
            if (response) {
                this.setState({ documentData: response });
            }
        })
        CloudFireStoreUserHelper.readStudentByClassId(classId, (response) => {
            if (response) {
                this.setState({ studentData: response, statusLoading: false });
            }
            else {
                this.setState({ statusLoading: false });
            }
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
    handleOnUploadFile = () => {
        const { classId, classData, userData } = this.state
        var teacherId = "";
        var teacherName = ""
        userData.data.map((eachData, ind) => {
            teacherId = eachData.user_id,
                teacherName = eachData.username
        })
        FilePickerManager.showFilePicker(null, (response) => {
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else {
                this.setState({ statusLoading: true });
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
                        else if (ext == 'pptx') {
                            type = 'pptx'
                        }

                        let mergeObj = {
                            created_date: firebase.firestore.FieldValue.serverTimestamp(),
                            file: snapshot.downloadURL,
                            fileName: response.fileName,
                            teacherId: teacherId,
                            teacherName: teacherName,
                            title: "Exercise for tonight",
                            classId: classId,
                            className: classData.class_name,
                            type: type,
                            file_size: response.size
                        }
                        CloudFireStoreUserHelper.addDocumentByUser(mergeObj, (response) => {
                            if (response) {
                                CloudFireStoreUserHelper.readDocument(classId, teacherId, (response) => {
                                    if (response) {
                                        this.setState({ documentData: response, statusLoading: false });
                                    }
                                    else {

                                    }
                                })
                            }
                            else {
                                alert(" Please Check file before upload!!! ")
                            }
                        })
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
    _handlePress = (item) => {
        Actions.DocumentPreviewScreen({ selectedFile: item })
    }
    renderItemList = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this._handlePress(item)} style={{
                marginTop: index < 3 ? null : 5, padding: item.type == 'image' ? 0 : 5,
                marginLeft: 5,
                marginRight: 5,
                marginBottom: 5,
                width: '30.8%',
                borderColor: Colors.border,
                borderWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10
            }}>
                <View style={{ width: item.type == 'image' ? '100%' : null, height: item.type == 'image' ? 80 : 72 }}>
                    <Image source={item.type == 'image' ? { uri: item.file } : Images.pdf_icon} style={{ marginTop: item.type == 'image' ? -3 : 0, height: '100%', width: item.type == 'image' ? '100%' : 70, borderTopRightRadius: item.type == 'image' ? 10 : 0, borderTopLeftRadius: item.type == 'image' ? 10 : 0 }} />
                </View>
                <Text style={{ padding: 2, fontSize: Fonts.size.medium }}>
                    {item.fileName != '' ?
                        item.fileName.length > 13 ?
                            item.fileName.substr(0, 9) + "..."
                            :
                            item.fileName
                        : ''}
                </Text>
            </TouchableOpacity >
        )
    }
    render() {

        const { tap, statusLoading, classData, studentData, documentData } = this.state
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

                    {this.type_clicked == "Information" ?
                        <View style={{ padding: 10 }}>
                            <TouchableOpacity style={{ marginTop: 10, shadowOpacity: 0.5, borderWidth: 0.4, borderColor: Colors.main_color, borderRadius: 15 }}>
                                <View style={{ padding: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <View style={{ width: '30%' }}>
                                        <Text style={{ fontSize: 15, color: 'black', fontWight: 'bold' }}>  Class title   : </Text>
                                    </View>
                                    <View style={{ width: '80%' }}>
                                        <Text style={{ fontSize: 17, color: Colors.black, fontWight: 'bold' }}>{classData.class_name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 10, shadowOpacity: 0.5, borderWidth: 0.4, borderColor: Colors.main_color, borderRadius: 15 }}>
                                <View style={{ padding: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <View style={{ width: '30%' }}>
                                        <Text style={{ fontSize: 15, color: 'black', fontWight: 'bold' }}>  Level   : </Text>
                                    </View>
                                    <View style={{ width: '80%' }}>
                                        <Text style={{ fontSize: 17, color: Colors.black, fontWight: 'bold' }}>{classData.level_name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 10, shadowOpacity: 0.5, borderWidth: 0.4, borderColor: Colors.main_color, borderRadius: 15 }}>
                                <View style={{ padding: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <View style={{ width: '30%' }}>
                                        <Text style={{ fontSize: 15, color: 'black', fontWight: 'bold' }}>  Session : </Text>
                                    </View>
                                    <View style={{ width: '80%' }}>
                                        <Text style={{ fontSize: 17, color: Colors.black, fontWight: 'bold' }}>{classData.session_name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <Text style={{ marginTop: 25, fontSize: 18, color: 'black', fontWight: 'bold' }}> List Student in class </Text>
                            <View style={{ height: '70%', marginTop: 10 }}>
                                <ScrollView>
                                    {studentData.map((eachStudent, ind) => {
                                        return (
                                            <View style={{ marginBottom: 5, marginTop: 5 }}>
                                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                                    <View style={{ width: '90%', paddingLeft: 10 }}>
                                                        <Text style={{ fontSize: 16, color: Colors.black, fontWight: 'bold' }}>{eachStudent.username} ( {eachStudent.student_phone} )</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </ScrollView>
                            </View>

                        </View>
                        :
                        <View style={{ padding: 10 }}>
                            <View style={{ width: '90%', alignSelf: 'center' }}>
                                <FlatList
                                    data={documentData}
                                    numColumns={3}
                                    renderItem={this.renderItemList}
                                    keyExtractor={(item, index) => index.toString}
                                />
                            </View>
                        </View>
                    }

                </View>
                {this.type_clicked == "Information" ? null :
                    <TouchableOpacity onPress={() => this.handleOnUploadFile()} style={{ position: 'absolute', bottom: 0, backgroundColor: Colors.main_color, width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "white", fontSize: Fonts.size.medium, fontWeight: 'bold' }}>UPLOAD DOCUMENT</Text>
                    </TouchableOpacity>
                }

            </View>
        );






    }
}
const mapStateToProps = (state) => {
    return {
        tempUser: state.tempUser,
    }
}

export default connect(mapStateToProps, null)(MyClassDetailScreen)
