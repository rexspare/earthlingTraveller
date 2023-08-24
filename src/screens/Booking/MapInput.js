import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
var { GooglePlacesAutocomplete } = require('react-native-google-places-autocomplete');
import Icon from 'react-native-vector-icons/FontAwesome';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

export const MapInput = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
                placeholder={props.placeholder}
                minLength={2}
                autoFocus={false}
                returnKeyType={'search'}
                listViewDisplayed={false}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    props.notifyChange(details.geometry.location, details.formatted_address);
                }}
                getDefaultValue={() => ''}
                query={{
                    key: 'AIzaSyC8lpkvXFDua9S2al669zfwz7GSkeVFWs4',
                    language: 'en',
                    types: 'geocode',
                }}
                styles={{
                    container: {
                        position: 'relative', flex: 1
                    },
                    textInputContainer: {
                        backgroundColor: 'white',
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        borderRadius: 20
                    },
                    textInput: {
                        borderRadius: 0,
                        fontFamily: 'Gilroy-Light',
                    },
                    description: {
                        fontFamily: 'Gilroy-Light',
                        fontSize: 20,
                    },
                    listView: {
                        zIndex: 9,
                        backgroundColor: 'white',
                        flex: 1,
                    },
                    row: {
                        height: 50
                    }
                }}
                isRowScrollable={false}
                currentLocation={false}
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    type: 'cafe'
                }}
                GooglePlacesDetailsQuery={{
                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                }}
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                renderLeftButton={() => <Icon name="search" size={20} style={{ padding: 10 }} />}
            />
        </SafeAreaView>
    )
}

export default MapInput;
