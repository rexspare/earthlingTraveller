import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';
import Axios from 'axios';
import { connect } from 'react-redux';
import Helpers from '../../../Helpers';
import { defaultColors } from '../../../components/Common';
import Navigator from '../../../components/Navigator';
import Styles from '../../../assets/Styles';
import moment from 'moment';
import Swipeout from 'react-native-swipeout';
import qs from 'qs'
import { showMessage } from 'react-native-flash-message';

class Messages extends Component {
    state = {
        messages: [],
        loading: true
    }

    componentDidMount = () => {
        this.getData();
    }

    getData = () => {
        const self = this;

        Axios.post(
            Helpers.api_url + 'getConversation/' + this.props.userID
        ).then(response => {
            console.log(response);

            self.setState({
                messages: response.data
            })
        })

        this.setState({
            loading: false
        })
    }

    viewMessage = (data) => {
        Actions.viewMessage({ title: data.from, conversationId: data.conversationId, notifyFcm: data.notifyFcm, updateConvo: this.getData });
    }

    renderDateTime = (thatDate) => {
        const stillUtc = moment.utc(thatDate).toDate();
        const newDate = moment(stillUtc).format('hh:mmA | MMM D, YYYY');


        return newDate;
    }


    _onRefresh = () => {
        this.setState({
            loading: true
        });

        this.getData();
    }

    deleteNote = (from, conversationID) => {
        const data = { from, conversationID };

        Axios.post(Helpers.traveller_api + "deleteMessage/" + this.props.userID, qs.stringify(data)).then(response => {
            if (response.data.type == "success") {
                showMessage({
                    message: "Success!",
                    description: response.data.msg,
                    type: "default",
                    backgroundColor: "#57b5aa",
                    color: "#fff",
                });
                this._onRefresh();
            }
        })

    }

    _renderMessages = () => {
        const { messages } = this.state;

        if (!Array.isArray(messages)) {
            return false;
        }

        if (messages.length) {
            return messages.map((message, i) => {
                let swipeBtns = [{
                    component: (
                        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 10, backgroundColor: '#FE3A2F' }, message.pending == '0' ? Styles.messageCardPending : null]}>
                            <Icon name="trash-2" size={20} color="#FFF" />
                        </View>
                    ),
                    onPress: () => { this.deleteNote(message.created_by_id, message.conversationId) }
                }];

                if (message.created_by_id == this.props.userID) {
                    message.from = message.to_user;
                    message.notifyFcm = message.to_user_fcm;
                } else {
                    message.from = message.created_by;
                    message.notifyFcm = message.created_by_fcm;
                }

                return (
                    <Swipeout
                        right={swipeBtns}
                        autoClose='true'
                        backgroundColor='transparent'
                        style={{ marginBottom: 18 }}
                    >
                        <TouchableOpacity
                            key={i}
                            style={[Styles.messageCard, message.pending == '0' ? Styles.messageCardPending : null]}
                            onPress={() => this.viewMessage(message)}
                        >
                            <View style={{ flex: .8 }}>
                                <LinearGradient
                                    style={{
                                        width: 40, height: 40, marginTop: 7, alignItems: 'center',
                                        justifyContent: 'center', borderRadius: 20
                                    }}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={defaultColors(3)}
                                >
                                    <Text style={[{ alignContent: 'center', color: '#FFF' }, Styles.fontGilroyBold]}>{message.from.charAt(0)}</Text>
                                </LinearGradient>
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text style={[Styles.fontGilroyBold, { textTransform: 'uppercase', marginBottom: 3 }]}>{message.from}</Text>
                                <Text style={[{ marginBottom: 10, color: '#444', fontSize: 10 }, Styles.fontGilroyLight]}><Icon name="calendar" color={defaultColors(1)} size={10} /> {this.renderDateTime(message.date)}</Text>
                                <Text style={[{ color: '#111', fontSize: 13 }, Styles.fontGilroyLight]}>{message.content.substring(0, 100) + '...'}</Text>
                            </View>
                        </TouchableOpacity>
                    </Swipeout>
                )
            })
        } else {
            return (
                <Text style={[Styles.fontGilroyLight, { fontSize: 20, color: '#555' }]}>No messages found</Text>
            )
        }

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ padding: 25 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.loading}
                            onRefresh={this._onRefresh}
                            colors={defaultColors(2)}
                        />
                    }
                >
                    {this._renderMessages()}
                </ScrollView >
                <Navigator />
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
)(Messages)
