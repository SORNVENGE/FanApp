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
// import Pdf from 'react-native-pdf';
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
        }
    }
    componentWillMount = () => {
        const { classId } = this.state
        this.setState({ statusLoading: true });
        CloudFireStoreUserHelper.readStudentByClassId(classId, (response) => {
            if (response) {
                this.setState({ studentData: response, statusLoading: false });
            }
            else {
                this.setState({ statusLoading: false });
            }
        })
    }
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
                console.tron.log('User cancelled file picker');
            }
            else if (response.error) {
                console.tron.log('FilePickerManager Error: ', response.error);
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
                                CloudFireStoreUserHelper.readDocument((response) => {
                                    if (response) {
                                        this.setState({ documentData: response, statusLoading: false });
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
    render() {

        const { statusLoading, classData, studentData,documentData } = this.state
        // const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
        if (statusLoading) return <Loading />
        console.tron.log({documentData:documentData})
        return (
            <View style={{ flex: 1 }}>
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
                    <View style={{ width: '100%', marginTop: 10, height: 270 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {studentData.map((eachStudent, ind) => {
                                return (
                                    <TouchableOpacity style={{ marginTop: 10, shadowOpacity: 0.5, borderWidth: 0.4, borderColor: Colors.main_color, borderRadius: 15 }}>
                                        <View style={{ padding: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <View style={{ width: '90%', paddingLeft: 10 }}>
                                                <Text style={{ fontSize: 17, color: Colors.main_color, fontWight: 'bold' }}>{eachStudent.username} ( {eachStudent.student_phone} )</Text>

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>

                  
                  
                    {/* <View style={{ backgroundColor: 'green', height: 150 }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginTop: 25,
                        }}>
                            <Pdf
                                source={source}
                                onLoadComplete={(numberOfPages, filePath) => {
                                    console.log(`number of pages: ${numberOfPages}`);
                                }}
                                onPageChanged={(page, numberOfPages) => {
                                    console.log(`current page: ${page}`);
                                }}
                                onError={(error) => {
                                    console.log(error);
                                }}
                                onPressLink={(uri) => {
                                    console.log(`Link presse: ${uri}`)
                                }}
                                style={{
                                    flex: 1,
                                    width: Dimensions.get('window').width,
                                    height: Dimensions.get('window').height,
                                }} />
                        </View>
                    </View> */}

                </View >
                <TouchableOpacity onPress={() => this.handleOnUploadFile()} style={{ position: 'absolute', bottom: 0, backgroundColor: Colors.main_color, width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: "white", fontSize: Fonts.size.medium, fontWeight: 'bold' }}>UPLOAD DOCUMENT</Text>
                </TouchableOpacity>
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
