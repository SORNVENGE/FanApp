import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import FooterActions from '../Redux/FooterRedux';
import HeaderActions from '../Redux/HeaderRedux';
import HomeScreen from '../Containers/HomeScreen';
import NewsScreen from '../Containers/NewsScreen';
import DetailScreen from '../Containers/DetailScreen';
import MainProgramScreen from '../Containers/MainProgramScreen';
import AdmissionScreen from '../Containers/AdmissionScreen';
import FeeScreen from '../Containers/FeeScreen';
import ContactScreen from '../Containers/ContactScreen';
import SettingScreen from '../Containers/SettingScreen';
import FacebookScreen from '../Containers/FacebookScreen';
import YoutubeScreen from '../Containers/YoutubeScreen';
import ELearningScreen from '../Containers/ELearningScreen';
import ELearningItemScreen from '../Containers/ELearningItemScreen';
import ELearningSubjectScreen from '../Containers/ELearningSubjectScreen';
import ELearningSubjectVideosScreen from '../Containers/ELearningSubjectVideosScreen';
import ELearninVideoScreen from '../Containers/ELearninVideoScreen';
import MyClassScreen from '../Containers/MyClassScreen';
import MyClassDetailScreen from '../Containers/MyClassDetailScreen';
import MyDocumentScreen from '../Containers/MyDocumentScreen';
import FeeDetailScreen from '../Containers/FeeDetailScreen';
import NewsDetailScreen from '../Containers/NewsDetailScreen';
import MainProgramDetailScreen from '../Containers/MainProgramDetailScreen';
import DocumentPreviewScreen from '../Containers/DocumentPreviewScreen';
import VerificationScreen from '../Containers/Register/VerificationScreen';
import LoginScreen from '../Containers/Register/LoginScreen';
import FlashScreen from '../Containers/FlashScreen'
import AddVideoScreen from '../Containers/AddVideoScreen'
import AddLessionScreen from '../Containers/AddLessionScreen'
import LessionScreen from '../Containers/LessionScreen'
import MapScreen from '../Containers/MapScreen'

class NavigationRouter extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	onEnter = (statusFooter, statusHeader, titleHeader, screenName) => {
		this.props.setFooter({ statusFooter: statusFooter, screenName: screenName })
		this.props.setHeader({ statusHeader: statusHeader, titleHeader: titleHeader, screenName: screenName })
	}
	render() {
		return (
			<Router>
				<Scene>
					<Scene onEnter={() => this.onEnter(false, true, 'Fan School', 'HomeScreen')} key="HomeScreen" component={HomeScreen} hideNavBar={true} initial={true} />
					<Scene onEnter={() => this.onEnter(false, false, 'DetailScreen', 'DetailScreen')} key="DetailScreen" component={DetailScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'News', 'NewsScreen')} key="NewsScreen" component={NewsScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'Main Program', 'MainProgramScreen')} key="MainProgramScreen" component={MainProgramScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'Admission', 'AdmissionScreen')} key="AdmissionScreen" component={AdmissionScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'Fee', 'FeeScreen')} key="FeeScreen" component={FeeScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'Contact', 'ContactScreen')} key="ContactScreen" component={ContactScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'Setting', 'SettingScreen')} key="SettingScreen" component={SettingScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'Map', 'MapScreen')} key="MapScreen" component={MapScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'Facebook', 'FacebookScreen')} key="FacebookScreen" component={FacebookScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'Youtube', 'YoutubeScreen')} key="YoutubeScreen" component={YoutubeScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'ELearning', 'ELearningScreen')} key="ELearningScreen" component={ELearningScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'My Class', 'MyClassScreen')} key="MyClassScreen" component={MyClassScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'My Class Detail', 'MyClassDetailScreen')} key="MyClassDetailScreen" component={MyClassDetailScreen} hideNavBar={true} />

					<Scene onEnter={() => this.onEnter(false, true, 'My Document', 'MyDocumentScreen')} key="MyDocumentScreen" component={MyDocumentScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'FeeDetail', 'FeeDetailScreen')} key="FeeDetailScreen" component={FeeDetailScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'News Detail ', 'NewsDetailScreen')} key="NewsDetailScreen" component={NewsDetailScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'Main Program Detail', 'MainProgramDetailScreen')} key="MainProgramDetailScreen" component={MainProgramDetailScreen} hideNavBar={true} />
					{/* <Scene onEnter={() => this.onEnter(false, false, 'LoginScreen', 'LoginScreen')} key="LoginScreen" component={LoginScreen} hideNavBar={true} initial={true} /> */}
					<Scene onEnter={() => this.onEnter(false, false, 'FlashScreen', 'FlashScreen')}  initial={true}   key="FlashScreen" component={FlashScreen} hideNavBar={true} />
				
					<Scene onEnter={() => this.onEnter(false, false, 'LoginScreen', 'LoginScreen')} key="LoginScreen" component={LoginScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, false, 'VerificationScreen', 'VerificationScreen')} key="VerificationScreen" component={VerificationScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, true, 'Preview Document', 'DocumentPreviewScreen')} key="DocumentPreviewScreen" component={DocumentPreviewScreen} hideNavBar={true} />
					<Scene onEnter={() => this.onEnter(false, false, 'ELearningItemScreen', 'ELearningItemScreen')} key="ELearningItemScreen" component={ELearningItemScreen} hideNavBar={true} />
					<Scene  onEnter={() => this.onEnter(false, false, 'ELearningSubjectScreen', 'ELearningSubjectScreen')} key="ELearningSubjectScreen" component={ELearningSubjectScreen} hideNavBar={true} />
					<Scene   onEnter={() => this.onEnter(false, false, 'ELearningSubjectVideosScreen', 'ELearningSubjectVideosScreen')} key="ELearningSubjectVideosScreen" component={ELearningSubjectVideosScreen} hideNavBar={true} />
					<Scene   onEnter={() => this.onEnter(false, false, 'ELearninVideoScreen', 'ELearninVideoScreen')} key="ELearninVideoScreen" component={ELearninVideoScreen} hideNavBar={true} />
					<Scene   onEnter={() => this.onEnter(false, false, 'AddVideoScreen', 'AddVideoScreen')} key="AddVideoScreen" component={AddVideoScreen} hideNavBar={true} />
					<Scene   onEnter={() => this.onEnter(false, false, 'AddLessionScreen', 'AddLessionScreen')} key="AddLessionScreen" component={AddLessionScreen} hideNavBar={true} />
					<Scene   onEnter={() => this.onEnter(false, false, 'LessionScreen', 'LessionScreen')} key="LessionScreen" component={LessionScreen} hideNavBar={true} />

				</Scene>
			</Router>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setFooter: (statusFooter) => dispatch(FooterActions.setFooterRequest(statusFooter)),
		setHeader: (data) => dispatch(HeaderActions.setHeaderRequest(data)),
	}
}

export default connect(null, mapDispatchToProps)(NavigationRouter)
