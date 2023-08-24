import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions,Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearButton } from '../../../components/Common';
import Styles from '../../../assets/Styles';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
        }
    }


    setSelectedIndex = event => {
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
        const selectedIndex = Math.floor(contentOffset / viewSize);

        this.setState({ selectedIndex })
    }


    render() {
        const { images } = this.props;

        const { selectedIndex } = this.state;

        return (
            <Animatable.View animation="fadeIn" duration={1500}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onMomentumScrollEnd={this.setSelectedIndex}
                    ref={this.scrollRef}
                >
                    {
                        images.length > 0 ?
                            images.map(image => (
                                <Image
                                    key={image}
                                    source={{ uri: image }}
                                    style={styles.backgroundImage}
                                />
                            ))
                            : (
                                <View style={[{ justifyContent: 'center', }, styles.backgroundImage]}>
                                    <LinearButton
                                        title="Upload Image"
                                        containerStyle={{ width: 200, alignSelf: 'center', justifyContent: 'center', }}
                                        style={[Styles.fontGilroyBold, { color: '#fff', fontSize: 15 }]}
                                        onPress={this.props.onUploadButtonPress}
                                    />
                                </View>
                            )

                    }
                </ScrollView>
                <View style={styles.circleDiv}>
                    {images.map((image, i) => (
                        <View
                            key={image}
                            style={[styles.whiteCircle, { opacity: i === selectedIndex ? 1 : 0.5 }]}
                        />
                    ))}
                </View>
            </Animatable.View>
        );
    }
}

export default Gallery;

const styles = StyleSheet.create({
    backgroundImage: {
        height: deviceHeight / 1.8,
        width: deviceWidth,
    },
    circleDiv: {
        position: "absolute",
        top: (deviceHeight / 1.8) - 30,
        height: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    whiteCircle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        backgroundColor: '#fff',
    },
    wishlistBtn: {
        position: 'absolute',
        top: 25,
        right: 25,
    }
});
