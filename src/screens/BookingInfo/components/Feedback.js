import React, { Component } from 'react';
import { Text, Avatar, Divider, Input, ListItem } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { LinearButton, FullScreenLoader } from '../../../components/Common';
import Styles from '../../../assets/Styles';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, ScrollView, RefreshControl, Dimensions, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import axios from "axios";
import qs from 'qs';
import Helpers from '../../../Helpers';
import { showMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";
import Login from '../../Landing/modal/Login';
import Spinner from 'react-native-spinkit';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: '',
            property: '',
            refreshing: false,
            properties: [],
            loading: false,
        }
    }
    _isMounted = false;
    componentDidMount = () => {
        this._isMounted = true;

        this.getData();
    }
    getData = async () => {
        //this.getProperties();

        const isConnected = this.checkConnection();
        console.log(isConnected);

        if (isConnected) {
            this.getProperties();
        } else {
            this.setState({ refreshing: false })
            showMessage({
                message: "Network Error",
                description: "Please check your connection",
                type: "default",
                backgroundColor: "#FFF",
                color: "#000",
            });
        }
    }
    checkConnection = () => {
        return NetInfo.fetch().then(state => {
            return state.isConnected;
        });
    }
    getProperties = () => {
        const self = this;
        const property_id = this.props.propertyID;
        const user_id = this.props.userID;

        axios.post(Helpers.api_url + 'SelectFeedbackbyId/' + property_id).then(response => {
            if (this._isMounted) {
                self.setState({ properties: response.data, refreshing: false });

            }
        }).catch(error => {
            self.setState({ refreshing: false });
            showMessage({
                message: "Network Error",
                description: "Please check your connection",
                type: "default",
                backgroundColor: "#FFF",
                color: "#000",
            });
        });

    }
    _getFeedback = () => {
        console.log('get feedback:' + this.state.properties);

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    SubmitReview = () => {
        this.setState({ loading: true, refreshing: true });
        console.log('i am pressed!');
        const feed_back = this.state.feedback;
        const property_id = this.props.propertyID;
        const user_id = this.props.userID;
        const rating = this.props.starRating;
        console.log('star', this.props.starRating);

        const self = this;
        const data = { feedback: feed_back, user_id: user_id, property_id: property_id, rate: rating };
        console.log(data);

        axios.post(Helpers.api_url + 'submit_review_feedback/' + property_id,
            qs.stringify(data))
            .then(response => {
                console.log(response.data);
                if (response.data.type == 'success') {
                    showMessage({
                        message: "Success!",
                        description: response.data.msg,
                        type: "default",
                        backgroundColor: "#57b5aa",
                        color: "#555555",
                    });
                    this.setState({ loading: false, refreshing: false })
                }
            })
    }

    render() {
        return (
            <>
                <View>
                    <Input
                        multiline={true}
                        inputContainerStyle={[Styles.inputContainerStyle, { minHeight: 100, marginBottom: 100 }]}
                        placeholder='Write a review/feedback...'
                        inputStyle={[Styles.inputStyle, Styles.fontGilroyLight, { flex: 1, }]}
                        onChangeText={(feedback) => this.setState({ feedback })}
                    />
                    <LinearButton
                        title="Submit Review"
                        onPress={() => this.SubmitReview()}
                        style={[Styles.buttonText, Styles.fontGilroyBold]}
                        loading={this.state.loading}
                    />
                </View>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        userID: state.userID,
        propertyID: state.propertyID,
        starRating: state.starRating,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateState: (payload) => dispatch({
            type: 'UPDATE_STATE',
            payload: payload
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feedback);
