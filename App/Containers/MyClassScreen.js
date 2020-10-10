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
			statusLoading: false,
			tempClasses: [],
			userClasses: []
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
		let data = {
			studentId: '2',
		}
		this.props.requestListClass()
		this.props.requestClassByStudent(data)

	}

	componentWillReceiveProps(newProps) {
		if (Actions.currentScene == "MyClassScreen") {
			if (newProps.getListClass) {
				const { fetching, error, payload } = newProps.getListClass
				if (fetching == false && error == null && payload) {
					this.setState({ tempClasses: payload});
				}
			}

			if (newProps.getClassByStudent) {
				const { fetching, error, payload } = newProps.getClassByStudent
				if (fetching == false && error == null && payload) {
					let classesData = []
					this.state.tempClasses.map((item, index) => {
						 
						payload.classes.map((eachItem, eachindex) => {
							if (eachItem == item.classId) {
								classesData.push(item)
							}
						})
					})

					console.tron.log(classesData, 'dd')
					this.setState({ classData:classesData})
					// this.requestFaqList = false;
					// this.tempFaqData = [...this.tempFaqData, ...data]
					// this.setState({ faqListdata: [...this.state.faqListdata, ...data],  });
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

	_renderTab = ({ item, index }) => {
		console.tron.log(item)
		return (
			<TouchableOpacity
				onPress={() => this.clickOnEachClass(item)}
				style={{
					flex: 1,
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
						source={{
							uri:
								"https://dynamicmedia.zuza.com/zz/m/original_/a/f/af862213-8bf8-4113-8ac1-575e8d6951b3/shutterstock_356921618___Super_Portrait.jpg"
						}}
						style={{ width: '100%', height: 150, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
					/>
				</View>
				<View style={{ alignItems: 'center', justifyContent: "center", width: "100%", paddingVertical: 15, backgroundColor: 'white', borderRadius: 5, paddingLeft: 20, }}>
					<Text style={{ color: Colors.main_color, width: '100%', textAlign: 'left', fontWight: "bold", fontSize: 14, marginLeft: 10, marginBottom: 5 }} >
						{item.name}
					</Text>
					<View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: 10, }}>
						<Icon name={item.status == 'true' ? "check-circle" : "times-circle"} type='FontAwesome' style={{ fontSize: 17, color: item.status == 'true' ? "#009933" : "#e60000", }} />
						<Text style={{ color: Colors.main_color, width: "80%", textAlign: 'left', fontSize: 12, marginLeft: 10, }} >
							{item.status == 'true' ? "Active" : "Inactive"}
						</Text>

					</View>
				</View>
			</TouchableOpacity>
		);
	};

	clickOnEachClass = eachData => {
		Actions.MyClassDetailScreen({ classDetail: eachData });
	};
	render() {
		const { statusLoading, classData, userData } = this.state;
		if (statusLoading) return <Loading />;
		return (
			<View style={{ flex: 1, backgroundColor: Colors.white }}>
				<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
					<Text style={{ fontSize: 30, fontWeight: 'bold', color: Colors.main_color }}>{userData.data.username}</Text>
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
				<View style={{ padding: 10 }}>
					<FlatList
						style={{ marginTop: Metrics.baseMargin, }}
						data={classData}
						numColumns={2}
						renderItem={this._renderTab}
						keyExtractor={(item, index) => index.toString()}
					/>
				</View>
			</View>
		);
	}
}
const mapStateToProps = state => {
	return {
		tempUser: state.tempUser,
		getClassByStudent: state.getClassByStudent,
		getListClass: state.getListClass,

	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		requestClassByStudent: (data) => dispatch(ClassByStudentAction.classByStudentRequest(data)),
		requestListClass: () => dispatch(ListClassAction.listClassRequest()),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MyClassScreen);
