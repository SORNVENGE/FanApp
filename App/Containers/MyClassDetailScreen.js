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
	Alert,
	ToastAndroid,
	Platform
} from "react-native";
import { Icon } from 'native-base';
import ListStudentByClassAction from '../Redux/ListStudentByClassRedux'
import ListStudentAction from '../Redux/ListStudentRedux'
import ListLessionByClassAction from '../Redux/ListLessionByClassRedux'
import DeleteLessionByClassAction from '../Redux/DeleteLessionByClassRedux'
import _ from 'lodash'
import { Actions } from "react-native-router-flux";
import { Images, Colors, Metrics, Fonts } from "../Themes";
import FilePickerManager from "react-native-file-picker";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import CloudFireStoreUserHelper from "../Services/CloudFireStoreUserHelper";
import Loading from "../Components/Loading";
import Pdf from "react-native-pdf";
import I18n from './I18n';
import { UIActivityIndicator, BallIndicator } from 'react-native-indicators';
import * as Progress from 'react-native-progress';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const db = firebase.firestore();
class MyClassDetailScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: props.tempUser,
			classData: props.classDetail,
			// classId: props.classDetail.user_id,
			studentData: [],
			documentData: [],
			lessionData: [],
			subjectData: [],
			levelData: [],
			sessionData: [],
			subjectName: props.classDetail ? props.classDetail.subject : '',
			sessionName: props.classDetail ? props.classDetail.session : '',
			levelName: props.classDetail ? props.classDetail.level : '',
			roleType: props.tempUser ? props.tempUser.data.role.toLowerCase() : '',
			index: props.index,
			statusLoading: false,
			statusLoadingLession: true,
			statusLoadingStudent: true,
			tempStudentInClass: [],
			tempStudent: [],
			tap: [
				{
					key: "Information",
					title: "Information"
				},
				// {
				// 	key: "Document File",
				// 	title: "Document File"
				// },
				{
					key: "Lession",
					title: "Lesson"
				}
			],
			key_tab: props.key_tab ? props.key_tab : "Information"
		};
		this.type_clicked = "Information";
	}

	componentWillReceiveProps(newProps) {
		if (Actions.currentScene == "MyClassDetailScreen") {

			if (newProps.getListStudent) {
				const { fetching, error, payload } = newProps.getListStudent
				if (fetching == false && error == null && payload) {
					this.setState({ tempStudent: payload, statusLoading: false, statusLoadingStudent: false});
				}
			}
			if (newProps.getListStudentByClass) {
				const { fetching, error, payload } = newProps.getListStudentByClass

				if (fetching == false && error == null && payload) {
					this.setState({ tempStudentInClass: payload, statusLoading: false, statusLoadingStudent: false })
				}
			}

			if (newProps.getListLessionByClass) {
				const { fetching, error, payload } = newProps.getListLessionByClass
				if (fetching == false && error == null && payload) {
					this.setState({ lessionData:[...payload] , statusLoading: false, statusLoadingLession: false })
					// this.requestFaqList = false;
					// this.tempFaqData = [...this.tempFaqData, ...data]
					// this.setState({ faqListdata: [...this.state.faqListdata, ...data],  });
				}
			}


			if (newProps.deleteLessionByClass.fetching == false && this.props.deleteLessionByClass.fetching == true && newProps.deleteLessionByClass.error == null) {
				if (newProps.deleteLessionByClass.payload) {
					this.setState({ statusLoading: false , statusLoadingLession: false})
					ToastAndroid.showWithGravityAndOffset("Lession Deleted!", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 10, 10);
				}
			}

		}
	}
	componentWillMount = () => {
		const { userData, classData, key_tab } = this.state
		this.type_clicked = key_tab
		var classId = classData.classId
		let data = {
			classId: classId,
		}

		this.props.requestListStudent()
		this.props.requestListStudentByClass(data)
		this.props.requestListLessionByClass(data)

		// this.setState({ statusLoading: true });
		// var teacherId = userData.data.user_id;
		// var teacherName = userData.data.username;
		// var roleId = userData.data.roleId;
		// var subjectKey = classData.subjectId;
		// var levelKey = classData.levelId;
		// var sessionKey = classData.sessionId;
		// var classId = classData.key
		// CloudFireStoreUserHelper.readSubjectById(subjectKey, response => {
		// 	if (response) {
		// 		this.setState({ subjectName: response[0].subjectName });
		// 	} else {
		// 		this.setState({ statusLoading: false });
		// 	}
		// });
		// CloudFireStoreUserHelper.readUserRoleById(roleId, response => {
		// 	if (response) {
		// 		response.map((eachData, ind) => {
		// 			this.setState({ roleType: eachData.roleName });
		// 		})
		// 	} else {
		// 		this.setState({ statusLoading: false });
		// 	}
		// });
		// CloudFireStoreUserHelper.readLevelById(levelKey, response => {
		// 	if (response) {
		// 		this.setState({ levelName: response[0].levelName });
		// 	} else {
		// 		this.setState({ statusLoading: false });
		// 	}
		// });
		// CloudFireStoreUserHelper.readSessionById(sessionKey, response => {
		// 	if (response) {
		// 		this.setState({ sessionName: response[0].sessionName });
		// 	} else {
		// 		this.setState({ statusLoading: false });
		// 	}
		// });


		// CloudFireStoreUserHelper.readStudentByClassId(classId, response => {
		// 	if (response) {
		// 		this.setState({ studentData: response, statusLoading: false });
		// 	} else {
		// 		this.setState({ statusLoading: false });
		// 	}
		// });
		// CloudFireStoreUserHelper.readStudentClass(classId, response => {
		// 	if (response) {
		// 		this.readAllProfessional(response)
		// 	} else {
		// 		this.setState({ statusLoading: false });
		// 	}
		// });
	};

	readAllProfessional = async (items) => {
		let professionals = []
		for (var index in items) {
			let docUser = await db.collection('tbl_user').where('key', '==', `${items[index].studentId}`).get()
			let objectData = { ...docUser._docs[0]._data }
			professionals.push(objectData)
		}
		return this.setState({ studentData: professionals, statusLoadingStudent: false })
	}

	handlePresstap = tab => {
		this.type_clicked = tab.key;
		const { userData, classData } = this.state
		var classId = classData.classId
		let data = {
			classId: classId,
		}
		this.setState({ statusLoadingStudent: true, statusLoadingLession: true })
		if (tab.key == 'Lession') {
			this.props.requestListLessionByClass(data)
		} else {
			this.props.requestListStudent()
			this.props.requestListStudentByClass(data)
		}
		this.setState({ tap: [...this.state.tap], key_tab: tab.key });

	};
	_renderTab = (item, index) => {
		IsTab = this.state.key_tab == item.key ? true : false;
		return (
			<TouchableOpacity
				onPress={() => this.handlePresstap(item)}
				style={{
					backgroundColor: Colors.main_color,
					width: "50%",
					alignItems: "center",
					justifyContent: "center",
					// marginRight: index == 2 ? 0 : 5,
					// borderBottomWidth: IsTab ? 5 : 0,
					// borderBottomColor: 'white',
					marginBottom: 5,
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 4,
					},
					shadowOpacity: 0.30,
					shadowRadius: 4.65,
					elevation: 8,
				}}
			>
				<Icon type="FontAwesome" name={index == 0 ? "info" : "book"} style={{ fontSize: 25, color: IsTab ? Colors.white : '#b3b3b3', padding: 5 }} />
				<Text
					style={{
						textAlign: "center",
						fontWeight: 'bold',
						fontSize: 15,
						paddingVertical: 5,

						color: IsTab ? Colors.white : '#b3b3b3'
					}}
				>
					{item.title}
				</Text>
				<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
					<View style={{
						width: '100%', height: 3, backgroundColor: IsTab ? 'white' : Colors.main_color, shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 4,
						},
						shadowOpacity: 0.30,
						shadowRadius: 4.65,
						elevation: 8,
					}} />
					<View style={{
						width: '100%', height: 3, backgroundColor: IsTab ? 'white' : Colors.main_color, shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 4,
						},
						shadowOpacity: 0.30,
						shadowRadius: 4.65,
						elevation: 8,
					}} />
				</View>
			</TouchableOpacity>
		);
	};
	handleOnUploadFile = () => {
		const { classData, userData } = this.state;
		var teacherId = userData.data ? userData.data.userId : '';
		if (this.type_clicked == 'Lession') {
			if (Actions.currentScene == 'MyClassDetailScreen') {
				Actions.AddLessionScreen({ classData: classData, teacherId: teacherId })
			}
		} else {
			// FilePickerManager.showFilePicker(null, response => {
			// 	if (response.didCancel) {
			// 	} else if (response.error) {
			// 	} else {
			// 		this.setState({ statusLoading: true });
			// 		firebase
			// 			.storage()
			// 			.ref("/document/" + response.fileName)
			// 			.putFile(response.path)
			// 			.then(snapshot => {
			// 				var ext = snapshot.ref.substr(snapshot.ref.lastIndexOf(".") + 1);
			// 				var type = "";
			// 				if (ext == "jpeg" || ext == "jpg" || ext == "png") {
			// 					type = "image";
			// 				} else if (ext == "pdf") {
			// 					type = "pdf";
			// 				} else if (ext == "pptx") {
			// 					type = "pptx";
			// 				}

			// 				let mergeObj = {
			// 					created_date: firebase.firestore.FieldValue.serverTimestamp(),
			// 					file: snapshot.downloadURL,
			// 					fileName: response.fileName,
			// 					teacherId: teacherId,
			// 					title: "upload without title",
			// 					classId: classId,
			// 					type: type,
			// 					file_size: response.size
			// 				};
			// 				CloudFireStoreUserHelper.addDocumentByUser(mergeObj, response => {
			// 					if (response) {
			// 						CloudFireStoreUserHelper.readDocument(
			// 							classId,
			// 							teacherId,
			// 							response => {
			// 								if (response) {
			// 									this.setState({
			// 										documentData: response,
			// 										statusLoading: false
			// 									});
			// 								} else {
			// 								}
			// 							}
			// 						);
			// 					} else {
			// 						alert(" Please Check file before upload!!! ");
			// 					}
			// 				});
			// 				// this.setState({ statusIsProgress: false, progress_bar: 0 })
			// 				// if (Actions.currentScene == 'DocumentScreen') {
			// 				//     Actions.DocumentPreview({ selectedFile: mergeObj })
			// 				// }
			// 			})
			// 			.catch();
			// 	}
			// });
		}
	};
	_handlePress = item => {
		Actions.DocumentPreviewScreen({ selectedFile: item });
	};
	renderItemList = ({ item, index }) => {
		return (
			<TouchableOpacity
				onPress={() => this._handlePress(item)}
				style={{
					marginTop: index < 3 ? null : 5,
					padding: item.type == "image" ? 0 : 5,
					marginLeft: 5,
					marginRight: 5,
					marginBottom: 5,
					width: "30.8%",
					borderColor: Colors.border,
					borderWidth: 0.5,
					justifyContent: "center",
					alignItems: "center",
					borderRadius: 10
				}}
			>
				<View
					style={{
						width: item.type == "image" ? "100%" : null,
						height: item.type == "image" ? 80 : 72
					}}
				>
					<Image
						source={item.type == "image" ? { uri: item.file } : Images.pdf_icon}
						style={{
							marginTop: item.type == "image" ? -3 : 0,
							height: "100%",
							width: item.type == "image" ? "100%" : 70,
							borderTopRightRadius: item.type == "image" ? 10 : 0,
							borderTopLeftRadius: item.type == "image" ? 10 : 0
						}}
					/>
				</View>
				<Text style={{ padding: 2, fontSize: Fonts.size.medium }}>
					{item.fileName != ""
						? item.fileName.length > 13
							? item.fileName.substr(0, 9) + "..."
							: item.fileName
						: ""}
				</Text>
			</TouchableOpacity>
		);
	};

	_handleNextScreen = (item, index) => {
		if (Actions.currentScene == 'MyClassDetailScreen') {
			Actions.LessionScreen({ item: item, classDetail: this.state.classData, roleType: this.state.roleType, index: index })
		}
	}
	onDeleteLession = (item, index) => {
		// CloudFireStoreUserHelper.deleteLession(item.id)
		let data = {
			classId: item.classId,
			lessionId: item.lessonId
		}
		this.props.requestDeleteLessionByClass(data)
		this.props.requestListLessionByClass(data)

		let { lessionData } = this.state
		var newLessions = [];
		newLessions = [].concat(lessionData);
		newLessions.splice(index, 1);
		this.setState({ lessionData: [...newLessions], statusLoading: true });


	}
	_handleDeteleVideo = (item, index) => {
		Alert.alert(
			"Delete This Lesson!",
			I18n.t('are_you_sure'),
			[
				{
					text: I18n.t('no'),
					style: "cancel"
				},
				{ text: I18n.t('yes'), onPress: () => this.onDeleteLession(item, index) }
			],
			{ cancelable: false }
		);
	}

	renderItemView = ({ item, index }) => {
		const { roleType } = this.state
		return (
			<TouchableOpacity onPress={() => this._handleNextScreen(item, index)} style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 10, paddingHorizontal: 20, height: 'auto', }}>
				<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: Colors.main_color, paddingBottom: 10 }}>
					<Text style={{ fontWeight: 'bold', width: '70%', textAlign: 'left', color: Colors.main_color, fontSize: 16, }}>{item.title}</Text>
					{roleType == "student" ?
						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '30%', paddingRight: 10, }}>
							<Text style={{ width: '100%', textAlign: 'right', color: Colors.main_color, fontSize: 12, }}>Next</Text>
							<Icon type="Entypo" name="chevron-right" style={{ fontSize: 15, color: Colors.main_color, }} />
						</View>
						:
						<TouchableOpacity onPress={() => this._handleDeteleVideo(item, index)} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '30%', paddingRight: 10, }}>
							<Text style={{ width: '100%', textAlign: 'right', color: '#ff0000', fontSize: 12, }}>Delete</Text>
							<Icon type="Entypo" name="chevron-right" style={{ fontSize: 15, color: '#ff0000', }} />
						</TouchableOpacity>
					}
				</View>
			</TouchableOpacity>
		)
	}


	render() {
		const {
			tap,
			statusLoading,
			documentData,
			lessionData,
			statusLoadingStudent,
			subjectName,
			levelName,
			sessionName,
			roleType,
			classData,
			statusLoadingLession,
			tempStudent,
			tempStudentInClass
		} = this.state;

		if (statusLoading) return <Loading />;
		let data = []
		if (tempStudentInClass.students) {
			tempStudent.map((item, index) => {
				tempStudentInClass.students.map((eachItem, eachindex) => {
					if (eachItem == item.userId && item.role.toLowerCase() == 'student') {
						data.push(item)
					}
				})
			})
		}
		let sortLessionData = _.orderBy(lessionData, [item => item.title], ['asc']);
		return (
			<View style={{ flex: 1, backgroundColor: Colors.white }}>
				<View style={{ flex: 5.3 }}>

					<View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', backgroundColor: 'white' }}>
						{/* <FlatList
							style={{ marginTop: Metrics.baseMargin }}
							data={tap}
							numColumns={2}
							renderItem={this._renderTab}
							keyExtractor={(item, index) => index.toString()}
						/> */}
						{this.state.tap.map((item, index) => {
							return (
								this._renderTab(item, index)
							)
						})
						}
					</View>

					{this.type_clicked == "Information" ? (
						<ScrollView style={{ paddingBottom: 5, }}>
							<View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', padding: 10, }}>
								<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
									<Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.main_color, marginVertical: 5, marginBottom: 10 }}>Class : {classData.name}</Text>
									<Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.main_color, marginVertical: 5, marginBottom: 10 }}>Teacher : {classData.teacher}</Text>
								</View>
								<View style={{
									borderRadius: 5, width: '100%', justifyContent: 'flex-start', alignItems: 'center', padding: 20, backgroundColor: 'white', shadowColor: "#000",
									shadowOffset: {
										width: 0,
										height: 4,
									},
									shadowOpacity: 0.30,
									shadowRadius: 4.65,
									elevation: 8,
								}}>
									<View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', paddingVertical: 5 }}>
										<Icon type="AntDesign" name="book" style={{ fontSize: 20, color: Colors.main_color, marginRight: 15 }} />
										<Text style={{ fontSize: 16,  marginRight: 5, color: Colors.main_color }}>Subject: </Text>
										<Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.main_color }}>{subjectName}</Text>
									</View>
									<View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', paddingVertical: 5 }}>
										<Icon type="FontAwesome" name="signal" style={{ fontSize: 20, color: Colors.main_color, marginRight: 15 }} />
										<Text style={{ fontSize: 16, marginRight: 5,  color: Colors.main_color }}>Level: </Text>
										<Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.main_color }}>{levelName}</Text>

									</View>
									<View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', paddingVertical: 5 }}>
										<Icon type="Entypo" name="back-in-time" style={{ fontSize: 20, color: Colors.main_color, marginRight: 15 }} />
										<Text style={{ fontSize: 16, marginRight: 5,   color: Colors.main_color }}>Session: </Text>

										<Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.main_color }}>{sessionName}</Text>
									</View>
								</View>

							</View>

							<View style={{ flex: 1, }}>
								{statusLoadingStudent ?
									<UIActivityIndicator color={Colors.main_color} size={40} style={{marginTop: 30}} />
									:
									data.length >= 1 ?
									<ScrollView>

										{data.map((eachStudent, ind) => {
											return (
												<TouchableOpacity
													style={{
														flexDirection: 'row',
														backgroundColor: ind % 2 == 0 ? '#cccccc' : '#f2f2f2',
														justifyContent: 'flex-start',
														alignItems: 'center',
													}}
												>
													<View style={{ width: '100%', padding: 10, justifyContent: "space-between", flexDirection: "row", alignItems: 'center' }}>
														<Image
															source={Images.profile}
															style={{ width: 60, height: 60, borderRadius: 60 / 2, }}
														/>
														<View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
															<Text style={{ width: "100%", fontSize: 18, color: Colors.black, fontWeight: "bold", textAlign: 'left' }}>
																{eachStudent.username}
															</Text>
															<Text style={{ width: "100%", fontSize: 14, color: Colors.black, textAlign: 'left', marginTop: 5 }}>
																{eachStudent.phone}
															</Text>
														</View>
													</View>
												</TouchableOpacity>
											);
										})}
									</ScrollView>
									:
									<Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.main_color, marginVertical: 5, marginBottom: 10, width: '100%', textAlign: 'center', marginTop: 20 }}>No Student</Text>

								}
							</View>
						</ScrollView>
					) : this.type_clicked == "Lession" ? (
						<View style={{ padding: 10 }}>
							{statusLoadingLession ?
								<UIActivityIndicator color={Colors.main_color} size={40} style={{marginTop: 30}} />
								:
								<FlatList
									style={{ width: '100%', backgroundColor: 'white', marginBottom: 120 }}
									data={sortLessionData}
									renderItem={this.renderItemView}
									keyExtractor={(item, index) => index.toString()} />
							}
						</View>
					) : (
								<View style={{ padding: 10 }}>
									<View style={{ width: "90%", alignSelf: "center" }}>
										<FlatList
											data={documentData}
											numColumns={3}
											renderItem={this.renderItemList}
											keyExtractor={(item, index) => index.toString}
										/>
									</View>
								</View>
							)}
				</View>
				{this.type_clicked == "Information" ? null :
					roleType == "student" ? null :
						(
							<TouchableOpacity
								onPress={() => this.handleOnUploadFile()}
								style={{
									position: "absolute",
									bottom: 0,
									backgroundColor: Colors.main_color,
									width: "100%",
									height: 50,
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<Text
									style={{
										color: "white",
										fontSize: Fonts.size.medium,
										fontWeight: "bold"
									}}
								>
									Add Lesson
								</Text>
							</TouchableOpacity>
						)}
			</View>
		);
	}
}
const mapStateToProps = state => {
	return {
		tempUser: state.tempUser,
		getListStudentByClass: state.getStudentByClass,
		getListLessionByClass: state.getLessionByClass,
		getListStudent: state.getListStudent,
		deleteLessionByClass: state.deleteLessionByClass,

	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		requestListStudentByClass: (data) => dispatch(ListStudentByClassAction.listStudentByClassRequest(data)),
		requestListStudent: () => dispatch(ListStudentAction.listStudentRequest()),
		requestListLessionByClass: (data) => dispatch(ListLessionByClassAction.listLessionByClassRequest(data)),
		requestDeleteLessionByClass: (data) => dispatch(DeleteLessionByClassAction.deleteLessionByClassRequest(data)),

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MyClassDetailScreen);
