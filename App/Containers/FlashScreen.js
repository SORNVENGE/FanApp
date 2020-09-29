import React, { Component } from 'react'
import { ScrollView, Text, Image, View, YellowBox, StyleSheet, Platform, StatusBar,Dimensions  } from 'react-native'
import { Images, Colors } from '../Themes'
import WelcomeScreen from './WelcomeScreen'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import I18n from './I18n';
import * as Progress from 'react-native-progress';

class FlashScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			progress_bar: 0,
		};
		this.intervalID = 0;
	}

	componentDidMount() {
		this.intervalID = setInterval(() => {
			const cal_progress_bar = Number(this.state.progress_bar) + Number(0.2);
			this.setState({ progress_bar: cal_progress_bar });
			if (Number(cal_progress_bar) > 1) {
				clearInterval(this.intervalID);
				if (Actions.currentScene == "FlashScreen") {
					Actions.reset('HomeScreen');
				}
			}
		}, 500)
	}

	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	render() {
		console.disableYellowBox = true;
		YellowBox.ignoreWarnings(['Warning:']);
		const { progress_bar } = this.state;
		const divideHeight = windowHeight / 3;
		if (this.props.getLanguage.value) {
			I18n.locale = this.props.getLanguage.value;
		} else {
			I18n.locale = "en"
		}
		return (

			<View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', backgroundColor: Colors.mainBgColor }}>
				<View style={{ height: divideHeight }}></View>
				<View style={{ height: divideHeight, justifyContent: 'center', alignItems: 'center' }}>
					{/* <Text style={{ fontSize: 55, color: Colors.activeMainTextColor, fontWeight: 'bold' }}>{I18n.t('swap')}</Text> */}
					<Image source={Images.fansLogo} style={{ width: 200, height:200}} />
					<View style={{ height: 35 }}></View>
					<Progress.Bar progress={progress_bar} unfilledColor={['white']} color={[Colors.main_color]} width={windowWidth / 2.2} />
				</View>
				<View style={{ height: divideHeight }}></View>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		getLanguage: state.language,
	}
}

export default connect(mapStateToProps, null)(FlashScreen)

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
