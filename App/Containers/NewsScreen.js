import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import Loading from '../Components/Loading'
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';
import moment from 'moment';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import NewsActions from '../Redux/NewsRedux'

class NewsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusLoading: true,
            newsList:[],
        }
    }
    componentDidMount=()=>{
		this.props.requestNewsData()
    }
    
    componentWillReceiveProps(newProps) {
		if (newProps.getNews) {
			if (newProps.getNews.fetching == false &&newProps.getNews.error == null &&newProps.getNews.payload)
			{
                this.setState({newsList:newProps.getNews.payload,statusLoading: false});
			}
        }
    }

    render() {
        const { statusLoading,newsList } = this.state
        if (statusLoading) return <Loading />
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {newsList.map((eachData, index) => {
                        return (
                            <View style={{ padding: 10, flexDirection: 'column' }}>
                                <TouchableOpacity onPress={() => Actions.NewsDetailScreen({ item: eachData })} style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
                                    <View style={{ width: '30%', justifyContent: 'center' }}>
                                        <Image source={{ uri: "http://192.168.0.241:3000"+ eachData.filePath }} style={{ width: 80, height: 80, alignSelf: 'center' }} />
                                    </View>
                                    <View style={{ width: '70%', flexDirection: 'column', justifyContent: 'center' }}>
                                        <View style={{}}>
                                            <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{eachData.title}</Text>
                                        </View>
                                        <View style={{marginTop:10}}>
                                            <Text style={{ fontSize: 14, color: 'black' }}>{moment(eachData.createdAt).format("YYYY-MMM-DD")}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ borderBottomColor: 'grey', borderWidth: 0.2, marginLeft: "30%", marginTop: 5 }}></View>
                            </View>

                        );
                    })}


                </ScrollView>

            </View>
        );
    }
}


const props = (state) => {
	return {
		getNews: state.getNews,

	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		requestNewsData: () => dispatch(NewsActions.newsRequest())

	}
}
export default connect(props, mapDispatchToProps)(NewsScreen)