import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,Alert, ToastAndroid } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux'
import I18n from './I18n';
import DeleteLessonAction from '../Redux/DeleteLessonRedux'

import Pdf from 'react-native-pdf';
import { Colors } from '../Themes';
import { Actions } from 'react-native-router-flux';
import Loading from '../Components/Loading';
import { Icon } from 'native-base';

class DocumentPreviewScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedItem: props.selectedFile,
            classData: props.classData,
            item: props.item,
            numOfPage: 0,
            current: 0,
            loading: true,
            screen: props.screen ? props.screen : '',
            userData: props.tempUser.data ? props.tempUser.data : ''
        }
    }

    componentWillReceiveProps(newProps) {
        const { classData, userData } = this.state;
		var teacherId = userData.data ? userData.data.userId : '';
		if (Actions.currentScene == "DocumentPreviewScreen") {

			if (newProps.deleteLesson.fetching == false && this.props.deleteLesson.fetching == true && newProps.deleteLesson.error == null) {
				if (newProps.deleteLesson.payload) {
                    Actions.LessionScreen({classDetail: classData, teacherId: teacherId, item: this.state.item})
					this.setState({ statusLoading: false ,  })
					ToastAndroid.showWithGravityAndOffset("Document Deleted!", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 10, 10);
				}
			}

		}
	}
    componentDidMount() {
        if (this.state.selectedItem.type == 'image') {
            setTimeout(() => {
                this.setState({ loading: false })
            }, 2500);
        } else {
            this.setState({ loading: false })
        }
    };

    onDeleteDoc = () => {
        // CloudFireStoreUserHelper.deleteLession(item.id)
        const { selectedItem } = this.state
		let data = {
			lessionId: selectedItem.lessonId,
			docsId: selectedItem.docId
		}
		this.props.requestDeleteLession(data)
        this.setState({statusLoading: true})

	}
	_handleDeteleDoc = () => {
		Alert.alert(
			"Delete This Document!",
			I18n.t('are_you_sure'),
			[
				{
					text: I18n.t('no'),
					style: "cancel"
				},
				{ text: I18n.t('yes'), onPress: () => this.onDeleteDoc() }
			],
			{ cancelable: false }
		);
	}

    _handleCancel = () => {
        Actions.DocumentScreen()
    }

    render() {
        const { selectedItem, numOfPage, current, loading, userData } = this.state

        const source = { uri: selectedItem.path, cache: true };
        if (loading) return <Loading />
        return (
            <Container>
                <Content>
                    <View style={styles.container}>
                        {selectedItem.type == 'image' ?
                            <Image source={{ uri: selectedItem.path }} style={{ width: '100%', height: '80%' }} />
                            :
                            <Pdf
                                source={source}
                                onLoadComplete={(numberOfPages, filePath) => {
                                    this.setState({ numOfPage: numberOfPages })
                                }}
                                onPageChanged={(page, numberOfPages) => {
                                    this.setState({ current: page })
                                }}
                                onError={(error) => {
                                    console.log(error);
                                }}
                                onPressLink={(uri) => {
                                    console.log(`Link presse: ${uri}`)
                                }}
                                style={styles.pdf} />
                        }


                    </View>
                </Content>

                {userData.role.toLowerCase() == 'teacher' ?
                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => this._handleDeteleDoc()} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '30%', paddingRight: 10, }}>
                            <Icon type="FontAwesome" name="trash-o" style={{ fontSize: 20, color: '#ff0000', }} />
                            <Text style={{marginLeft: 10,  textAlign: 'right', color: '#ff0000', fontSize: 12, }}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                    : null
                }

                <View style={{ justifyContent: 'center' }}>
                    {selectedItem.type == 'image' ? null :
                        <Text style={[styles.text, { fontSize: 14 }]}>{current} / {numOfPage}</Text>
                    }
                    <Text style={[styles.text, { fontWeight: '700', color: Colors.text }]}>File Name</Text>
                    <Text style={[styles.text, { fontSize: 14 }]}>{selectedItem.fileName}</Text>
                </View>
                {/* <View style={styles.contentButtons}>
                    <TouchableOpacity onPress={this._handleCancel} style={[styles.btnStyles, { backgroundColor: Colors.border }]}>
                        <Text style={[styles.btnText, { color: Colors.gray }]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._handlePrint} style={styles.btnStyles}>
                        <Text style={styles.btnText}>Prinit</Text>
                    </TouchableOpacity>
                </View> */}
            </Container>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        height: 530
    },
    pdf: {
        flex: 1,
        width: '90%',
        alignSelf: 'center'
    },
    contentButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    btnStyles: {
        width: '48%',
        padding: 10,
        backgroundColor: Colors.background,
    },
    btnText: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 16,
    },
    contentPDF: {
        width: '80%',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        // margintTop: 10,
        paddingTop: 10
    },
});

const mapStateToProps = state => {
    return {
        tempUser: state.tempUser,
		deleteLesson: state.deleteLesson,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
		requestDeleteLession: (data) => dispatch(DeleteLessonAction.deleteLessonRequest(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DocumentPreviewScreen);
