import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet,StatusBar,Image } from 'react-native'
import { Images, Colors, Fonts, Metrics} from '../Themes'
import { connect } from 'react-redux'
import I18n from './I18n';

class WelcomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		if (this.props.getLanguage.value) {
			I18n.locale = this.props.getLanguage.value;
		} else {
			I18n.locale = "en"
		}
		return (
			<View style={{height:'100%',width:'100%',backgroundColor: Colors.main_color,justifyContent:'center',alignItems:'center' }}>
                <Image source={Images.fansLogo} style={{ width: 200, height:200}} />

			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between'

	},
	imageView: {
		flex: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	viewTextVersion: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 40
	},
	text: {
		textAlign: 'center',
		fontSize: Fonts.size.h1,
		color: Colors.main_text,
		fontFamily: Fonts.type.robotBold
	},
	versionText: {
		fontSize: Fonts.size.medium,
		color: Colors.main_text,
		fontFamily: Fonts.type.robotRegular
    },
    image:{
        width:Metrics.screenWidth/2 + 40,
        height:Metrics.screenWidth/2 + 40
    }
})



const mapStateToProps = (state) => {
	return {
		getLanguage: state.language,
	}
}

export default connect(mapStateToProps, null)(WelcomeScreen)
