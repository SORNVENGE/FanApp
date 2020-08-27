import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Colors, Images, ApplicationStyles, Fonts, Metrics } from '../Themes'

const { width, height } = Dimensions.get('window');

class HeaderScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePressBack = () => {
        Actions.pop()
    }

    render() {
        const { data } = this.props.getHeader;
        var title = "";
        var screen = "";
        var statusLogo = true;
        var statusIcon = false;
        if (data) {
            let { titleHeader, statusHeader, screenName } = data
            title = titleHeader;
            screen = screenName;
            if (screen == "NewsScreen" || screen == "DetailScreen" || screen == "MainProgramScreen" || screen == "MyClassScreen" || screen == "MyClassDetailScreen" || screen == "MyDocumentScreen" || screen == "FeeScreen" || screen == "YoutubeScreen" || screen == "ContactScreen" || screen == "SettingScreen" || screen == "FacebookScreen" || screen == "ELearningScreen" || screen == "AdmissionScreen" || screen == "FeeDetailScreen" || screen == "MainProgramDetailScreen") {
                statusLogo = false
            }
            if (!statusHeader) {
                return false;
            }
        }
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
                        <TouchableOpacity onPress={this.handlePressBack} style={{ width: '10%', alignItems: 'flex-end' }}>
                            <Icon name='arrowleft' type="AntDesign" style={{ color: Colors.white, fontSize: 26, fontWeight: "bold" }} />
                        </TouchableOpacity>
                        <View style={{ width: '80%' }}>
                            <Text style={{ fontSize: Fonts.size.input, color: Colors.white, textAlign: 'center' }}>{title}</Text>
                        </View>
                        <View style={{ width: '10%' }} />
                    </View>
                }
                <View style={{}} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        getHeader: state.header
    }
}

export default connect(mapStateToProps)(HeaderScreen)
