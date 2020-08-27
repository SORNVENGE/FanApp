import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../../Themes'
import { Icon, Item } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import StoreUserInfoActions from '../../Redux/StoreUserInfoRedux'

import firebase from 'react-native-firebase'
import CloudFireStoreUserHelper from '../../Services/CloudFireStoreUserHelper';

//component
import Loading from '../../Components/Loading'
class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneNum: '',
			confirmResult: null,
			statusLoading: false,
			statusPassword: true,
			statusBorder: false,
			username: '',
			password: '',
			userData: [],
		};
	}
	_handleOnUsernameChange = (username) => {
		this.setState({ username: username });
	}
	_handleOnPasswordChange = (password) => {
		this.setState({ password: password });

	}
	_handleSignInWithPhoneNumber = () => {
		const { phoneNum } = this.state;
		let validatePhone = ''
		let phoneNumber = ''
		let countryCode = '+855'
		if (phoneNum == '') {
			alert("Please provide us your phone number")
		}
		else {
			if (phoneNum.charAt(0) == "0") {
				validatePhone = phoneNum.slice(1)
				phoneNumber = countryCode + validatePhone
			}
			else {
				phoneNumber = countryCode + phoneNum
			}
			this.setState({ statusLoading: true });
			firebase.auth().signInWithPhoneNumber(phoneNumber)
				.then(confirmResult => {
					this.setState({ confirmResult, fullPhoneNumber: phoneNumber, statusLoading: false })
					Actions.VerificationScreen({ fullPhoneNumber: phoneNumber, confirmResult: confirmResult })
				})
				.catch(error => {
				});
		}
	};


	// CloudFireStoreUserHelper.readAllUser(response => {
	// 	if (response) {
	// 		response.map((eachData, index) => {
	// 			if (eachData.username == username && eachData.password == password) {
	// 				this.setState({ userData: eachData, statusLoading: false, statusBorder: false });
	// 				Actions.HomeScreen()
	// 			}
	// 			else {
	// 				this.setState({ statusLoading: false, statusBorder: true });
	// 			}
	// 		})
	// 	} else {
	// 		this.setState({ statusLoading: false });
	// 	}
	// });



	handleOnLoginButton = () => {
		const { username, password } = this.state
		if (username == "" || password == "") {
			alert("Please input username and password!!")
		}
		else {
			this.setState({ statusLoading: true });
			CloudFireStoreUserHelper.readAllUser(username, password, (response) => {
				if (response) {
					this.setState({ statusLoading: false });
					this.props.setAllUserInfoAfterLogin(response)
					Actions.HomeScreen();
				}
				else {
					this.setState({ statusLoading: false });
				}
			})
		}
	}
	render() {
		const { statusLoading } = this.state
		if (statusLoading) return <Loading />
		return (
			<ScrollView>
				<View style={styles.logoBlock}>
					<View style={{ height: 160, marginTop: 20 }}>
						<Image source={Images.fansLogo} style={styles.image} />
					</View>
					<View style={{ height: '50%', padding: Metrics.doubleBaseMargin, justifyContent: 'center' }}>
						<View style={styles.searchSection}>
							<Icon style={styles.searchIcon} name="md-person" size={20} color={Colors.main_color} />
							<TextInput
								style={[styles.input, { borderColor: this.state.statusBorder ? 'red' : Colors.main_color }]}
								placeholder="UserName"
								value={this.state.username}
								onChangeText={(username) => { this._handleOnUsernameChange(username) }}
							/>
						</View>
						<View style={styles.searchSection}>
							<TouchableOpacity onPress={() => this.setState({ statusPassword: !this.state.statusPassword })}>
								<Icon style={styles.searchIcon} name="ios-lock" size={20} />
							</TouchableOpacity>
							<TextInput
								style={[styles.input, { borderColor: this.state.statusBorder ? 'red' : Colors.main_color }]}
								placeholder="Password"
								value={this.state.password}
								onChangeText={(password) => { this._handleOnPasswordChange(password) }}
								secureTextEntry={this.state.statusPassword}
							/>
						</View>

						<TouchableOpacity onPress={() => this.handleOnLoginButton()} style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', marginTop: Metrics.baseMargin, backgroundColor: Colors.main_color, padding: 13, borderRadius: 10 }}>
							<Text style={{ fontSize: 15, color: Colors.white }}>Logins</Text>
						</TouchableOpacity>
						<View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', marginTop: Metrics.baseMargin }}>
							<Text style={{ fontSize: 15, color: Colors.gray }}>Forget password?</Text>
							<Text style={{ fontSize: 15, color: Colors.main_color, paddingLeft: 5 }}>Reset password</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		)
	}
}
const styles = StyleSheet.create({
	logoBlock: {
		alignItems: 'center',
	},
	searchSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
		// backgroundColor: 'red',
	},
	searchIcon: {
		padding: 10,
	},
	input: {
		width: Metrics.screenWidth - 70,
		color: '#555555',
		paddingRight: 10,
		paddingLeft: 15,
		paddingTop: 5,
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
export default connect(null, mapDispatchToProps)(LoginScreen)

