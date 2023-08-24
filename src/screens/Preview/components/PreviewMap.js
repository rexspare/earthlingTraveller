import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Styles from '../../../assets/Styles';
import { Icon } from 'react-native-elements';
import CustomNav1 from '../../../components/CustomNav1';


class PreviewMap extends Component {
    state = {
        loading: true
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CustomNav1 title="Location" lightTheme={true} />
                <MapView
                    style={{ flex: 1 }}
                    region={this.props.coordinates}
                    loadingEnabled={true}
                >
                    <Marker coordinate={this.props.coordinates} />
                </MapView>
                <View style={styles.bottomArea}>
                    <Text style={[Styles.fontGilroyLight, { fontSize: 18 }]}>{this.props.location}</Text>
                </View>
            </View>
        );
    }
}

export default PreviewMap;


const styles = StyleSheet.create({
    bottomArea: {
        position: 'absolute',
        bottom: 0,
        paddingVertical: 25,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 4,
        width: '100%',
        alignItems: 'center'
    }
});