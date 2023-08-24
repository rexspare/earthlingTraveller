import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions,Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearButton } from '../../../components/Common';
import Styles from '../../../assets/Styles';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import axios from "axios";
import qs from 'qs';
import Helpers from '../../../Helpers';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
import { RatingStars, Dot, FullScreenLoader, ThemeButton, defaultColors } from '../../../components/Common';
import { showMessage } from "react-native-flash-message";
class GalleryTravller extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            feature_image:'',
            wishlist_pressed: false,
            loading:false
        }
    }
    componentDidMount = () => {
        this.getGallery();
        console.log("gal copm",this.props);
        
    }
    wishlist = () => {
     
       const wishlisted = this.state.wishlist_pressed;
      const property_id = this.props.propertyID;
      const user_id = this.props.userID;
     axios.post(Helpers.traveller_api +'wishlisted/'+ property_id +'/'+ user_id )
     .then(response => {
        if(response.data.type == 'success'){
            showMessage({
                message: "Success!",
                description: response.data.msg,
                type: "default",
                backgroundColor: "#57b5aa",
                color: "#555555",
            });
         }else{
            showMessage({
                message: "error!",
                description: response.data.msg,
                type: "default",
                backgroundColor: "#57b5aa",
                color: "#555555",
            });
         }
         
     })

       
        
    }
    getGallery = () => {
        this.setState({loading: true}); 

        const property_id = this.props.property_id; 
        axios.post(Helpers.traveller_api +'getGallery/'+ property_id)
        .then(response => {
            this.setState({feature_image:response.data}) 
            
        })
    }
   
    setSelectedIndex = event => {
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
        const selectedIndex = Math.floor(contentOffset / viewSize);

        this.setState({ selectedIndex })
    }
    render() {
        console.log('gall',this.props);
        
        return this.state.loading ? (
            <View>
                {/* <FullScreenLoader theme="light" /> */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onMomentumScrollEnd={this.setSelectedIndex}
                    ref={this.scrollRef}
                >
                    
                                <View style={[{ justifyContent: 'center', }, styles.backgroundImage]}>
                                   <Image
                                    style={{width: '100%', height: '100%'}}
                                    
                                     source={{ uri: Helpers.image_url + this.state.feature_image.filename }}
                                    />
                                <Icon name='heart' size={30}  style={styles.close} onPress={() => this.wishlist(this.setState({wishlist_pressed:true}))}/>
                                </View>
                           

                  
                </ScrollView>
                
            </View>
           
        ) : (
             <>
                <Text>no data</Text>
             </>
        )
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
)(GalleryTravller);


const styles = StyleSheet.create({
    backgroundImage: {
        height: deviceHeight / 1.8,
        width: deviceWidth,
        backgroundColor: '#131313'
    },
    close: {
        
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 30,
        right:20,
        color:'#1bcbbb'
       
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
    }
});