import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import { Images, Metrics, Colors, Fonts } from '../../Themes'
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase'

//component
import Loading from '../../Components/Loading'


export default class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneNum: '',
			confirmResult: null,
			statusLoading: false,
			fullPhoneNumber: null
		};
	}
	_handleValidatePhoneNumber = (number) => {
		this.setState({ phoneNum: number });
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
					console.tron.log(error)
				});
		}
	};


	render() {
		const { statusLoading } = this.state
		if (statusLoading) return <Loading />
		return (
			// <ImageBackground source={Images.backGroundImage} style={{ flex: 1, width: '100%', height: '100%' }}>

				<View style={styles.logoBlock}>
					{/* <Text style={{ color: Colors.main_color, fontSize: 18, marginTop: 15 }}>Register</Text> */}
					<Image source={Images.fansLogo} style={styles.image} />
					<View style={{ marginTop: Metrics.doubleBaseMargin * 2, padding: 5, backgroundColor: 'white', width: '90%', height: 47, borderRadius: 25, justifyContent: 'space-between', flexDirection: "row",borderColor:'black',borderWidth:1 }}>
						<View style={{ width: '20%', alignSelf: 'center', justifyContent: 'space-between', paddingLeft: 4, borderRightWidth: 1, borderRightColor: 'black', flexDirection: 'row' }}>
							<View style={{ paddingTop: 5 }}>
								<Image style={{ width: 33, height: 22 }}
									source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/1200px-Flag_of_Cambodia.svg.png' }}
								/>
							</View>
							<TouchableOpacity onPress={() => alert("show Country list")} style={{ paddingRight: 5, paddingTop: 3 }}>
								<Icon name='md-arrow-dropdown' type="Ionicons" style={{ fontSize: 30, color: 'black' }} />
							</TouchableOpacity>
						</View>
						<View style={{ width: '64%', flexDirection: 'row', alignItems: 'center' }}>
							<View>
								<Text style={{ fontSize: Fonts.size.regular, paddingLeft: 5 }}>+855 </Text>
							</View>
							<View>
								<TextInput
									style={{ height: 50, textAlignVertical: 'center', width: '100%', fontSize: 16, }}
									onChangeText={(number) => { this._handleValidatePhoneNumber(number) }}
									placeholder={'Phone number'}
									keyboardType='numeric'
									maxLength={10}
								/>
							</View>
						</View>
						<View style={{ paddingRight: 10, width: '15%', justifyContent: 'flex-end', alignItems: 'flex-end', justifyContent: 'center' }}>
							<TouchableOpacity onPress={this._handleSignInWithPhoneNumber}>
								<Icon name='arrowright' type="AntDesign" style={{ fontSize: 25, color: Colors.main_color }} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			//  </ImageBackground>

		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		padding: 10
	},
	logoBlock: {
		flex: 1,
		alignItems: 'center',
		
	},

	input: {
		width: Metrics.screenWidth - 70,
		color: '#555555',
		paddingRight: 10,
		paddingLeft: 0,
		paddingTop: 5,
		height: '100%',
		borderColor: '#6E5BAA',
		borderWidth: 1,
		borderRadius: 2,
		alignSelf: 'center',
		backgroundColor: '#ffffff'
	},
	image: {
		width: Metrics.screenWidth / 2 + 40,
		height: Metrics.screenWidth / 2 + 40,
		marginTop: Metrics.doubleBaseMargin * 2
	}
})
