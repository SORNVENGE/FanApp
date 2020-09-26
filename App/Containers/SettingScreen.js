import React, { Component } from 'react';
import {View, Text, Image,TouchableOpacity} from 'react-native';
import { Images, Metrics, Colors, Fonts } from '../Themes'
import LanguageActions from '../Redux/LanguageRedux'
import { connect } from 'react-redux'
import I18n from './I18n';

class SettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    _handleChangeLanguage = (item) => {
        // I18n.locale = index == 0 ? 'en' : 'kh';
        // this.props.requestUpdateLanguage(I18n.locale)
        // this.setState({ lang: index == 0 ? 'English' : 'ខ្មែរ' });
        I18n.locale = item;
        this.props.requestUpdateLanguage(I18n.locale)
        this.setState({ lang: item, isVisible: false });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ padding: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: "black", fontWeight: 'bold' }}>{I18n.t('please_choose_language')}</Text>
                </View>

                <TouchableOpacity onPress={() => this._handleChangeLanguage('en')} style={{ backgroundColor: 'white', padding: 10, paddingLeft: 20, paddingRight: 20 }}>
                    <View style={{ borderColor: 'grey', borderWidth: 0.5, height: 100, alignItems: 'center', flexDirection: 'row',opacity:8 }}>
                        <View style={{paddingLeft:20,paddingRight:20}}> 
						<Image source={Images.english} style={{ width: 60, height: 60, alignSelf: 'center', resizeMode: 'center' }} />

                        </View>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: "black", fontWeight: 'bold' }}>English</Text>
                    </View>
                </TouchableOpacity>




                <TouchableOpacity  onPress={() => this._handleChangeLanguage('kh')}  style={{ backgroundColor: 'white', padding: 10, paddingLeft: 20, paddingRight: 20 }}>
                    <View style={{ borderColor: 'grey', borderWidth: 0.5, height: 100, alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{paddingLeft:20,paddingRight:20}}> 
						<Image source={Images.khmer} style={{ width: 60, height: 60, alignSelf: 'center', resizeMode: 'center' }} />
                        </View>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: "black", fontWeight: 'bold' }}>Khmer</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        );
    }
}



const mapStateToProps = (state) => {
    return { 
      getLanguage: state.language,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      requestUpdateLanguage: (value) => dispatch(LanguageActions.languageRequest(value)),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)
  
  