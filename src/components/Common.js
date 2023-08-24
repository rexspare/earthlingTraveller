import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient'
import Styles from '../assets/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Overlay, Avatar } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-spinkit';
import ReadMore from 'react-native-read-more-text';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';
import Helpers from '../Helpers';


export const ReviewItem = (props) => {
    return (
        <View style={{ flex: 1, ...props.containerStyle }}>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Avatar
                        rounded
                        size={'medium'}
                        source={{
                            uri: props.image ? props.image : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                        }}
                    />
                    <View style={{ flexDirection: 'column', marginLeft: 15, flex: 1 }}>
                        <Text style={Styles.fontGilroyBold}>{props.name}</Text>
                        <Text style={Styles.fontGilroyLight}>January 20, 2019</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', flex: 1 }}>
                        {props.renderStars}
                    </View>
                </View>
            </View>


            {
                props.enableReadMore ?
                    (
                        <ReadMoreText textStyle={Styles.fontGilroyLight} text={props.review} />
                    ) : (
                        <Text style={Styles.fontGilroyLight}>{props.review}</Text>
                    )
            }
        </View>
    )
}

export const ReadMoreText = (props) => {
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={[commonStyle.readMoreText, Styles.fontGilroyLight]} onPress={handlePress}>
                Read more
            </Text>
        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={[commonStyle.readMoreText, Styles.fontGilroyLight]} onPress={handlePress}>
                Show less
            </Text>
        );
    }

    return (
        <View>
            <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={this._renderTruncatedFooter}
                renderRevealedFooter={this._renderRevealedFooter}
            >
                <Text style={props.textStyle}>
                    {props.text}
                </Text>
            </ReadMore>
        </View>
    );
}

export const RowInfo = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[commonStyle.rowHeader, props.noBorderBottom ? null : { borderBottomWidth: .5, borderColor: '#ebebeb' }]}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={[Styles.fontGilroyLight, { fontSize: 18, marginBottom: 5, ...props.leftContentStyle }]}>{props.leftContent}</Text>
                    {
                        props.leftSubContent ? (
                            <Text style={[Styles.fontGilroyLight, { ...props.leftSubContentStyle }]}>{props.leftSubContent}</Text>
                        ) : null
                    }
                </View>
                <Text style={[Styles.fontGilroyLight, { fontSize: 18, color: '#888', ...props.rightStyle }]}>{props.rightContent}</Text>
            </View>
        </TouchableOpacity>
    )
}

export const LinearButton = (props) => {
    let colors = ['#57b5aa', '#12c7b3', '#00ddc3'];

    if (props.disabled) {
        colors = ['#bbb', '#bbb', '#bbb']
    }

    return (

        <TouchableOpacity
            onPress={props.onPress}
        >
            <LinearGradient
                style={[Styles.linearGradient, props.containerStyle, { height: 47, justifyContent: 'center', alignItems: 'center' }]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={colors}
            >
                {
                    props.loading ? (
                        <Spinner isVisible={true} size={30} type="ThreeBounce" color="white" />
                    ) : (
                            <Text
                                style={props.style}
                            >
                                {props.title}
                            </Text>
                        )
                }
            </LinearGradient>
        </TouchableOpacity>
    );
}
export const LinearButtons = (props) => {
    let colors = ['#57b5aa', '#12c7b3', '#00ddc3'];

    if (props.disabled) {
        colors = ['#bbb', '#bbb', '#bbb']
    }

    return (

        <TouchableOpacity
            onPress={props.onPress}
        >
            <LinearGradient
                style={[Styles.linearGradient, props.containerStyle, { height: 47, alignItems: 'center' }]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={colors}
            >
                {
                    props.loading ? (
                        <Spinner isVisible={true} size={30} type="ThreeBounce" color="white" />
                    ) : (
                            <Text
                                style={props.style}
                            >
                                {
                                    props.icon ? props.icon : null

                                }
                                {props.title}
                            </Text>
                        )
                }
            </LinearGradient>
        </TouchableOpacity>
    );
}
export const TransparentHeader = (props) => {
    return (
        <View style={[commonStyle.transparentHeader, { borderColor: props.borderColor }, props.style]}>
            <View style={commonStyle.navColumn}>
                <TouchableOpacity onPress={Actions.pop} style={{ marginLeft: 15 }}>
                    <Icon name="angle-left" color={props.contentColor} size={25} ></Icon>
                </TouchableOpacity>
            </View>
            <View style={commonStyle.navColumn}>
                <Text style={[Styles.fontGilroyBold, commonStyle.transparentHeaderTitle, { color: props.contentColor }]}>{props.title}</Text>
            </View>
            <View style={[commonStyle.navColumn, { alignItems: 'flex-end', marginRight: 15 }]} >
                {props.right}
            </View>
        </View>
    );
}

export const TransparentHeaderLogo = (props) => {
    return (
        <Animatable.View animation="fadeInDown" style={[commonStyle.transparentHeader, props.style]}>
            <View style={[commonStyle.navColumn, { alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 15 }]}>
                <Image source={require('../assets/images/icon.png')} resizeMode="contain" style={{ width: 40, height: 40 }} />
            </View>
            <View style={[commonStyle.navColumn, { alignItems: 'center', flexDirection: 'row', marginLeft: -15 }]}>
                <Text style={[Styles.fontGilroyBold, { color: '#fff', fontSize: 25 }]}>Earthling</Text>
            </View>
            <View style={[commonStyle.navColumn, { alignItems: 'flex-end' }]}>
                <TouchableOpacity onPress={Actions.profile} style={{ marginRight: 15 }}>
                    <Avatar
                        size="medium"
                        style={{ width: 40, height: 40, }}
                        rounded
                        source={{
                            uri: props.profileImage ? Helpers.avatars_url + props.profileImage : Helpers.avatars_url + 'no-avatar.png',
                        }}
                    />
                </TouchableOpacity>
            </View>
        </Animatable.View>
    );
}
export const TransparentHeaderProfileLogo = (props) => {
    return (
        <View style={[commonStyle.transparentHeader, {}, props.style]}>
            <View style={commonStyle.navColumn}>
                <TouchableOpacity onPress={Actions.profile} style={{ marginLeft: 15 }}>
                    <Avatar
                        size="medium"
                        rounded
                        source={{
                            uri:
                                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={commonStyle.navColumn}>

            </View>
            <View style={{ paddingTop: 10, marginRight: 15 }} >
                <Icon

                    name='sign-out'
                    type='font-awesome'
                    color='#f50'
                    size={30}
                    onPress={() => console.log('hello')} />
            </View>
        </View>
    );
}

export const CollapsibleHeader = (props) => {
    return (
        <CollapsibleHeaderScrollView
            style={{ flex: 1, ...props.containerStyle, paddingTop: Platform.OS === 'ios' ? 20 : 0, }}
            CollapsibleHeaderComponent={(
                <View style={commonStyle.collapsibleHeader}>
                    <View style={commonStyle.navColumn}>
                        <TouchableOpacity onPress={Actions.pop} style={{ marginLeft: 15 }}>
                            <Icon name="angle-left" color={props.contentColor} size={25} ></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={commonStyle.navColumn}>
                        <Text style={[Styles.fontGilroyBold, commonStyle.transparentHeaderTitle, { color: props.contentColor }]}>{props.title}</Text>
                    </View>
                    <View style={[commonStyle.navColumn, { ...props.rightContainerStyle, alignItems: 'flex-end', marginRight: 15 }]} >
                        {props.right}
                    </View>
                </View>
            )}
            headerHeight={55}
        >
            {props.children}
        </CollapsibleHeaderScrollView>
    )
}

export const CustomOverlay = (props) => {
    return (
        <Overlay
            isVisible={props.isVisible}
            onBackdropPress={props.onBackdropPress}
            containerStyle={{ backgroundColor: '#000', opacity: 0.85 }}
            height="auto"
            overlayStyle={[{ width: '90%', borderRadius: 15, maxHeight: '80%' }, props.containerStyle]}
        >
            <Animatable.View animation="fadeIn">
                <View style={commonStyle.overlayHeader}>
                    <Text style={[{ fontSize: 15, color: '#fff' }, Styles.fontGilroyBold]}>{props.title}</Text>
                    <Text style={[{ color: 'white', fontSize: 18, position: 'absolute', right: 0 }, Styles.fontGilroyBold]} onPress={props.onBackdropPress}>X</Text>
                </View>
                {props.children}
            </Animatable.View>
        </Overlay>
    );
}

export const defaultColors = (num) => {
    let colors = [];

    if (num == 1) {
        colors = '#0BBCB2';
    } else if (num == 2) {
        colors = ['#0BBCB2', '#008080'];
    } else {
        colors = ['#008080', '#09968E', '#0BBCB2']
    }

    return colors;
}

setColors = (theme) => {
    let colors = [];

    switch (theme) {
        case 'light':
            colors['spinnerColor'] = '#008080';
            colors['gradient'] = ['#FFFFFF', '#FFFFFF', '#FFFFFF'];
            break;
        default:
            colors['spinnerColor'] = '#FFFFFF';
            colors['gradient'] = ['#0BBCB2', '#09968E', '#008080'];
            break;
    }

    return colors;
}

export const FullScreenLoader = (props) => {
    let colors = setColors(props.theme);

    return (
        <Animatable.View style={{ flex: 1 }}>
            <LinearGradient colors={colors.gradient} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {props.children}
                <Spinner isVisible={true} size={40} type="ThreeBounce" color={colors.spinnerColor} />
            </LinearGradient>
        </Animatable.View>
    )
}

export const Dot = (props) => {
    return (
        <View {...props} style={[Styles.dot, { marginHorizontal: 5 }]}></View>
    )
}

export const ThemeButton = (props) => {
    return (
        <TouchableOpacity style={{ ...props.containerStyle }} onPress={props.onPress} disabled={props.loading}>
            <View style={[Styles.actionButtons, { ...props.buttonStyle, backgroundColor: props.outline ? 'transparent' : defaultColors(1), borderColor: defaultColors(1), borderWidth: 1 }]}>
                {
                    props.loading ? (
                        <Spinner isVisible={true} size={22} type="ThreeBounce" color={props.outline ? defaultColors(1) : 'white'} />
                    ) : <Text style={[Styles.fontGilroyBold, { color: props.outline ? defaultColors(1) : 'white', fontSize: 16 }]}>{props.title}</Text>
                }
            </View>
        </TouchableOpacity >
    )
}

export const RatingStars = (props) => {
    const aveStars = "" + props.stars;

    const displayStars = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
    ];

    return displayStars.map(star => (
        <Icon key={star.id} name="star" color={star.id <= aveStars.charAt(0) ? "orange" : "gainsboro"} style={{ marginRight: 4, marginTop: 5 }} />
    ))
}

const commonStyle = StyleSheet.create({
    collapsibleHeader: {
        paddingTop: Platform.OS === 'ios' ? 40 : 0,
        height: Platform.OS === 'ios' ? 90 : 55,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor: 'white',
        borderBottomWidth: .2,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    transparentHeader: {
        paddingTop: Platform.OS === 'ios' ? 40 : 15,
        borderBottomWidth: .3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    navColumn: {
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,

    },
    transparentHeaderTitle: {
        margin: 10,
        fontSize: 15,
        alignSelf: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1.2
    },
    overlayHeader: {
        position: 'absolute',
        top: -45,
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    readMoreText: {
        color: '#000',
        marginTop: 5,
        textDecorationLine: 'underline'
    },
    rowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 20,
        paddingVertical: 25
    }
})
