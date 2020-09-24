import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Container, Content } from 'native-base';

import Pdf from 'react-native-pdf';
import { Colors } from '../Themes';
import { Actions } from 'react-native-router-flux';
import Loading from '../Components/Loading';

class DocumentPreviewScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedItem: props.selectedFile,
            numOfPage: 0,
            current: 0,
            loading: true,
            screen: props.screen ? props.screen : ''
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


    _handleCancel = () => {
        Actions.DocumentScreen()
    }

    render() {
        const { selectedItem, numOfPage, current, loading } = this.state
        const source = { uri: selectedItem.file, cache: true };
        if (loading) return <Loading />
        return (
            <Container>
                <Content>
                    <View style={styles.container}>
                        {selectedItem.type == 'image' ?
                            <Image source={{ uri: selectedItem.file }} style={{ width: '100%', height: '80%' }} />
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

export default DocumentPreviewScreen
