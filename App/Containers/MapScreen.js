import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Loading from '../Components/Loading'

export default class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusLoading:true,
            latitude: 11.5793306,
            longitude: 104.7500972,
        }
    }
    componentWillMount = () => {
        setTimeout(() => {
            this.setState({statusLoading: false})
        }, 2000)
    }

    render() {
        const {latitude,longitude,statusLoading}=this.state
        if (statusLoading) return <Loading />
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.009,
                        longitudeDelta: 0.009

                    }}
                    onPress={this.pickLocationHandler}
                    zoomEnabled={true}
                    zoomLevel={3}
                    ref={ref => this.map = ref}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: latitude ? latitude : 11.5793306,
                            longitude: longitude ? longitude : 104.7500972,
                        }}

                    />
                </MapView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        bottom: 5,
    },
});