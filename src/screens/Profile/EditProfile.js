import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import CustomNav1 from "../../components/CustomNav1";
import Styles from '../../assets/Styles';
import { Input, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { FullScreenLoader, LinearButton, defaultColors, ThemeButton } from "../../components/Common";
import DatePicker from 'react-native-datepicker'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
import Icon from 'react-native-vector-icons/Octicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Axios from 'axios';
import qs from 'qs';
import Helpers from '../../Helpers';
import { showMessage } from 'react-native-flash-message';


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subtitle: 'sub',
            imageSource: 'no-avatar.png ',
            data: null,
            fname: '',
            lname: '',
            gender: '',
            birthdate: '',
            password: '',
            email_address: '',
            user_phone_number: '',
            focusedInput: '',
            isLoading: true,
            introduction: ''
        };

    }

    componentDidMount = () => {
        this._onRefresh();
    }


    selectPhoto = () => {
        const options = {
            title: 'Select a photo',
            takePhotoButtonTitle: "Take a photo",
            chhooseFromLibraryButtonTitle: 'Choose from gallery',
            quality: 1
        }

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    imageSource: source,
                    data: response.data,
                    respon: response.fileName,
                });
                this.uploadPhoto();
            }
        });
    }

    uploadPhoto = () => {
        const userID = this.props.userID;
        const saveAvatarUrl = Helpers.api_url + 'saveAvatar/' + userID;

        const data = {
            name: 'image',
            tmp_name: 'avatar-hehe.png',
            filename: this.state.respon,
            data: this.state.data,
            userID: userID
        };

        RNFetchBlob.fetch('POST', saveAvatarUrl, {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [data]).then((resp) => {
            const parsedStatus = JSON.parse(resp.data);

            if (parsedStatus.type == "success") {
                this.setState({
                    imageSource: parsedStatus.returnData
                })
                showMessage({
                    message: "Success",
                    description: parsedStatus.msg,
                    type: "success",
                    backgroundColor: "#459E94",
                    color: "#FFF",
                    duration: 2000,
                });
            } else {
                showMessage({
                    message: "Something went wrong"
                })
            }
        })
    }

    _onRefresh = () => {
        this.getData();
    }

    getData = () => {
        // userID
        Axios.get(Helpers.traveller_api + 'get_user_info/' + this.props.userID).then(response => {
            this.initStates(response.data);
        })
    }

    initStates = (data) => {
        this.setState({
            fname: data.firstname,
            lname: data.lastname,
            gender: data.gender,
            birthdate: data.birthdate,
            email_address: data.email_address,
            user_phone_number: data.user_phoneNumber,
            introduction: data.introduction,
            isLoading: false
        })
    }

    editProfileCheck = () => {
        const userID = this.props.userID;
        const fname = this.state.fname;
        const lname = this.state.lname;
        const birthdate = this.state.birthdate;
        const email_address = this.state.email_address;
        const gender = this.state.gender;
        const phone_number = this.state.property_number;
        const introduction = this.state.introduction;
        const password = this.state.password;

        const editData = { fname, lname, birthdate, email_address, gender, phone_number, introduction, password }
        console.log('editData', editData);

        Axios.post(
            Helpers.api_url + '/editProfile/' + userID,
            qs.stringify(editData)
        )
            .then(response => {
                if (response.data.type == "success") {
                    this.setState({ isLoading: false })
                    showMessage({
                        message: "Success",
                        description: response.data.msg,
                        type: "success",
                        backgroundColor: "#459E94",
                        color: "#FFF",
                        duration: 2000,
                    });
                }
            })
    }

    render() {
        const { isLoading, imageSource, fname } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <CustomNav1 title="PROFILE" rightIcon="check" rightIconAction={() => this.editProfileCheck()} />

                <ScrollView
                    contentContainerStyle={[Styles.container, { paddingVertical: 0, flex: 0 }]}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={this._onRefresh}
                            colors={defaultColors(2)}
                        />
                    }
                >
                    <View style={{ marginBottom: 15 }}>
                        <Text style={[Styles.pageTitle, Styles.fontGilroyBold]}>Edit Personal Info</Text>
                    </View>
                    <View style={{ paddingVertical: 25, paddingHorizontal: '30%' }}>
                        <Avatar
                            rounded
                            size="xlarge"
                            title='E'
                            showEditButton
                            onPress={this.selectPhoto}
                            source={{
                                uri: Helpers.avatars_url + (imageSource != '' ? imageSource : 'no-avatar.png')
                            }}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={Styles.fontGilroyBold}>First Name</Text>
                        <Input inputStyle={[Styles.textInput, Styles.fontGilroyLight]}
                            onFocus={() => { this.setState({ focusedInput: 'fname' }) }}
                            onChangeText={(val) => this.setState({ fname: val })}
                            inputContainerStyle={[Styles.inputContainerStyle]}
                            value={this.state.fname}
                            leftIcon={
                                <Icon
                                    name='person'
                                    size={24}
                                    color='black'
                                />
                            }
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={Styles.fontGilroyBold}>Last Name</Text>
                        <Input inputStyle={[Styles.textInput, Styles.fontGilroyLight]}
                            onFocus={() => { this.setState({ focusedInput: 'lname' }) }}
                            onChangeText={(val) => this.setState({ lname: val })}
                            inputContainerStyle={[Styles.inputContainerStyle]}
                            value={this.state.lname}
                            leftIcon={
                                <Icon
                                    name='person'
                                    size={24}
                                    color='black'
                                />
                            }

                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={Styles.fontGilroyBold}>Gender</Text>
                        <Input inputStyle={[Styles.textInput, Styles.fontGilroyLight]}
                            onFocus={() => { this.setState({ focusedInput: 'gender' }) }}
                            onChangeText={(val) => this.setState({ gender: val })}
                            inputContainerStyle={[Styles.inputContainerStyle]}
                            value={this.state.gender}
                            leftIcon={
                                <Icons
                                    name='venus-mars'
                                    size={24}
                                    color='black'
                                />
                            }
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={Styles.fontGilroyBold}>Birth Date</Text>
                        <DatePicker
                            style={[Styles.inputContainerStyle, { width: '100%', marginHorizontal: 0 }]}
                            date={this.state.birthdate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(birthdate) => { this.setState({ birthdate: birthdate }) }}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    borderRadius: 10,
                                    marginLeft: 10,
                                },
                                dateInput: {
                                    borderWidth: 0,
                                },
                                dateText: {
                                    fontFamily: 'Gilroy-Light',
                                }
                            }}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={Styles.fontGilroyBold}>Email</Text>
                        <Input inputStyle={[Styles.textInput, Styles.fontGilroyLight]}
                            onFocus={() => { this.setState({ focusedInput: 'email_address' }) }}
                            onChangeText={(val) => this.setState({ email_address: val })}
                            inputContainerStyle={[Styles.inputContainerStyle]}
                            value={this.state.email_address}
                            leftIcon={
                                <Feather
                                    name='mail'
                                    size={24}
                                    color='#03C9D6'
                                />
                            }
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={Styles.fontGilroyBold}>Password (Optional)</Text>
                        </View>
                        <Input inputStyle={[Styles.textInput, Styles.fontGilroyLight]}
                            onFocus={() => { this.setState({ focusedInput: 'password' }) }}
                            onChangeText={(val) => this.setState({ password: val })}
                            inputContainerStyle={[Styles.inputContainerStyle]}
                            value={this.state.password}
                            secureTextEntry={true}
                            leftIcon={
                                <Feather
                                    name='lock'
                                    size={24}
                                    color='orange'
                                />
                            }
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={Styles.fontGilroyBold}>Phone Number</Text>
                        <Input inputStyle={[Styles.textInput, Styles.fontGilroyLight]}
                            onFocus={() => { this.setState({ focusedInput: 'user_phone_number' }) }}
                            onChangeText={(val) => this.setState({ user_phone_number: val })}
                            inputContainerStyle={[Styles.inputContainerStyle]}
                            value={this.state.user_phone_number}
                            leftIcon={
                                <Feather
                                    name='phone'
                                    size={24}
                                    color='green'
                                />
                            }
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={Styles.fontGilroyBold}>About Me</Text>
                        <Input
                            multiline={true}
                            onFocus={() => { this.setState({ focusedInput: 'introduction' }) }}
                            inputContainerStyle={[Styles.inputContainerStyle, { minHeight: 100, marginBottom: 100 }]}
                            placeholder='Write a description here'
                            inputStyle={[Styles.inputStyle, Styles.fontGilroyLight, { flex: 1, alignSelf: 'flex-start' }]}
                            onChangeText={(introduction) => this.setState({ introduction })}
                            value={this.state.introduction}
                        />
                    </View>
                    <ThemeButton title="Save" containerStyle={{ marginBottom: 25 }} onPress={this.editProfileCheck} />
                </ScrollView>
            </View>
        );

    }
}

const mapStateToProps = state => {
    return {
        userID: state.userID
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
)(EditProfile);
