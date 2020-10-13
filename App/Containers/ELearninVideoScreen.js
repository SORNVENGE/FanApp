import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, WebView, ImageBackground, FlatList, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { connect } from 'react-redux'
import Loading from '../Components/Loading'
import CloudFireStoreUserHelper from '../Services/CloudFireStoreUserHelper';
import firebase from 'react-native-firebase';
const db = firebase.firestore();

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class ELearninVideoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusLoading: false,
            item: this.props.item
        }
        this.player = null
    }

    componentWillMount = () => {
        this.setState({ statusLoading: false });

    }

    _handleBackScreen = () => {
        if (Actions.currentScene == 'ELearninVideoScreen') {
            Actions.pop()
        }
    }

    render() {
        const { statusLoading, data, item } = this.state
        var res = item.path.replace("https://www.youtube.com/watch?v=", "");
        if (statusLoading) return <Loading />
        return (
            <View style={styles.container}>

                <View style={{ width: '100%', height: height }}>
                    <WebView
                        style={{ width: '100%', height: '100%' }}
                        allowsFullscreenVideo
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        allowsInlineMediaPlayback
                        mediaPlaybackRequiresUserAction
                        source={{ uri: 'https://www.youtube.com/embed/' + res }}

                    >
                    </WebView>
                </View>

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },


});

const mapStateToProps = (state) => {
    return {
        tempUser: state.tempUser,
    }
}

export default connect(mapStateToProps, null)(ELearninVideoScreen)
