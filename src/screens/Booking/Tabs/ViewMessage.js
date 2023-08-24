import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, ActivityIndicator, Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { Image } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import CustomNav1 from '../../../components/CustomNav1';
import Styles from '../../../assets/Styles';
import { makeId } from '../../../Helpers';
import { defaultColors } from '../../../components/Common';
import Fire from '../../../Fire';

const ListItemComponent = ({ item }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, paddingHorizontal: 25, paddingVertical: 5 }}>
            {
                item.id % 2 == 0 ? (
                    <View style={{ flex: .8, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.thumbnailUrl }} />
                    </View>
                ) : null
            }
            <LinearGradient
                style={{ flex: 3.2, padding: 20, justifyContent: 'center', borderRadius: 10 }}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#00A9A6', '#13BEB6', '#2AD9CA']}
            >
                <Text style={[Styles.fontGilroyLight, { color: '#fff' }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan condimentum diam, nec hendrerit justo finibus nec. Interdum et malesuada fames ac ante ipsum primis in faucibus.</Text>
                <Text style={[Styles.fontGilroyLight, { color: '#ddd', marginTop: 15 }]}>12:33PM</Text>
            </LinearGradient>
            {
                item.id % 2 != 0 ? (
                    <View style={{ flex: .8, justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                        <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.thumbnailUrl }} />
                    </View>
                ) : null
            }
        </View>
    )
}

const ChatInput = () => {
    return (
        <View style={{ flex: 1, height: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', marginBottom: 10, borderWidth: 0, borderRadius: 50, backgroundColor: 'white', width: '90%', elevation: 2 }}>
            <Image style={{ width: 35, height: 35, borderRadius: 25, marginLeft: 10 }} source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpickaface.net%2Fgallery%2Favatar%2Funr_sample_161118_2054_ynlrg.png&f=1&nofb=1' }} />
            <TextInput
                style={[{ flex: 1, marginLeft: 10 }, Styles.fontGilroyLight]}
                placeholder="Type a message"
            // value={this.state.fname}>
            />
            <Icon name="send" style={{ flex: .13 }} size={18} color={defaultColors(1)} />
        </View>
    )
}

class ViewMessage extends Component {
    state = {
        messages: [],
        currentPage: 0,
        loading: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.getData();
    }

    get user() {
        return {
            _id: this.props.userID,
            name: this.props.userName
        }
    }

    getData = async () => {
        const conversationId = this.props.conversationId;

        Fire.get(message => this.setState(
            previous => ({
                messages: GiftedChat.append(previous.messages, message)
            })),
            conversationId
        );
    }

    sendFire(send) {
        const message = {
            _id: (parseInt(this.state.messages.length) + 1),
            text: send.text,
            timestamp: Date(firebase.firestore.FieldValue.serverTimestamp()).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
            user: send.user,
            notifyFcm: this.props.notifyFcm
        };
        Fire.send(message, this.props.updateConvo);
    }

    onLongPress = (props) => {
        console.log('viewmsg', props);
    }

    render() {
        const chat =
            <GiftedChat
                alwaysShowSend
                messages={this.state.messages}
                user={this.user}
                messagesContainerStyle={{ paddingBottom: 25 }}
                containerStyle={{ borderTopWidth: 0 }}
                primaryStyle={styles.composerStyle}
                textInputStyle={[Styles.fontGilroyLight, { flex: 1, alignItems: 'center', paddingVertical: 10 }]}
                customTextStyle={Styles.fontGilroyLight}
                onSend={props => this.sendFire(props[0])}
                onLongPress={(i, message) => this.onLongPress(message)}
                renderLoading={() => <ActivityIndicator style={{ marginTop: 25 }} size="large" color={defaultColors(1)} />}
                inverted={true}
                renderSend={(props) => {
                    return (
                        <Send {...props} containerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="send" style={{ marginRight: 25 }} size={18} color={defaultColors(1)} />
                        </Send>
                    )
                }}
            />

        if (Platform.OS === 'android') {
            return (
                <View style={{ flex: 1 }}>
                    <CustomNav1 title={this.props.title} lightTheme />
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                    >
                        {chat}
                    </KeyboardAvoidingView>
                </View>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    {chat}
                </SafeAreaView>
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        userID: state.userID,
        userName: state.userName
    }
}


export default connect(
    mapStateToProps
)(ViewMessage)


const styles = StyleSheet.create({
    composerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        borderWidth: 0,
        borderRadius: 25,
        backgroundColor: 'white',
        width: '90%',
        elevation: 2
    }
});
