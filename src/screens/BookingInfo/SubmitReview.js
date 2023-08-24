import React, { Component } from 'react';
import { View } from 'react-native';
import { Rating } from 'react-native-ratings';
import Styles from '../../assets/Styles';
import { Text, Input } from 'react-native-elements';
import { LinearButton, ThemeButton } from '../../components/Common';
import { connect } from 'react-redux';
import Helpers from '../../Helpers';
import { showMessage } from 'react-native-flash-message';
import Axios from 'axios';
import qs from 'qs';
import { Actions } from 'react-native-router-flux';


class SubmitReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: '',
            starRating: 0,
        };
    }

    ratingCompleted = (rating) => {
        this.setState({
            starRating: rating
        })
    }


    SubmitReview = () => {
        this.setState({ loading: true, refreshing: true });

        const feed_back = this.state.feedback;
        const rating = this.state.starRating;
        const property_id = this.props.propertyID;
        const user_id = this.props.userID;
        const booking_id = this.props.booking_id;

        const self = this;
        const data = { feedback: feed_back, user_id: user_id, property_id: property_id, rate: rating, booking_id: booking_id };

        Axios.post(Helpers.api_url + 'submit_review_feedback/' + property_id,
            qs.stringify(data))
            .then(response => {
                if (response.data.type == 'success') {
                    showMessage({
                        message: "Success!",
                        description: response.data.msg,
                        type: "default",
                        backgroundColor: "#57b5aa",
                        color: "#fff",
                    });
                    this.props.refreshBookInfo();
                    Actions.pop();
                } else {
                    showMessage({
                        message: "Oops!",
                        description: "Something went wrong",
                        type: "default",
                        backgroundColor: "#fff",
                        color: "#555",
                    });
                }
                this.setState({ loading: false, refreshing: false })
            })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={Styles.container}>
                    <Text style={[Styles.sectionHeader, Styles.fontGilroyBold, { fontSize: 30 }]}>Submit a Review</Text>
                    <Text style={[Styles.fontGilroyLight, { fontSize: 15 }]}>Rate us, and tell us about your experience.</Text>
                    <Input
                        multiline={true}
                        onFocus={() => { this.setState({ focusedInput: 'propInfo' }) }}
                        inputContainerStyle={[Styles.inputContainerStyle, { minHeight: 100, paddingVertical: 0 }]}
                        placeholder='Write a review'
                        placeholderStyle={Styles.fontGilroyLight}
                        inputStyle={[Styles.inputStyle, Styles.fontGilroy, { flex: 1, alignSelf: 'flex-start' }]}
                        onChangeText={(feedback) => this.setState({ feedback })}
                        value={this.state.feedback}
                    />
                    <Rating
                        size={20}
                        startingValue={0}
                        onFinishRating={this.ratingCompleted}
                        style={{ paddingVertical: 10, marginTop: 60 }}
                        showRating={false}
                    />
                </View>
                <View style={Styles.bottomAction}>
                    <View style={{ paddingVertical: 20 }}>
                        <ThemeButton
                            title="Submit Review"
                            onPress={() => this.SubmitReview()}
                            loading={this.state.loading}
                        />
                    </View>
                </View>
            </View>
        );
    }
}



const mapStateToProps = state => {
    return {
        userID: state.userID
    }
}

export default connect(
    mapStateToProps
)(SubmitReview);
