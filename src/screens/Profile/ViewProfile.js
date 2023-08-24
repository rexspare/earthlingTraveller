import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Divider, Avatar, Image } from 'react-native-elements';
import { CollapsibleHeader, ReadMoreText, FullScreenLoader, LinearButton, ThemeButton, defaultColors } from '../../components/Common';
import Styles from '../../assets/Styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Axios from 'axios';
import qs from 'qs';
import Helpers, { parseDate } from '../../Helpers';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class ViewProfile extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        properties: [],
        loading: true
    }

    componentDidMount = () => {
        this.getData();
        console.log('view', this.props);

    }

    getData = () => {

        Axios.get(
            Helpers.api_url + 'getuserdata/' + this.props.profileID
        ).then(response => {
            this.setInitialStates(response.data);
        })
    }

    setInitialStates = (data) => {
        this.setState({
            fullName: data.user_info.firstname + ' ' + data.user_info.lastname,
            memberSince: parseDate(data.user_info.member_since),
            verified: data.user_info.verified == 1 ? true : false,
            introduction: data.user_info.introduction,
            avatar: data.user_info.avatar,
            properties: data.properties,
            phoneNumber: data.user_info.user_phoneNumber,
            emailAddress: data.user_info.email_address,
            userType: data.user_info.user_type,
            loading: false
        })
    }

    messageProfile = () => {
        this.setState({ loading: true })

        // userID = app user
        // profileID = view profile user id
        const { userID, profileID } = this.props;
        const self = this;

        Axios.post(
            Helpers.traveller_api + 'checkconvo',
            qs.stringify({ userID, profileID })
        ).then(response => {
            const { type, returnData } = response.data;
            self.setState({ loading: false })

            if (type == 'success') {
                Actions.viewMessage({ title: returnData.to_user, conversationId: returnData.conversationId, notifyFcm: returnData.to_user_fcm });
            } else {
                this.createConvo();
            }
        })
    }

    createConvo = () => {
        const { userID, profileID } = this.props;

        Axios.post(
            Helpers.traveller_api + 'createconvo',
            qs.stringify({ userID, profileID })
        ).then(response => {
            const returnData = response.data;

            Actions.viewMessage({ title: returnData.to_user, conversationId: returnData.conversationId, notifyFcm: returnData.to_user_fcm });
        })
    }

    _renderHeader = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginTop: 25 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={[Styles.fontGilroyBold, { fontSize: 35 }]}>Hello, I'm {this.state.fullName}</Text>
                        <Text style={[Styles.fontGilroyLight, { fontSize: 18, marginTop: 5, color: '#333' }]}>Member since {this.state.memberSince}</Text>
                    </View>
                    <View style={{ flex: .3, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Avatar
                            rounded
                            size="large"
                            source={{ uri: Helpers.avatars_url + (this.state.avatar != '' ? this.state.avatar : 'no-avatar.png') }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginTop: 25 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icons name="marker-check" color={this.state.verified ? "#57b5aa" : 'gainsboro'} size={30} style={{ marginRight: 10 }} />
                        <Text style={[Styles.fontGilroyLight, { fontSize: 20, alignItems: 'center' }]}>{this.state.verified ? 'Verified' : 'Not Verified'}</Text>
                    </View>
                </View>
                {
                    this.state.phoneNumber != '0' || this.state.phoneNumber != '' ?
                        (
                            <View style={{ flexDirection: 'column', marginTop: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icons name="phone" color="#57b5aa" size={30} style={{ marginRight: 10 }} />
                                    <Text style={[Styles.fontGilroyLight, { fontSize: 20, alignItems: 'center' }]}>{this.state.phoneNumber}</Text>
                                </View>
                            </View>
                        ) : null
                }
                {
                    this.state.emailAddress != '' ?
                        (
                            <View style={{ flexDirection: 'column', marginTop: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icons name="email-check" color={defaultColors(1)} size={30} style={{ marginRight: 10 }} />
                                    <Text style={[Styles.fontGilroyLight, { fontSize: 20, alignItems: 'center' }]}>{this.state.emailAddress}</Text>
                                </View>
                            </View>
                        ) : null
                }

                <Divider style={{ marginVertical: 25, backgroundColor: '#eee' }} />
            </View>
        )
    }

    _renderAbout = () => {
        if (this.state.introduction != '') {
            return (
                <View style={{ flex: 1 }}>
                    <Text style={[Styles.fontGilroyBold, { fontSize: 20, marginBottom: 25 }]}>About Me</Text>
                    <IconFontisto name="quote-a-right" color="#eee" size={30} />
                    <Text style={[Styles.fontGilroyLight, { fontSize: 18, color: '#444', marginVertical: 15, textAlign: 'justify' }]}>{'\t\t'}{this.state.introduction}</Text>
                    <View style={{ width: 35, height: 5, backgroundColor: '#eee' }}></View>

                    <Divider style={{ marginVertical: 25, backgroundColor: '#eee' }} />
                </View>
            )
        } else {
            return null
        }
    }

    _renderListings = () => {
        return this.state.userType == 1 ? (
            <View style={{ flex: 1 }}>
                <Text style={[Styles.fontGilroyBold, { fontSize: 20 }]}>{this.state.fullName}'s Properties</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexDirection: 'row', paddingVertical: 15 }}
                >
                    {
                        this.state.properties.length ? this.state.properties.map(card => {
                            return (
                                <TouchableOpacity key={card.id} onPress={() => Actions.preview({ property_id: card.id })}>
                                    <View style={styles.card}>
                                        <Image
                                            source={{ uri: Helpers.image_url + (card.image != '' ? card.image : 'no-image.jpg') }}
                                            style={{ width: 280, height: 200, borderRadius: 5, resizeMode: 'cover' }}
                                            PlaceholderContent={<ActivityIndicator />}
                                        />
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flex: 3 }}>
                                                <Text style={[Styles.fontGilroyBold, { marginVertical: 5, color: '#57b5aa' }]}>{card.type_of_place}</Text>
                                                <Text style={[Styles.fontGilroyBold, { fontSize: 20 }]}>{card.title}</Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                <Text style={[Styles.fontGilroyBold, { marginVertical: 5, fontSize: 18, color: '#57b5aa' }]}>${card.price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }) : <Text style={[Styles.fontGilroyBold, { color: defaultColors(1), }]}>No Listings Available Yet</Text>
                    }
                </ScrollView>
            </View>
        ) : null
    }

    render() {
        if (this.state.loading) {
            return (
                <FullScreenLoader theme="light" />
            )
        } else {
            return (
                <CollapsibleHeader>
                    <View style={[Styles.container, { paddingVertical: 20 }]}>
                        {/* Header */}
                        {this._renderHeader()}

                        {/* About */}
                        {this._renderAbout()}

                        {/* Listings */}
                        {this._renderListings()}
                    </View>
                    {
                        this.props.profileID != this.props.userID ? (
                            <View style={{ marginHorizontal: 25, marginVertical: 30 }}>
                                <ThemeButton title="Message" onPress={this.messageProfile} />
                            </View>
                        ) : null
                    }
                </CollapsibleHeader>
            );

        }
    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID
    }
}

export default connect(
    mapStateToProps,
)(ViewProfile);

const styles = StyleSheet.create({
    card: {
        marginRight: 15,
    }
});