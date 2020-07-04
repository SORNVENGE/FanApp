import React, { Component } from 'react';
import { View, Text, ImageBackground,TouchableOpacity,Alert,AsyncStorage } from 'react-native';
import { Icon } from 'native-base'
import { Images,ApplicationStyles,Colors,Fonts, Metrics } from '../../Themes'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import styles from '../Styles/ConfirmScreenStyles'
import { Actions } from 'react-native-router-flux';
// import StoreUserInfoActions from '../../Redux/StoreUserAfterLoginRedux'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'

//service
// import CloudFireStoreUserHelper from '../../Services/CloudFireStoreUserHelper'
//component
import Loading from '../../Components/Loading'

class VerificationScreen extends Component {
	constructor(props) {
		super(props);
		this.unsubscribe = null;
		this.state = {
			user: null,
			phoneNumber:props.fullPhoneNumber?props.fullPhoneNumber:null,
			confirmResult: props.confirmResult?props.confirmResult:null,
            code: "",
			statusLoading:false
		};
		this.invalidVerifyNumber = 0
		this.unsubscribe = null

	}
	componentWillUnmount() {
		// if (this.unsubscribe) this.unsubscribe();
  	}
	componentDidMount() {
		// this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
		// 	if (user) {
		// 		if (user.uid) {
		// 			CloudFireStoreUserHelper.isAccountExisting(user.uid, (status,response) => {
		// 				console.tron.log({isAccountExisting:response})
		// 				if (response) {
		// 					this.props.setAllUserInfoAfterLogin(response)
		// 					AsyncStorage.multiSet([['LoginStatus', 'true'], ['uid', user.uid]]);
		// 					Actions.reset('HomeScreen')
		// 				}else{
		// 					let createNewAccData = {
		// 						phone: user.phoneNumber,
		// 						uid: user.uid
		// 					}
		// 					let userInfo = status ? response : createNewAccData;
						
		// 					if (!status) {
		// 		                CloudFireStoreUserHelper.updateUser(user.uid, createNewAccData)
		// 					}
		// 					this.props.setAllUserInfoAfterLogin(userInfo)
		// 					AsyncStorage.multiSet([['LoginStatus', 'true'], ['uid', user.uid]]);
        //                     Actions.reset('ProfileFormScreen')
		// 				}
		// 			})
		// 		}
		// 	}
		// })
	}
	_handleConfirmCode = (number) => {
		const { confirmResult, code } = this.state;
		this.setState({ code: number })
		if (confirmResult && number.length >= 6) {
		 	confirmResult.confirm(number)
			.then((user) => {
                if(user.uid){
                    CloudFireStoreUserHelper.isAccountExisting(user.uid, (status,response) => {
						if (response) {
                            this.props.setAllUserInfoAfterLogin(response)
							AsyncStorage.multiSet([['LoginStatus', 'true'], ['uid', user.uid]]);
							Actions.reset('HomeScreen')
						}else{
                            let createNewAccData = {
                                phone: user.phoneNumber,
                                uid: user.uid
                            }
                            this.props.setAllUserInfoAfterLogin(createNewAccData)
                            CloudFireStoreUserHelper.updateUser(user.uid, createNewAccData)
                            AsyncStorage.multiSet([['LoginStatus', 'true'], ['uid', user.uid]]);
                            Actions.reset('ProfileFormScreen')
                        }
					})
                }
			})
			.catch(error => {
			  if (number.length == 6) {
				this.invalidVerifyNumber += 1
				if (this.invalidVerifyNumber != 3) {
					this.setState({ code: "" })
					Alert.alert(
						"Invalid code",
						"Sorry! The submitted code is incorrect, please try again.",
						[
						{
							text: 'OK', onPress: () => {
							}
						}
						]
					);
				} else {
					Alert.alert(
							"Invalid code",
							"Sorry! You exceeded the number of submission. The application will be launched again.",
							[
							{
								text: 'OK', onPress: () => {
								Actions.RegisterScreen()
								}
							}
							]
					);
				}
			  	}
			});
		}
    };
    _handleSignInWithPhoneNumber = () => {
		const { phoneNumber } = this.state;
        this.setState({ statusLoading: true });
        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => {
                this.setState({ confirmResult,phoneNumber: phoneNumber, statusLoading:false })
            })
            .catch(error => {
        });
	};
	renderVerificationCodeInput() {
		const { phoneNumber, code } = this.state;
		return (
			<View style={styles.container}>
				<Text style={{paddingBottom: 10,color:Colors.gray,fontSize:Fonts.size.h5, textAlign: 'center' }}>
					Enter Verification Code
        		</Text>
				<Text style={{color:Colors.gray, fontSize:Fonts.size.regular, textAlign: 'center' }}>
					Enter Verification Code that sent to
        		</Text>
				<Text style={{ textAlign: 'center',color:Colors.gray, fontSize:Fonts.size.medium}}>
					{phoneNumber}
				</Text>
				<View style={[styles.inputView,{marginTop:Metrics.doubleBaseMargin * 2}]}>
					<View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
						<OTPInputView
							ref='otpInputView'
							style={{ height: 60, padding: 20}}
							autoFocus={true}
							pinCount={6}
							code={code}
							autoFocusOnLoad={true}
							onCodeChanged={(code => { this._handleConfirmCode(code) })}
							codeInputFieldStyle={{ height: 60, borderWidth: 1, margin: 5, backgroundColor: Colors.background, borderRadius: 3, fontSize: 25,color:Colors.black }}
							codeInputHighlightStyle={{ borderColor: Colors.background }}
						/>
					</View>
				</View>
				<View style={{ flexDirection: 'row',justifyContent: 'center',marginTop:Metrics.baseMargin}}>
					<Text style={{ textAlign: 'center',color:Colors.gray, fontSize:Fonts.medium}}>Not Received Code ? :</Text>
					<TouchableOpacity onPress={this._handleSignInWithPhoneNumber}>
						<Text style={{ textAlign: 'center',color:Colors.main_color,fontSize:Fonts.medium,paddingLeft:5}}>Resend</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	render() {
		const { statusLoading } = this.state
		// if(statusLoading ) return <Loading/>
		return (
			<ImageBackground source={Images.bgVerificationImage} style={{ flex: 1, width: '100%', height: '100%' }}>
				<View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'center',height:56}}>
					<TouchableOpacity onPress={()=> Actions.pop()} style={{ width:'10%',alignItems:'flex-end'}}>
						<Icon name='arrowleft' type="AntDesign" style={{ color:Colors.main_color, fontSize: 25}} />
					</TouchableOpacity>
					<View style={{width:'80%'}}>
						<Text style={{ fontSize: Fonts.size.input, color:Colors.main_color,textAlign:'center'}}>Verification</Text>
					</View>
					<View style={{width:'10%'}}/>
				</View>
				<View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
					{
						this.renderVerificationCodeInput()
					}
				</View>
			</ImageBackground >
		);
	}
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		setAllUserInfoAfterLogin: (data) => dispatch(StoreUserInfoActions.storeUserAfterLoginRequest(data))
// 	}
// }

export default connect(null, null)(VerificationScreen)
