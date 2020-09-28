import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import StoreUserInfoActions from '../Redux/StoreUserInfoRedux'
import { Icon } from 'native-base';

import firebase from 'react-native-firebase'
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';

//component
import Loading from '../Components/Loading'
class AddLessionScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneNum: '',
			classId: this.props.classId,
			confirmResult: null,
			statusLoading: false,
			statusPassword: true,
			statusBorder: false,
			title_kh: '',
			title: '',
			description: '',
			messageTitle: false,
			messageTitleKh: false,
			messageDes: false,

		};
	}

	_handleBackScreen = () => {
        if (Actions.currentScene == 'AddLessionScreen') {
            Actions.pop()
        }
    }

	_handlChangeTitle = (text) => {
		this.setState({ title: text, messageTitle: false });
	}

	_handlChangeTitleKh = (text) => {
		this.setState({ title_kh: text, messageTitleKh: false });
	}

	_handleChangedescription = (text) => {
		this.setState({ description: text, messageDes: false });
	}

	_handleAddVideo = () => {
		const { title, description, title_kh, classId } = this.state 
		var date = firebase.firestore.FieldValue.serverTimestamp()

		if (description == '') {
			this.setState({messageDes: true})
		} else if (title == '') {
			this.setState({messageTitle: true})
		} else if (title_kh == '') {
			this.setState({messageTitleKh: true})
		}else {
			let mergeObj = {
				classId: classId,
				description: description,
				title: title,
				title_kh: title_kh,
				createdDate: date
			}
			CloudFireStoreUserHelper.addLession(mergeObj, (response) => {
				if (response) {
					if (Actions.currentScene == 'AddLessionScreen') {
						Actions.pop()
					}
				}
			});
		}
	}

	render() {
		const { title, title_kh, description } = this.state
		return (
			<View style={styles.container}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 56, backgroundColor: Colors.main_color }}>
					<TouchableOpacity onPress={() => this._handleBackScreen()} style={{ width: '10%', alignItems: 'flex-end' }}>
						<Icon name='arrowleft' type="AntDesign" style={{ color: Colors.white, fontSize: 26, fontWeight: "bold" }} />
					</TouchableOpacity>

					<View style={{ width: '80%' }}>
						<Text style={{ fontSize: Fonts.size.input, color: Colors.white, textAlign: 'center', }}>Add Lession</Text>
					</View>
					<View style={{ width: '10%' }} />
				</View>
				<View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
					<View style={styles.searchSection}>
						<Text style={{ fontSize: 14, fontWeight: '500', width: '100%', textAlign: 'left', marginBottom: 10 }}>Title {this.state.messageTitle ? <Text style={{ fontSize: 14, color: '#B9052C' }}>*</Text> : ''}</Text>
						<TextInput
							style={[styles.input, { borderColor: this.state.messageTitle ? 'red' : Colors.main_color, textAlignVertical: 'center' }]}
							placeholder="Title"
							value={title}
							onChangeText={(text) => { this._handlChangeTitle(text) }}
						/>
					</View>
					<View style={styles.searchSection}>
						<Text style={{ fontSize: 14, fontWeight: '500', width: '100%', textAlign: 'left', marginBottom: 10 }}>Title Khmer {this.state.messageTitleKh ? <Text style={{ fontSize: 14, color: '#B9052C' }}>*</Text> : ''}</Text>
						<TextInput
							style={[styles.input, { borderColor: this.state.messageTitleKh ? 'red' : Colors.main_color, textAlignVertical: 'center' }]}
							placeholder="Title khmer"
							value={title_kh}
							onChangeText={(text) => { this._handlChangeTitleKh(text) }}
						/>
					</View>
					<View style={styles.searchSection}>
						<Text style={{ fontSize: 14, fontWeight: '500', width: '100%', textAlign: 'left', marginBottom: 10 }}>Description {this.state.messageDes ? <Text style={{ fontSize: 14, color: '#B9052C' }}>*</Text> : ''}</Text>
						<TextInput
							style={[styles.input, { borderColor: this.state.messageDes ? 'red' : Colors.main_color, textAlignVertical: 'top',  height: 150}]}
							placeholder="Description"
							textAlign={'left'}
                        	multiline={true}
							value={description}
							onChangeText={(text) => { this._handleChangedescription(text) }}
						/>
					</View>
				</View>
				<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 20, marginVertical: 20, width: '100%' }}>
					<TouchableOpacity onPress={() => this._handleAddVideo()} style={{ width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.main_color, padding: 13, borderRadius: 10, marginHorizontal: 20, }}>
						<Text style={{ fontSize: 15, color: Colors.white }}>Add Lession</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	logoBlock: {
		alignItems: 'center',
	},
	searchSection: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
		width: '100%',
	},
	searchIcon: {
		padding: 10,
	},
	input: {
		width: '100%',
		color: '#555555',
		paddingRight: 10,
		paddingLeft: 15,
		borderWidth: 1,
		borderRadius: 10,
		alignSelf: 'center',
		backgroundColor: '#ffffff',
	},
	image: {
		width: 125,
		height: 125,
	}
})


const mapDispatchToProps = (dispatch) => {
	return {
		setAllUserInfoAfterLogin: (data) => dispatch(StoreUserInfoActions.storeUserInfoRequest(data)),
	}
}
export default connect(null, mapDispatchToProps)(AddLessionScreen)

