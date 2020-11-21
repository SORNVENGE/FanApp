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
import UploadFileAction from '../Redux/UploadFileRedux'
import ListDocByLessonAction from '../Redux/ListDocByLessonRedux'
import UploadDocumentFilesAction from '../Redux/UploadDocumentFilesRedux'

import { UIActivityIndicator, BallIndicator } from 'react-native-indicators';


const db = firebase.firestore();
class LessionScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: props.tempUser,
			classData: props.classDetail,
			classId: props.classDetail.user_id ? props.classDetail.user_id : '',
			item: props.item,
			studentData: [],
			documentData: [],
			lessionData: [],
			subjectData: [],
			levelData: [],
			sessionData: [],
			subjectName: "",
			sessionName: "",
			levelName: "",
			roleType: props.roleType,
			statusLoading: true,
			statusLoadingLession: false,
			tap: [
				{
					key: "Document",
					title: "Document"
				},
				{
					key: "Video",
					title: "Video"
				}
			],
			key_tab: props.key_tab ? props.key_tab : "Document"
		};
		this.type_clicked = "Document";
		this.lessionIdForUpload = ''
		this.fileNameForUpload = ''
		this.type = ''
	}
	componentWillReceiveProps(newProps) {
		this.type_clicked = this.state.key_tab;
		if (Actions.currentScene == "LessionScreen") {
			if (newProps.getListDocByLesson) {
				const { fetching, error, payload } = newProps.getListDocByLesson

				if (fetching == false && error == null && payload) {
					this.setState({ documentData: [...payload], statusLoading: false })
					// Actions.LessionScreen({type: 'reset', item: this.state.item, classDetail: this.state.classData})
				}
			}

			if (newProps.uploadFile.fetching == false && this.props.uploadFile.fetching == true && newProps.uploadFile.error == null) {
				if (newProps.uploadFile.payload) {
					const { item } = this.state
					var lessonId = item.lessonId
					let data = {
						lessionId: lessonId,
					}
					this.props.requestListDocByLesson(data)
					this.setState({ statusLoading: false });

				} else if (newProps.uploadFile.message == '404') {
					ToastAndroid.showWithGravityAndOffset("Please check username and password again!", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 10, 10);
					this.setState({ statusLoading: false });
				}
			}

			if (newProps.uploadDocumentFile.fetching == false && this.props.uploadDocumentFile.fetching == true && newProps.uploadDocumentFile.error == null) {
				if (newProps.uploadDocumentFile.payload) {
					const { fetching, error, payload } = newProps.uploadDocumentFile
					
					let data = {
						lessionId: this.lessionIdForUpload,
						name: this.fileNameForUpload,
						path: payload.path,
						isFile: true,
					}

					this.props.requestUploadFile(data)
					this.setState({ statusLoading: false });

				} else if (newProps.uploadFile.message == '404') {
					ToastAndroid.showWithGravityAndOffset("Please check username and password again!", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 10, 10);
					this.setState({ statusLoading: false });
				}
			}

		}
	}
	componentWillMount = () => {
		const { item } = this.state
		var lessonId = item.lessonId
		let data = {
			lessionId: lessonId,
		}
		this.props.requestListDocByLesson(data)
	};



	handlePresstap = tab => {
		this.type_clicked = tab.key;
		this.setState({ tap: [...this.state.tap], key_tab: tab.key });
		if (tab.key == 'Video') {

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
				<Icon type="FontAwesome" name={index == 0 ? "file-pdf-o" : "file-video-o"} style={{ fontSize: 25, color: IsTab ? Colors.white : '#b3b3b3', padding: 5 }} />
				<Text
					style={{
						textAlign: "center",
						fontWeight: 'bold',
						fontSize: 15,
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
		const { classData, item } = this.state;
		var teacherId = classData.teacherId;
		var classId = classData.key
		var lessonId = item.lessonId
		if (this.type_clicked == 'Video') {
			if (Actions.currentScene == 'LessionScreen') {
				Actions.AddVideoScreen({ classId: classId, item: item, classData: classData })
			}
		} else {
			FilePickerManager.showFilePicker(null, response => {
				if (response.didCancel) {
				} else if (response.error) {
				} else {
					this.setState({ statusLoading: true });
					const form = new FormData();

					form.append('file', {
						uri: "file://" + response.path,
						type: response.type,
						name: response.fileName,
					});
					this.lessionIdForUpload = lessonId
					this.fileNameForUpload = response.fileName
					this.props.requestUploadDocumentFiles(form)

					// firebase
					// 	.storage()
					// 	.ref("/document/" + response.fileName)
					// 	.putFile(response.path)
					// 	.then(snapshot => {
					// 		var ext = snapshot.ref.substr(snapshot.ref.lastIndexOf(".") + 1);
					// 		var type = "";
					// 		if (ext == "jpeg" || ext == "jpg" || ext == "png") {
					// 			type = "image";
					// 		} else if (ext == "pdf") {
					// 			type = "pdf";
					// 		} else if (ext == "pptx") {
					// 			type = "pptx";
					// 		}

					// 		let mergeObj = {
					// 			created_date: firebase.firestore.FieldValue.serverTimestamp(),
					// 			file: snapshot.downloadURL,
					// 			lessionId: item.id,
					// 			fileName: response.fileName,
					// 			teacherId: teacherId,
					// 			title: "upload without title",
					// 			classId: classId,
					// 			type: type,
					// 			file_size: response.size
					// 		};
					// 		let data = {
					// 			lessionId: lessonId,
					// 			name: response.fileName,
					// 			path: snapshot.downloadURL,
					// 			isFile: true,

					// 		}
					// 		this.props.requestUploadFile(data)

					// 		// this.setState({ statusIsProgress: false, progress_bar: 0 })
					// 		// if (Actions.currentScene == 'DocumentScreen') {
					// 		//     Actions.DocumentPreview({ selectedFile: mergeObj })
					// 		// }
					// 	})
					// 	.catch();
				}
			});
		}
	};
	_handlePress = item => {
		Actions.DocumentPreviewScreen({ selectedFile: item, classData: this.state.classData, item: this.state.item,  });
	};
	renderItemList = ({ item, index }) => {
		var ext = item.name.substr(item.name.lastIndexOf(".") + 1);
		var type = "";
		if (ext == "jpeg" || ext == "jpg" || ext == "png") {
			type = "image";
		} else if (ext == "pdf") {
			type = "pdf";
		}
		this.type = type
		return (
			<TouchableOpacity
				onPress={() => this._handlePress(item)}
				style={{
					marginTop: index < 3 ? null : 5,
					padding: type == "image" ? 0 : 5,
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
						width: type == "image" ? "100%" : null,
						height: type == "image" ? 75 : 72
					}}
				>
					<Image
						source={type == "image" ? { uri: 'https://fan-international-school.com/api'+ item.path } : Images.pdf_icon}
						style={{
							marginTop: type == "image" ? -3 : 0,
							height: '100%',
							width: type == "image" ? "100%" : 70,
							borderTopRightRadius: type == "image" ? 10 : 0,
							borderTopLeftRadius: type == "image" ? 10 : 0
						}}
					/>
				</View>
				<Text style={{ padding: 2, fontSize: Fonts.size.medium }}>
					{item.name != ""
						? item.name.length > 13
							? item.name.substr(0, 9) + "..."
							: item.name
						: ""}
				</Text>
			</TouchableOpacity>
		);
	};

	_handleNextScreen = (item, index) => {
		if (Actions.currentScene == 'LessionScreen') {
			Actions.ELearninVideoScreen({ item: item })
		}
	}
	_handleBackScreen = () => {
		if (Actions.currentScene == 'LessionScreen') {
			Actions.MyClassDetailScreen({ classDetail: this.state.classData, key_tab: 'Lession' })
		}
	}
	onDeleteVideo = (item) => {
		CloudFireStoreUserHelper.deleteVideo(item.id)
	}
	_handleDeteleVideo = (item) => {
		Alert.alert(
			"Delete Video!",
			I18n.t('are_you_sure'),
			[
				{
					text: I18n.t('no'),
					style: "cancel"
				},
				{ text: I18n.t('yes'), onPress: () => this.onDeleteVideo(item) }
			],
			{ cancelable: false }
		);
	}

	renderItemView = ({ item, index }) => {
		const { roleType } = this.state
		var res = item.path.replace("https://www.youtube.com/watch?v=", "");
		return (
			<TouchableOpacity onPress={() => this._handleNextScreen(item, index)} style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 10, paddingHorizontal: 20, height: 'auto', }}>
				<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: Colors.main_color, paddingBottom: 10 }}>
					<ImageBackground
						style={{ width: 100, height: 60, resizeMode: 'stretch', justifyContent: 'center', alignItems: 'center' }}
						source={{ uri: 'https://img.youtube.com/vi/' + res + '/default.jpg', }}
					>
						<Icon type="FontAwesome5" name="play" style={{ fontSize: 30, color: 'white', opacity: 0.7, }} />
					</ImageBackground>
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '70%', }}>
						<Text style={{ fontWeight: 'bold', width: '70%', textAlign: 'left', color: Colors.main_color, fontSize: 14, marginLeft: 10 }}>{item.title}</Text>
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
			subjectName,
			levelName,
			sessionName,
			roleType,
			userData,
			item,
			statusLoadingLession
		} = this.state;
		if (statusLoading) return <Loading />;
		let data = []
		if (this.type_clicked == "Video") {
			data = documentData.filter(function (data) {
				return !data.isFile;
			})
		} else {
			data = documentData.filter(function (data) {

				return data.isFile;
			})
		}


		return (
			<View style={{ flex: 1, backgroundColor: Colors.white }}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 56, backgroundColor: Colors.main_color }}>
					<TouchableOpacity onPress={() => this._handleBackScreen()} style={{ width: '10%', alignItems: 'flex-end' }}>
						<Icon name='arrowleft' type="AntDesign" style={{ color: Colors.white, fontSize: 26, fontWeight: "bold" }} />
					</TouchableOpacity>

					<View style={{ width: '80%' }}>
						<Text style={{ fontSize: Fonts.size.input, color: Colors.white, textAlign: 'center', }}>{item.title}</Text>
					</View>
					<View style={{ width: '10%' }} />
				</View>
				<View style={{ flex: 5.3 }}>
					<View
						style={{
							width: "100%"
						}}
					/>
					<View style={{ flexDirection: 'row', paddingBottom: 10, justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
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

					{this.type_clicked == "Video" ? (
						<View style={{ padding: 10 }}>
							{statusLoadingLession ?
								<UIActivityIndicator color={Colors.main_color} size={40} style={{ marginTop: 30 }} />
								:
								<FlatList
									style={{ width: '100%', backgroundColor: 'white' }}
									data={data}
									renderItem={this.renderItemView}
									keyExtractor={(item, index) => index.toString()} />
							}
						</View>
					) : (
							<View style={{ padding: 10 }}>
								<View style={{ width: "90%", alignSelf: "center" }}>
									<FlatList
										data={data}
										numColumns={3}
										renderItem={this.renderItemList}
										keyExtractor={(item, index) => index.toString}
									/>
								</View>
							</View>
						)}
				</View>
				{userData.data.role == "student" ? null :
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
								{this.type_clicked == "Document" ? 'Upload Document' : "Upload Video"}
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
		getListDocByLesson: state.getListDocByLesson,
		uploadFile: state.uploadFile,
		uploadDocumentFile: state.uploadDocumentFiles

	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		requestUploadFile: (data) => dispatch(UploadFileAction.uploadFileRequest(data)),
		requestListDocByLesson: (data) => dispatch(ListDocByLessonAction.listDocByLessonRequest(data)),
		requestUploadDocumentFiles: (data) => dispatch(UploadDocumentFilesAction.uploadDocumentFilesRequest(data)),

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(LessionScreen);
