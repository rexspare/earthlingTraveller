import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import Styles from '../../../assets/Styles';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';
import Axios from 'axios';
import Helpers, { parseDateTime } from '../../../Helpers';
import { connect } from 'react-redux';

class Sms extends Component {
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
            self.setState({
                messages: response.data
            })
        })

        this.setState({
            loading: false
        })
    }

    viewMessage = (data) => {
        Actions.viewMessage({ title: data.from, conversationId: data.conversationId });
    }

    _onRefresh = () => {
        this.setState({
            loading: true
        });

        this.getData();
    }

    _renderMessages = () => {
        const { messages } = this.state;

        return messages.map((message, i) => {
            console.log('themessage', message);

            if (message.created_by_id == this.props.userID) {
                message.from = message.to_user;
            } else {
                message.from = message.created_by;
            }

            return (
                <TouchableOpacity
                    key={i}
                    style={[Styles.messageCard, message.pending == '0' ? Styles.messageCardPending : null]}
                    onPress={() => this.viewMessage(message)}
                >
                    <View style={{ flex: .8 }}>
                        <LinearGradient
                            style={{ width: 40, height: 40, marginTop: 7, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#F67922', '#FAAD4A', '#FEDD56']}
                        >
                            <Text style={[{ alignContent: 'center', color: '#FFF' }, Styles.fontGilroyBold]}>{message.from.charAt(0)}</Text>
                        </LinearGradient>
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={[Styles.fontGilroyBold, { textTransform: 'uppercase', marginBottom: 3 }]}>{message.from}</Text>
                        <Text style={[{ marginBottom: 10, color: '#444', fontSize: 10 }, Styles.fontGilroyLight]}><Icon name="calendar" color="orange" size={10} /> {parseDateTime(message.date)}</Text>
                        <Text style={[{ color: '#111', fontSize: 13 }, Styles.fontGilroyLight]}>{message.content.substring(0, 100) + '...'}</Text>
                    </View>
                </TouchableOpacity>
            )
        })

    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={{ padding: 25 }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.loading}
                        onRefresh={this._onRefresh}
                        colors={['orange', '#57b5aa']}
                    />
                }
            >
                {this._renderMessages()}
            </ScrollView >
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
)(Sms)
