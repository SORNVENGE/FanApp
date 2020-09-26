import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Icon } from 'native-base';
import firebase from "react-native-firebase";
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';
import Loading from '../Components/Loading'

export default class AdmissionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [  ],
            statusLoading: true
        }
        this.ref = firebase.firestore().collection('tbl_admission');
    }

    componentWillMount() {
        // var studentClassList = [
        //     { title: "1.ថ្នាក់ត្រៀម", subTitle: " Preschool for Grade 1 or ESL Level 1", text: "មានតំរូវការក្នុងចំណោមអ្នកស្រាវជ្រាវសិក្សាសំរាប់ការបណ្តុះបណ្តាលភាសាខ្មែរប្រកបដោយគុណភាពខ្ពស់នៅក្នុងប្រទេស។ទោះយ៉ាងណាក៏ដោយមិនមែនទាំងអស់បានបញ្ចប់ការបណ្តុះបណ្តាលរយៈពេលពីរឆ្នាំជាភាសាខ្មែរដែលតម្រូវឱ្យមានការសិក្សាជាមុនជាភាសាខ្មែរ។ There is a demand among academic researchers for appropriate high quality in-country immersive Khmer language training.However,not all have completed the two years of academic training in Khmer required for Advance Study in Khmer (ASK).", },
        //     { title: "2.​ ចំណេះទូទៅ(ថ្នាក់ទី១​-ទី៦)", subTitle: "general Education (Grade 1-6)", text: "មានតំរូវការក្នុងចំណោមអ្នកស្រាវជ្រាវសិក្សាសំរាប់ការបណ្តុះបណ្តាលភាសាខ្មែរប្រកបដោយគុណភាពខ្ពស់នៅក្នុងប្រទេស។ទោះយ៉ាងណាក៏ដោយមិនមែនទាំងអស់បានបញ្ចប់ការបណ្តុះបណ្តាលរយៈពេលពីរឆ្នាំជាភាសាខ្មែរដែលតម្រូវឱ្យមានការសិក្សាជាមុនជាភាសាខ្មែរ។ There is a demand among academic researchers for appropriate high quality in-country immersive Khmer language training.However,not all have completed the two years of academic training in Khmer required for Advance Study in Khmer (ASK).", status: false },
        //     { title: "3. ចំណេះទូទៅ(ថ្នាក់ទី៧​-ទី១២)", subTitle: "General Education (Grad 7-12)", text: "មានតំរូវការក្នុងចំណោមអ្នកស្រាវជ្រាវសិក្សាសំរាប់ការបណ្តុះបណ្តាលភាសាខ្មែរប្រកបដោយគុណភាពខ្ពស់នៅក្នុងប្រទេស។ទោះយ៉ាងណាក៏ដោយមិនមែនទាំងអស់បានបញ្ចប់ការបណ្តុះបណ្តាលរយៈពេលពីរឆ្នាំជាភាសាខ្មែរដែលតម្រូវឱ្យមានការសិក្សាជាមុនជាភាសាខ្មែរ។ There is a demand among academic researchers for appropriate high quality in-country immersive Khmer language training.However,not all have completed the two years of academic training in Khmer required for Advance Study in Khmer (ASK).", status: false },
        //     { title: "4. ថ្នាក់ភាសាអង់គ្លេសទូទៅ(កម្រិត ១​-៦)", subTitle: "ESL Program (Level 1-6)", text: "Hello Makara Testing content with statice data is verys easy but if it real data i think it abit messy thne static data", status: false },
        //     { title: "5. ថ្នាក់ភាសាអង់គ្លេសទូទៅ(កម្រិ​ត​ ៧-១២)", subTitle: "ESL Program (LEvel 7-12)", text: "Hello Sopha; Testing content with statice data is verys easy but if it real data i think it abit messy thne static data", status: false },
        //     { title: "6. កម្មវិធីគណនាលេសរហ័ស", subTitle: "AMI Intelligen Mental-Arimethic IMA", text: "Hello Kimheang Testing content with statice data is verys easy but if it real data i think it abit messy thne static data", status: false },
        // ]
        // studentClassList.map((eachStudentClass, ind) => {
        //     this.ref.add({
        //         title: eachStudentClass.title,
        //         subTitle: eachStudentClass.subTitle,
        //         text: eachStudentClass.text,
        //         created: firebase.firestore.FieldValue.serverTimestamp()
        //     }).then((querySnapshot) => {
        //         var key = querySnapshot._documentPath._parts[1]
        //         this.ref.doc(key).update({
        //             id: key,
        //         });
        //     }).catch((error) => {
        //     });
        // })
        CloudFireStoreUserHelper.readAdmission((response) => {
            if (response) {
                this.setState({ statusLoading: false, data: response,})
            }
        })
    }

    handleOnClickOnDownIcon = (item, index) => {
        const { data } = this.state
        data.map((eachItem, eachIndex) => {
            if (index == eachIndex) {
                data[eachIndex].status = !data[eachIndex].status
            } else {
                data[eachIndex].status = false
            }
        })
        this.setState({ data: [...data] });
    }
    renderListData = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => this.handleOnClickOnDownIcon(item, index)} style={{ flexDirection: 'row', backgroundColor: index % 2 == 0 ? 'white' : '#F2F2F2', justifyContent: 'space-between', alignItems: 'center', height: 85, width: '100%', padding: Metrics.doubleBaseMargin }}>
                    <View style={{ width: '90%' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.main_color, }}>{item.title}</Text>
                        <Text style={{ fontSize: 14, color: Colors.main_color, marginTop: 10 }}>{item.subTitle}</Text>
                    </View>
                    <View style={{ width: '10%' }}>
                        <Icon name={item.status ? "down" : "up"} type="AntDesign" style={{ color: Colors.main_color, fontSize: 20, fontWeight: "bold" }} />
                    </View>
                </TouchableOpacity>
                <View>
                    {item.status ?
                        <View style={{ flexDirection: 'column', backgroundColor: index % 2 == 0 ? 'white' : '#F2F2F2', paddingLeft: 10 }}>
                            <View style={{ borderColor: 'grey', borderWidth: 0.2 }} />
                            <View>
                                {item.text ?
                                    <View style={{ padding: 15, paddingTop: 5 }}>
                                        <Text style={{ color: Colors, fontSize: Fonts.size.medium + 2, lineHeight: 25 }}>{item.text}</Text>
                                    </View>
                                    :
                                    null
                                }
                            </View>
                            <View style={{ borderColor: 'grey', borderWidth: 0.2 }} />
                        </View>
                        :
                        null
                    }
                </View>
            </View>

        )
    }
    render() {
        const { data, statusLoading } = this.state
        if (statusLoading) return <Loading />
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={data}
                        renderItem={this.renderListData}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        );
    }
}