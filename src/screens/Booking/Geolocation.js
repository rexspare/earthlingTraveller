import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert, TouchableOpacity, PermissionsAndroid } from 'react-native'
import { Input, ListItem, SearchBar } from 'react-native-elements';
import Styles from '../../assets/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import MapInput from '../Booking/MapInput'
import Helpers from '../../Helpers';
import { YellowBox } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested',]);
export default class Geolocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {},
            listViewDisplayed: false,
            address: '',
            saving: false,

        };
    }
    componentDidMount = () => {
        this.getData();
    }

    getData = async () => {
        const self = this;


        Axios.post(
            Helpers.api_url + 'getPropertyLocation/location/',
        ).then(response => {
            self.setInitialStates(response.data);
        });
    }

    setInitialStates = (data) => {
        const parsedLoc = JSON.parse(data.location);

        if (parsedLoc != null) {
            this.setState({
                address: data.address,
                region: parsedLoc
            })
        }
    }

    updateState = (location) => {
        this.setState({
            region: {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
            }
        })
    }

    getCoordsFromName = (loc, address) => {
        this.setState({
            address: loc.details
        })

        this.updateState({
            latitude: loc.lat,
            longitude: loc.lng
        })
        
        this.goBack(loc.data);
    }

    goBack = (coordinates) => {
        const address = this.state.address;
        
        this.props.updateAddress(address, coordinates);
        Actions.pop();
    }

    // onMapRegionChange = region => {
    //     this.setState({ region });
    // }

    // saveLocation = async () => {
    //     const formData = {
    //         id: this.props.propertyID,
    //         address: this.state.address,
    //         location: JSON.stringify(this.state.region)
    //     },
    //         self = this;

    //     this.setState({ saving: true });

    //     await axios.post(
    //         Helpers.api_url + 'saveLocation',
    //         qs.stringify(formData)
    //     ).then(response => {
    //         setTimeout(() => {
    //             self.setState({ saving: false });
    //             if (response.data.type == 'success') {
    //                 Actions.reset('propertySetup', { showMessage: 'Successfully saved!' });
    //             } else {
    //                 showMessage({
    //                     message: "Oops!",
    //                     description: response.data.msg,
    //                     type: "default",
    //                     backgroundColor: "white",
    //                     color: "#555555",
    //                 });
    //             }
    //         }, 1000);
    //     });
    // }
    render() {


        return (
            <View>
                <View style={{ padding: 10 }}>
                    <View style={{ position: 'absolute', width: '100%', zIndex: 9 }}>
                        <MapInput
                            placeholder={this.state.address != "" ? this.state.address : "Type in your address"}
                            notifyChange={(data, details = null) => {

                                this.getCoordsFromName({ data, details })

                            }}
                        />
                    </View>



                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#d1dadb',
        borderBottomWidth: 1,
        flex: 1,

    },
    item: {
        flex: 1,
        padding: 10,
    },
    textInputContainer: {
        backgroundColor: 'white',
        borderRadius: 13,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ebebeb',
        height: 45
    },
    textInput: {
        paddingHorizontal: 5,
        fontSize: 12
    },
    fontGilroy: {
        fontFamily: "Gilroy-Light",
    },
    modalContainer: {
        justifyContent: 'center',
        paddingBottom: 20,

    },
    modalContainers: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',

    },
    innerContainer: {
        alignContent: 'center',
        height: '90%'
    },
    innerContainers: {
        padding: '10%',
        height: '50%',



    },
    modalContainerSort: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    innerContainersort: {
        borderRadius: 25, flex: 0,
        backgroundColor: 'white', margin: '5%',
        padding: 10

    },
    header: {
        borderBottomColor: '#ccc',

    },
});
