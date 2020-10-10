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
            statusLoading: true,
            admissionData : [
            { title: "1.ថ្នាក់ត្រៀម", subTitle: " Preschool for Grade 1 or ESL Level 1", text: "មានតំរូវការក្នុងចំណោមអ្នកស្រាវជ្រាវសិក្សាសំរាប់ការបណ្តុះបណ្តាលភាសាខ្មែរប្រកបដោយគុណភាពខ្ពស់នៅក្នុងប្រទេស។ទោះយ៉ាងណាក៏ដោយមិនមែនទាំងអស់បានបញ្ចប់ការបណ្តុះបណ្តាលរយៈពេលពីរឆ្នាំជាភាសាខ្មែរដែលតម្រូវឱ្យមានការសិក្សាជាមុនជាភាសាខ្មែរ។ There is a demand among academic researchers for appropriate high quality in-country immersive Khmer language training.However,not all have completed the two years of academic training in Khmer required for Advance Study in Khmer (ASK).", },
            { title: "2.​ ចំណេះទូទៅ(ថ្នាក់ទី១​-ទី៦)", subTitle: "general Education (Grade 1-6)", text: "There is a demand among academic researchers for appropriate high quality in-country immersive Khmer language training.However,not all have completed the two years of academic training in Khmer required for Advance Study in Khmer (ASK). មានតំរូវការក្នុងចំណោមអ្នកស្រាវជ្រាវសិក្សាសំរាប់ការបណ្តុះបណ្តាលភាសាខ្មែរប្រកបដោយគុណភាពខ្ពស់នៅក្នុងប្រទេស។ទោះយ៉ាងណាក៏ដោយមិនមែនទាំងអស់បានបញ្ចប់ការបណ្តុះបណ្តាលរយៈពេលពីរឆ្នាំជាភាសាខ្មែរដែលតម្រូវឱ្យមានការសិក្សាជាមុនជាភាសាខ្មែរ។ ", status: false },
            { title: "3. ចំណេះទូទៅ(ថ្នាក់ទី៧​-ទី១២)", subTitle: "General Education (Grad 7-12)", text: "Amy even got approval from the School Board for some funding to run a few radio ads on the local Christian station promoting the Open House.  Despite these efforts, attendance at the event was low, rendering a bleak outlook for new enrollment in this important admissions season.", status: false },
            { title: "4. ថ្នាក់ភាសាអង់គ្លេសទូទៅ(កម្រិត ១​-៦)", subTitle: "ESL Program (Level 1-6)", text: "Meanwhile, Angela Admissions has plenty of traffic at her school’s prospective events; however, very few are taking the next step by submitting applications. She and her team run a well-planned Open House where their head of school gives a 15-minute powerpoint presentation about all the wonderful ways the school is improving its facilities and programs. They also lead visitors on a quick tour through the halls, but don’t like to enter classrooms as it may disturb the teacher’s lessons.", status: false },
            { title: "5. ថ្នាក់ភាសាអង់គ្លេសទូទៅ(កម្រិ​ត​ ៧-១២)", subTitle: "ESL Program (LEvel 7-12)", text: "A school blog is not the place to primarily promote your school’s accomplishments and accolades. To put it bluntly, you should not be using your school blog to brag about your school. Why? Because prospective parents don’t really care about the winners of your school’s contests or news about the upcoming fundraiser. A promotional school blog only appeals to current parents of students enrolled at your school.", status: false },
            { title: "6. កម្មវិធីគណនាលេសរហ័ស", subTitle: "AMI Intelligen Mental-Arimethic IMA", text: "Almost all prospective parents are Gen Xers or Millennials. Both of these groups of parents love social media and it’s part of their daily lives. If your school does not have a social media strategy, you are missing opportunities to connect with your prospects.", status: false },
        ]
        }
        this.ref = firebase.firestore().collection('tbl_admission');
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({statusLoading: false})
        }, 1000)
    }

    handleOnClickOnDownIcon = (item, index) => {
        const {admissionData } = this.state
        admissionData.map((eachItem, eachIndex) => {
            if (index == eachIndex) {
                admissionData[eachIndex].status = !admissionData[eachIndex].status
            } else {
                admissionData[eachIndex].status = false
            }
        })
        this.setState({ admissionData: [...admissionData] });
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
        const { data, statusLoading,admissionData } = this.state
        if (statusLoading) return <Loading />
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={admissionData}
                        renderItem={this.renderListData}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        );
    }
}