import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, Dimensions, Alert } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { Colors, Images, ApplicationStyles, Fonts, Metrics } from '../Themes'
import Loading from "../Components/Loading";

import { connect } from 'react-redux'
import StoreUserInfoActions from '../Redux/StoreUserInfoRedux'
const { width, height } = Dimensions.get('window');

class HeaderScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusLoading: false,
        };
    }

    handlePressBack = () => {
        const { data } = this.props.getHeader;
        if (data) {
            let { screenName } = data
            if (screenName == "MyClassScreen") {
                Actions.HomeScreen()
            } else if (screenName == "SettingScreen") {
                Actions.reset('HomeScreen')
            }
            else {
                Actions.pop()

            }
        }
    }

    handleOnLogOut = () => {
        Alert.alert(
            'Warning!!',
            'Do you want to logout?',
            [
                { text: 'Cancel', }, {},
                {
                    text: 'OK ', onPress: () => {
                        this.setState({ statusLoading: true });
                        this.props.requestClearUserStoreInfo();
                        setTimeout(() => {
                            this.setState({ statusLoading: false });
                            Actions.reset("HomeScreen");
                        }, 2000);
                    }
                },
            ],
            { cancelable: false },
        );

    }

    render() {

        const { data } = this.props.getHeader;
        const { statusLoading } = this.state;
        var title = "";
        var screen = "";
        var statusLogo = true;
        var statusLogoHomeScreen = false;
        if (data) {
            let { titleHeader, statusHeader, screenName } = data
            title = titleHeader;
            screen = screenName;
            if (screen == "NewsScreen" || screen == "HomeScreen" || screen == "DetailScreen" || screen == "MainProgramScreen" || screen == "MyClassScreen" || screen == "MyClassDetailScreen" || screen == "MyDocumentScreen" || screen == "FeeScreen" || screen == "YoutubeScreen" || screen == "ContactScreen" || screen == "SettingScreen" || screen == "FacebookScreen" || screen == "ELearningScreen" || screen == "AdmissionScreen" || screen == "FeeDetailScreen" || screen == "MainProgramDetailScreen" || screen == "DocumentPreviewScreen") {
                statusLogo = false
            }
            if (screen == "HomeScreen") {
                statusLogoHomeScreen = true
            }
            if (!statusHeader) {
                return false;
            }
        }
        if (statusLoading) return <Loading />;
        return (
            <View style={[ApplicationStyles.mainHeaderFooterContainer, { backgroundColor: Colors.main_color, paddingTop: Platform.OS == "android" ? 4 : 0 }]}>
                {statusLogo ?
                    <View style={[ApplicationStyles.mainHeightIconAndTitle, { paddingLeft: 10, flexDirection: 'row' }]}>
                        <View style={{ width: '10%' }} />
                        <View style={{ width: '80%' }}>
                            <Text style={{ fontSize: Fonts.size.input, color: Colors.white, textAlign: 'center' }}>{title}</Text>
                        </View>
                        <View style={{ width: '10%' }} />
                    </View>
                    :
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 56 }}>
                        {statusLogoHomeScreen ?
                            <View style={{ width: '25%', alignItems: 'flex-end' }}>
                                <View style={{}}>
                                    <Image source={Images.fansLogo} style={{
                                        width: 40,
                                        height: 40,
                                        resizeMode: 'cover'
                                    }} />
                                </View>
                            </View>
                            :
                            <TouchableOpacity onPress={this.handlePressBack} style={{ width: '20%', alignItems: 'flex-end' }}>
                                <Icon name='arrowleft' type="AntDesign" style={{ color: Colors.white, fontSize: 26, fontWeight: "bold" }} />
                            </TouchableOpacity>
                        }
                        <View style={{ width: '60%' }}>
                            <Text style={{ fontSize: Fonts.size.input, color: Colors.white, textAlign: statusLogoHomeScreen ? "left" : 'center', marginLeft: statusLogoHomeScreen ? 10 : 0 }}> {title}</Text>
                        </View>
                        {statusLogoHomeScreen ?
                            this.props.tempUser.data != null ?
                             <TouchableOpacity onPress={this.handleOnLogOut} style={{ width: '20%', justifyContent: "flex-end", alignItems: 'flex-end', paddingRight: 5 }}>
                                <Icon name='logout' type="AntDesign" style={{ color: Colors.white, fontSize: 26, fontWeight: "bold" }} />
                            </TouchableOpacity> 
                            : <View style={{ width: '27%' }} />
                            : <View style={{ width: '27%' }} />}
                        <View style={{ width: '10%' }} />
                    </View>
                }
                <View style={{}} />
            </View >
        );
    }
}




const mapStateToProps = (state) => {
    return {
        getHeader: state.header,
        tempUser: state.tempUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestClearUserStoreInfo: () => dispatch(StoreUserInfoActions.clearUserInfoRequest()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderScreen)
