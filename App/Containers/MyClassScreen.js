import React, { Component } from "react";
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	Image,
	ImageBackground,
	FlatList,
	StyleSheet,
	TextInput,
	ScrollView,
	Platform
} from "react-native";
import ClassByStudentAction from '../Redux/ClassByStudentRedux'
import ListClassByTeacherAction from '../Redux/ListClassByTeacherRedux'

import ListClassAction from '../Redux/ListClassRedux'

import { Icon } from "native-base";
import { Actions } from "react-native-router-flux";
import { Images, Colors, Metrics, Fonts } from "../Themes";
import FilePickerManager from "react-native-file-picker";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import CloudFireStoreUserHelper from "../Services/CloudFireStoreUserHelper";
import Loading from "../Components/Loading";

const db = firebase.firestore();
class MyClassScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: props.tempUser,
			user_key: "",
			classData: [],
			statusLoading: true,
			tempClasses: [],
			tempUserClass: [],
			userClasses: [],
			teacherClass: []
		};
	}
	// componentWillMount = () => {
	// 	const { userData } = this.state;
	// 	this.setState({ statusLoading: true });
	// 	var roleName = ""
	// 	CloudFireStoreUserHelper.readUserRoleById(
	// 		userData.data.roleId,
	// 		response => {
	// 			if (response) {
	// 				if (response[0].roleName == "Student") {
	// 					CloudFireStoreUserHelper.readClassByStudentId(userData.data.key, response => {
	// 						({ ResponeStudent: response })
	// 						if (response) {
	// 							this.readAllProfessional(response)
	// 						} else {
	// 							this.setState({ statusLoading: false });
	// 						}
	// 					});
	// 				}
	// 				if (response[0].roleName == "Teacher") {
	// 					CloudFireStoreUserHelper.readClassByTeacherId(
	// 						userData.data.key,
	// 						response => {
	// 							if (response) {
	// 								this.setState({ classData: response, statusLoading: false });
	// 							} else {
	// 								this.setState({ statusLoading: false });
	// 							}
	// 						});
	// 				}
	// 			} else {
	// 				this.setState({ statusLoading: false });
	// 			}
	// 		});

	// };

	componentDidMount() {
		const { userData } = this.state
		console.tron.log(userData)
		var userId = userData.data ? userData.data.userId : ''
		var teacherName = userData.data ? userData.data.username : ''

		if (userData.data.role == 'student') {
			let data = {
				studentId: userId,
			}
			this.props.requestListClass()
			this.props.requestClassByStudent(data)
		} else {
			let data = {
				teacherName: teacherName,
			}
			this.props.requestListClassByTeacher(data)
		}


	}

	componentWillReceiveProps(newProps) {
		const { userData } = this.state
		if (Actions.currentScene == "MyClassScreen") {
			if (userData.data.role != 'student') {
				if (newProps.getClassByTeacher) {
					const { fetching, error, payload } = newProps.getClassByTeacher
					if (fetching == false && error == null && payload) {
						console.tron.log(payload)
						this.setState({ teacherClass: payload, statusLoading: false })
						// this.requestFaqList = false;
						// this.tempFaqData = [...this.tempFaqData, ...data]
						// this.setState({ faqListdata: [...this.state.faqListdata, ...data],  });
					}
				}
			} else {
				if (newProps.getListClass) {
					const { fetching, error, payload } = newProps.getListClass
					if (fetching == false && error == null && payload) {
						this.setState({ tempClasses: payload });
					}
				}

				if (newProps.getClassByStudent) {
					const { fetching, error, payload } = newProps.getClassByStudent
					if (fetching == false && error == null && payload) {
						this.setState({ tempUserClass: payload, statusLoading: false })
						// this.requestFaqList = false;
						// this.tempFaqData = [...this.tempFaqData, ...data]
						// this.setState({ faqListdata: [...this.state.faqListdata, ...data],  });
					}
				}
			}


		}
	}

	// readAllProfessional = async (items) => {
	// 	let professionals = []
	// 	for (var index in items) {
	// 		let docUser = await db.collection('tbl_class').where('key', '==', `${items[index].classId}`).get()
	// 		let objectData = { ...docUser._docs[0]._data }
	// 		professionals.push(objectData)
	// 	}
	// 	return this.setState({ classData: professionals, statusLoading: false })
	// }

	renderItemList = ({ item, index }) => {
		console.tron.log(item)
		return (
			<TouchableOpacity
				onPress={() => this.clickOnEachClass(item)}
				style={{
					width: '44%',
					height: 'auto',
					backgroundColor: 'white',
					justifyContent: 'flex-start',
					alignItems: 'center',
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 4,
					},
					shadowOpacity: 0.30,
					shadowRadius: 4.65,
					elevation: 8,
					borderRadius: 5,
					marginHorizontal: 5,
					marginBottom: 15,
				}}
			>
				<View style={{ justifyContent: "center", width: "100%" }}>
					<Image
						source={item.subject == "Computer" ? Images.computer : item.subject == "Khmer" ? Images.khicon : item.subject == "English" ? Images.english : Images.chinese}
						style={{ width: '100%', height: 150, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
					/>
				</View>
				<View style={{ alignItems: 'center', justifyContent: "center", width: "100%", paddingVertical: 15, backgroundColor: 'white', borderRadius: 5, paddingLeft: 20, }}>
					<Text style={{ color: Colors.main_color, width: '100%', textAlign: 'left', fontWight: "bold", fontSize: 14, marginLeft: 10, marginBottom: 5 }} >
						{item.name}
					</Text>
					<View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: 10, }}>
						<Icon name={item.status ? "check-circle" : "times-circle"} type='FontAwesome' style={{ fontSize: 17, color: item.status ? "#009933" : "#e60000", }} />
						<Text style={{ color: Colors.main_color, width: "80%", textAlign: 'left', fontSize: 12, marginLeft: 10, }} >
							{item.status ? "Active" : "Inactive"}
						</Text>

					</View>
				</View>
			</TouchableOpacity>
		);
	};

	clickOnEachClass = (eachData) => {
		Actions.MyClassDetailScreen({ classDetail: eachData });
	};
	render() {
		const { statusLoading, classData, userData, tempClasses, tempUserClass, teacherClass } = this.state;
		if (statusLoading) return <Loading />;

		let data = []
		if (userData.data.role == 'student') {
			this.state.tempClasses.map((item, index) => {
				tempUserClass.classes.map((eachItem, eachindex) => {
					if (eachItem == item.classId) {
						data.push(item)
					}
				})
			})
		} else {
			data = teacherClass
		}

		return (
			<View style={{ flex: 1, backgroundColor: Colors.white }}>
				<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
					<Text style={{ fontSize: 26, fontWeight: 'bold', color: Colors.main_color, marginTop: 5 }}>{userData.data.username}</Text>
					<Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.main_color, marginVertical: 5 }}>{userData.data.phone}</Text>
				</View>
				{/* <View style={{ margin: 10, alignItems: 'center' }}>
					<Text style={{ fontSize: 24, color: "black", fontWight: "bold", color: Colors.main_color }}>
						{userData.data.username}
					</Text>
					<Text style={{ fontSize: 18, color: "black", fontWight: "bold", color: Colors.main_color }}>
						{userData.data.phone}
					</Text>
				</View> */}
				<FlatList
				style={{paddingHorizontal: 10}}
					data={data}
					numColumns={2}
					columnWrapperStyle={{justifyContent: 'space-between'}}
					renderItem={this.renderItemList}
					keyExtractor={(item, index) => index.toString}
				/>
				{/*<ScrollView scrollEventThrottle={0.2} style={{ flex: 1, marginTop: 10 }} showsVerticalScrollIndicator={false}>
					 <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start', width: '100%', paddingHorizontal: 10, }}>  
					{data.map((item, index) => {
						return (
							
						)
					})
					}
					  </View>
				</ScrollView> */}
			</View>

		);
	}
}
const mapStateToProps = state => {
	return {
		tempUser: state.tempUser,
		getClassByStudent: state.getClassByStudent,
		getListClass: state.getListClass,
		getClassByTeacher: state.getClassByTeacher

	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		requestClassByStudent: (data) => dispatch(ClassByStudentAction.classByStudentRequest(data)),
		requestListClassByTeacher: (data) => dispatch(ListClassByTeacherAction.listClassByTeacherRequest(data)),

		requestListClass: () => dispatch(ListClassAction.listClassRequest()),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MyClassScreen);
