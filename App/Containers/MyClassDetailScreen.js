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
	Platform
} from "react-native";
import { Icon } from 'native-base';
import { Actions } from "react-native-router-flux";
import { Images, Colors, Metrics, Fonts } from "../Themes";
import FilePickerManager from "react-native-file-picker";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import CloudFireStoreUserHelper from "../Services/CloudFireStoreUserHelper";
import Loading from "../Components/Loading";
import Pdf from "react-native-pdf";
import I18n from './I18n';
import { UIActivityIndicator , BallIndicator} from 'react-native-indicators';
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
			classId: props.classDetail.user_id,
			studentData: [],
			documentData: [],
			lessionData: [],
			subjectData: [],
			levelData: [],
			sessionData: [],
			subjectName: "",
			sessionName: "",
			levelName: "",
			roleType: "",
			index: props.index,
			statusLoading: false,
			statusLoadingLession: false,
			statusLoadingStudent: true,

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
					title: "Lession"
				}
			],
			key_tab: "Information"
		};
		this.type_clicked = "Information";
	}
	componentWillMount = () => {
		const { userData, classData } = this.state;
		this.setState({ statusLoading: true });
		var teacherId = userData.data.user_id;
		var teacherName = userData.data.username;
		var roleId = userData.data.roleId;
		var subjectKey = classData.subjectId;
		var levelKey = classData.levelId;
		var sessionKey = classData.sessionId;
		var classId = classData.key
		console.tron.log(classData)

		CloudFireStoreUserHelper.readSubjectById(subjectKey, response => {
			if (response) {
				this.setState({ subjectName: response[0].subjectName });
			} else {
				this.setState({ statusLoading: false });
			}
		});
		CloudFireStoreUserHelper.readUserRoleById(roleId, response => {
			if (response) {
				response.map((eachData, ind) => {
					this.setState({ roleType: eachData.roleName });
				})
			} else {
				this.setState({ statusLoading: false });
			}
		});
		CloudFireStoreUserHelper.readLevelById(levelKey, response => {
			if (response) {
				this.setState({ levelName: response[0].levelName });
			} else {
				this.setState({ statusLoading: false });
			}
		});
		CloudFireStoreUserHelper.readSessionById(sessionKey, response => {
			if (response) {
				this.setState({ sessionName: response[0].sessionName });
			} else {
				this.setState({ statusLoading: false });
			}
		});


		CloudFireStoreUserHelper.readStudentByClassId(classId, response => {
			if (response) {
				this.setState({ studentData: response, statusLoading: false });
			} else {
				this.setState({ statusLoading: false });
			}
		});
		CloudFireStoreUserHelper.readStudentClass(classId, response => {
			if (response) {
				this.readAllProfessional(response)
			} else {
				this.setState({ statusLoading: false });
			}
		});
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
		this.setState({ tap: [...this.state.tap], key_tab: tab.key });
		if (tab.key == 'Lession') {
			this.setState({ statusLoadingLession: true })
			CloudFireStoreUserHelper.readLession(this.state.classData.key, response => {
				if (response) {
					this.setState({ lessionData: response, statusLoadingLession: false });
				}
			});
		}
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
		const { classData } = this.state;
		var teacherId = classData.teacherId;
		var classId = classData.key
		if (this.type_clicked == 'Lession') {
			if (Actions.currentScene == 'MyClassDetailScreen') {
				Actions.AddLessionScreen({ classId: classId })
			}
		} else {
			FilePickerManager.showFilePicker(null, response => {
				if (response.didCancel) {
				} else if (response.error) {
				} else {
					this.setState({ statusLoading: true });
					firebase
						.storage()
						.ref("/document/" + response.fileName)
						.putFile(response.path)
						.then(snapshot => {
							var ext = snapshot.ref.substr(snapshot.ref.lastIndexOf(".") + 1);
							var type = "";
							if (ext == "jpeg" || ext == "jpg" || ext == "png") {
								type = "image";
							} else if (ext == "pdf") {
								type = "pdf";
							} else if (ext == "pptx") {
								type = "pptx";
							}

							let mergeObj = {
								created_date: firebase.firestore.FieldValue.serverTimestamp(),
								file: snapshot.downloadURL,
								fileName: response.fileName,
								teacherId: teacherId,
								title: "upload without title",
								classId: classId,
								type: type,
								file_size: response.size
							};
							CloudFireStoreUserHelper.addDocumentByUser(mergeObj, response => {
								if (response) {
									CloudFireStoreUserHelper.readDocument(
										classId,
										teacherId,
										response => {
											if (response) {
												this.setState({
													documentData: response,
													statusLoading: false
												});
											} else {
											}
										}
									);
								} else {
									alert(" Please Check file before upload!!! ");
								}
							});
							// this.setState({ statusIsProgress: false, progress_bar: 0 })
							// if (Actions.currentScene == 'DocumentScreen') {
							//     Actions.DocumentPreview({ selectedFile: mergeObj })
							// }
						})
						.catch();
				}
			});
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
	onDeleteLession = (item) => {
		CloudFireStoreUserHelper.deleteLession(item.id)
	}
	_handleDeteleVideo = (item) => {
		Alert.alert(
			"Delete This Lession!",
			I18n.t('are_you_sure'),
			[
				{
					text: I18n.t('no'),
					style: "cancel"
				},
				{ text: I18n.t('yes'), onPress: () => this.onDeleteLession(item) }
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
					{roleType == "Student" ?
						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '30%', paddingRight: 10, }}>
							<Text style={{ width: '100%', textAlign: 'right', color: Colors.main_color, fontSize: 12, }}>Next</Text>
							<Icon type="Entypo" name="chevron-right" style={{ fontSize: 15, color: Colors.main_color, }} />
						</View>
						:
						<TouchableOpacity onPress={() => this._handleDeteleVideo(item)} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '30%', paddingRight: 10, }}>
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
			statusLoadingLession
		} = this.state;
		if (statusLoading) return <Loading />;
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
								<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center',  marginBottom: 10}}>
									<Text style={{fontSize: 30, fontWeight: 'bold', color: Colors.main_color}}>C {this.state.index}</Text>
									<Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.main_color, marginVertical: 5}}>{classData.classname}</Text>
								</View>
								<View style={{borderRadius: 5, width: '100%', justifyContent: 'flex-start', alignItems: 'center', padding: 20 , backgroundColor: 'white', shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 4,
						},
						shadowOpacity: 0.30,
						shadowRadius: 4.65,
						elevation: 8, }}>
									<View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', paddingVertical: 5 }}>
										<Icon type="AntDesign" name="book" style={{ fontSize: 20, color: Colors.main_color, marginRight: 15}} />
										<Text style={{fontSize: 16, fontWeight: 'bold', color:Colors.main_color}}>{subjectName}</Text>
									</View>
									<View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', paddingVertical: 5 }}>
										<Icon type="FontAwesome" name="signal" style={{ fontSize: 20, color: Colors.main_color, marginRight: 15}} />
										<Text style={{fontSize: 16, fontWeight: 'bold', color: Colors.main_color}}>{levelName}</Text>
									</View>
									<View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', paddingVertical: 5 }}>
										<Icon type="Entypo" name="back-in-time" style={{ fontSize: 20, color: Colors.main_color, marginRight: 15}} />
										<Text style={{fontSize: 16, fontWeight: 'bold', color: Colors.main_color}}>{sessionName}</Text>
									</View>
								</View>

							</View>

							{/* <TouchableOpacity
								style={{
									marginTop: 10,
									shadowOpacity: 0.5,
									borderWidth: 0.4,
									borderColor: Colors.main_color,
									borderRadius: 15
								}}
							>
								<View
									style={{
										padding: 10,
										justifyContent: "space-between",
										flexDirection: "row"
									}}
								>
									<View style={{ width: "30%" }}>
										<Text
											style={{
												fontSize: 15,
												color: "black",
												fontWight: "bold"
											}}
										>
											{" "}
											Subject :{" "}
										</Text>
									</View>
									<View style={{ width: "80%" }}>
										<Text
											style={{
												fontSize: 17,
												color: Colors.black,
												fontWight: "bold"
											}}
										>
											{subjectName}
										</Text>
									</View>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									marginTop: 10,
									shadowOpacity: 0.5,
									borderWidth: 0.4,
									borderColor: Colors.main_color,
									borderRadius: 15
								}}
							>
								<View
									style={{
										padding: 10,
										justifyContent: "space-between",
										flexDirection: "row"
									}}
								>
									<View style={{ width: "30%" }}>
										<Text style={{ fontSize: 15, color: "black", fontWight: "bold" }}>
											{" "}
											Level :{" "}
										</Text>
									</View>
									<View style={{ width: "80%" }}>
										<Text
											style={{
												fontSize: 17,
												color: Colors.black,
												fontWight: "bold"
											}}
										>
											{levelName}
										</Text>
									</View>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									marginTop: 10,
									shadowOpacity: 0.5,
									borderWidth: 0.4,
									borderColor: Colors.main_color,
									borderRadius: 15
								}}
							>
								<View
									style={{
										padding: 10,
										justifyContent: "space-between",
										flexDirection: "row"
									}}
								>
									<View style={{ width: "30%" }}>
										<Text
											style={{
												fontSize: 15,
												color: "black",
												fontWight: "bold"
											}}
										>
											{" "}
											Session :{" "}
										</Text>
									</View>
									<View style={{ width: "80%" }}>
										<Text
											style={{
												fontSize: 17,
												color: Colors.black,
												fontWight: "bold"
											}}
										>
											{sessionName}
										</Text>
									</View>
								</View>
							</TouchableOpacity> */}
							{/* <Text style={{
								fontSize: 18,
								fontWeight: "bold",
								width: '100%',
								textAlign: 'center',
								paddingVertical: 15,
								color: Colors.main_color,
							}} >
								List Student in class
							</Text> */}
							<View style={{ height: "70%", justifyContent: 'flex-start', alignItems: 'center' }}>
								{statusLoadingStudent ?
								 
									<View>
									</View>
									 
									 :
									<ScrollView>
										{this.state.studentData.map((eachStudent, ind) => {
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
															source={{ uri: "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_640.png" }}
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
								}
							</View>
						</ScrollView>
					) : this.type_clicked == "Lession" ? (
						<View style={{ padding: 10 }}>
							{statusLoadingLession ?
								<Loading /> :
								<FlatList
									style={{ width: '100%', backgroundColor: 'white' }}
									data={lessionData}
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
					roleType == "Student" ? null :
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
									Upload Lession
								</Text>
							</TouchableOpacity>
						)}
			</View>
		);
	}
}
const mapStateToProps = state => {
	return {
		tempUser: state.tempUser
	};
};

export default connect(
	mapStateToProps,
	null
)(MyClassDetailScreen);
