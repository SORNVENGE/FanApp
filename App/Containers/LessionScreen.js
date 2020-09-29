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

const db = firebase.firestore();
class LessionScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: props.tempUser,
			classData: props.classDetail,
			classId: props.classDetail.user_id,
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
			statusLoading: false,
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
			key_tab: "Document"
		};
		this.type_clicked = "Document";
	}
	componentWillMount = () => {
		const {item} = this.state
		this.setState({statusLoading: true})
		CloudFireStoreUserHelper.readDocByLessionId(item.id, response => {
			if (response) {
				this.setState({ documentData: response, statusLoading: false });
			}
		});
	};



	handlePresstap = tab => {
		this.type_clicked = tab.key;
		this.setState({ tap: [...this.state.tap], key_tab: tab.key });
		if (tab.key == 'Video') {
			this.setState({ statusLoadingLession: true })
			CloudFireStoreUserHelper.readElearningVideo(this.state.item.id, response => {
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
		if (this.type_clicked == 'Video') {
			if (Actions.currentScene == 'LessionScreen') {
				Actions.AddVideoScreen({ classId: classId, item: item })
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
								lessionId: item.id,
								fileName: response.fileName,
								teacherId: teacherId,
								title: "upload without title",
								classId: classId,
								type: type,
								file_size: response.size
							};
							CloudFireStoreUserHelper.addDocumentByUser(mergeObj, response => {
								if (response) {
									// CloudFireStoreUserHelper.readDocument(
									// 	classId,
									// 	teacherId,
									// 	response => {
									// 		if (response) {
												this.setState({
													// documentData: response,
													statusLoading: false
												});
									// 		} else {
									// 		}
									// 	}
									// );
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
		if (Actions.currentScene == 'LessionScreen') {
			Actions.ELearninVideoScreen({ item: item })
		}
	}
	_handleBackScreen = () => {
		if (Actions.currentScene == 'LessionScreen') {
			Actions.pop()
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
		var res = item.link.replace("https://www.youtube.com/watch?v=", "");
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
							<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '30%', paddingRight: 10,}}>
								<Text style={{ width: '100%', textAlign: 'right', color: Colors.main_color, fontSize: 12, }}>Next</Text>
								<Icon type="Entypo" name="chevron-right" style={{ fontSize: 15, color: Colors.main_color, }} />
							</View>
							:
							<TouchableOpacity onPress={() => this._handleDeteleVideo(item)} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '30%', paddingRight: 10, }}>
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
			item,
			statusLoadingLession
		} = this.state;
		if (statusLoading) return <Loading />;
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
				{roleType == "Student" ? null :
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
		tempUser: state.tempUser
	};
};

export default connect(
	mapStateToProps,
	null
)(LessionScreen);
