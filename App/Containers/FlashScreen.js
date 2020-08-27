import React, { Component } from 'react'
import { ScrollView, Text, Image, View,YellowBox,StyleSheet,Platform,StatusBar } from 'react-native'
import { Images } from '../Themes'
import WelcomeScreen from './WelcomeScreen'
import { Actions } from 'react-native-router-flux';

export default class FlashScreen extends Component {
	componentDidMount(){
		setTimeout(() => {
			Actions.HomeScreen()
		}, 2500);
	}
	render() {
		console.disableYellowBox = true;
		YellowBox.ignoreWarnings(['Warning:']);
		return (
			<View style={styles.mainContainer}>
				<WelcomeScreen/>
			</View>
		)
	}
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	},
	statusBar: {
	  height: STATUSBAR_HEIGHT,
	},
	appBar: {
	  backgroundColor: '#f7f7f7',
	  height: APPBAR_HEIGHT,
	  justifyContent: 'center'
	},
	content: {
	  flex: 1,
	  backgroundColor: '#fff',
	},
  });
