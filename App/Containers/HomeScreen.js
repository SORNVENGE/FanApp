import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ImageBackground, FlatList, StyleSheet, StatusBar, ScrollView, Platform } from 'react-native';
import { Icon } from 'native-base';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Actions } from 'react-native-router-flux';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import Swiper from 'react-native-swiper'
import { Rating } from 'react-native-elements';
const GREEN = 'rgba(141,196,63,1)';
const PURPLE = 'rgba(108,48,237,1)';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageSlide: [
				{
					image: Images.one,
					location: '#169,Street 168, Toek Thla,Sen Sok'
				},
				{
					image: Images.two,
					location: '#169,Street 168, Toek Thla'
				},
				{
					image: Images.three,
					location: '#169,Street 168'
				},
				{
					image: Images.four,
					location: '#169,Street 168,  Toul Kork'
				},
				{
					image: Images.five,
					location: '#169,Street 168, Phnom Penh'
				},
				{
					image: Images.six,
					location: '#169,Street 168, BBK'
				},
			],
			category: [

				{ name: 'My Class', image: Images.glocery },
				// { name: 'My Document', image: Images.glocery },
				{ name: 'Main Program', image: Images.glocery },
				{ name: 'Admission', image: Images.berverages },
				{ name: 'Tuition Fee', image: Images.bakery },
				{ name: 'Youtube', image: Images.bakery },
				{ name: 'E-Learning', image: Images.stationary },
				{ name: 'Setting', image: Images.flower },

			],
			activeIndex: 1,
			locationShop: ''
		}
	}
	handleOnEachMenuClick = (item, index) => {

		if (Actions.currentScene == "HomeScreen" && item.name == "Main Program") {
			Actions.MainProgramScreen()
		}
		else if (Actions.currentScene == "HomeScreen" && item.name == "Admission") {
			Actions.AdmissionScreen()

		}
		else if (Actions.currentScene == "HomeScreen" && item.name == "Tuition Fee") {
			Actions.FeeScreen()

		}
		else if (Actions.currentScene == "HomeScreen" && item.name == "Setting") {
			Actions.SettingScreen()
		}
		else if (Actions.currentScene == "HomeScreen" && item.name == "Youtube") {
			Actions.YoutubeScreen()

		}
		else if (Actions.currentScene == "HomeScreen" && item.name == "E-Learning") {
			Actions.ELearningScreen()
		}
		else if (Actions.currentScene == "HomeScreen" && item.name == "My Class") {
			Actions.MyClassScreen()
		}
		else if (Actions.currentScene == "HomeScreen" && item.name == "My Document") {
			Actions.MyDocumentScreen()
		}
	}


	updateIndex = () => {
		const { imageSlide } = this.state
		let index = this._carousel.currentIndex
		this.setState({ locationShop: imageSlide[index] });
	}


	renderMeunuOption = ({ item, index }) => {
		return (
			<TouchableOpacity onPress={() => this.handleOnEachMenuClick(item, index)} style={{
				justifyContent: 'center',
				alignItems: 'center',
				width: '50%',
				height: height < 731.4285714285714 ? width / 2.2 : width / 2,
				borderWidth: 10,
				borderColor: "white",
				backgroundColor: Colors.main_color,
				borderRadius: 20,
			}}>
				<View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
					<View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', height: '40%' }}>
						<Text style={{ fontSize: Fonts.size.regular, fontWeight: 'bold', fontFamily: Fonts.type.khmer_os, color: "white", paddingTop: Metrics.mainMargin, textAlign: 'center', paddingBottom: 10, paddingHorizontal: 5, }}>{item.name}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

	render() {
		const { imageSlide } = this.state
		return (
			<View style={{ flex: 1, backgroundColor: "white" }}>
				<ScrollView>
					<View style={{ backgroundColor: Colors.white }}>
				
						<View style={{ padding: Metrics.marginVertical }}>
						
							<Swiper
								loop={true}
								autoplay={true}
								style={{height:200}}
								// style={{ height: Metrics.width / 1.6 }}
								dot={<View />}
								activeDot={<View />}
							>
								{imageSlide.map((eachImage, index) => {
									return (
										<View style={styles.item}>
											<Image source={eachImage.image} style={styles.item} />
										</View>
									)
								})}
							</Swiper>
					
						</View>
					
						<FlatList
							data={this.state.category}
							numColumns={2}
							renderItem={this.renderMeunuOption}
							keyExtractor={(item, index) => index.toString()}
						/>

					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	item: {
		width: width - 22,
		height: width / 1.6,
		borderRadius: Metrics.buttonRadius
	},
	imageContainer: {
		flex: 1,
		marginBottom: Platform.select({ ios: 0, android: 1 }),
		borderRadius: 8
	},
	image: {
		resizeMode: 'cover'
	},
})