import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Button, Modal,Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Input, Text, ListItem } from 'react-native-elements';
import Style   from '../../assets/Styles';
import { CustomNav1 } from '../../components/CustomNav1';
import Slider  from 'react-native-simple-slider';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
class Sortby extends Component{
    state = { value: 150 ,
    location:10 }
    ratingCompleted(rating) {
    console.log(rating)
    }
    render(){

        return(
    <View style={[Style.container]}>

    <View style={{borderBottomWidth:1, borderBottomColor: '#d1dadb',paddingVertical:30}}><Text style={[Style.fontGilroyLight,Style.smallText,{paddingVertical:10}]}>PRICE PER NIGHT</Text>
    <Slider

        minimumValue={150}
        maximumValue={1000}
        step={100}
        minimumTrackTintColor={'#ffa500'}
        thumbTintColor={'gray'}
        value={this.state.value}
        onValueChange={value => this.setState({ value })}
        disabledHoverEffect={false}
        />
    </View>
    <View style={{borderBottomWidth:1, borderBottomColor: '#d1dadb',paddingVertical:30}}><Text style={[Style.fontGilroyLight,Style.smallText,{paddingVertical:10}]}>NUMBER OF STARS</Text>
        <Rating
        showRating
        onFinishRating={this.ratingCompleted}
        style={{ paddingVertical: 10 }}
        showRating={false}
        />
    </View>
    <View style={{borderBottomWidth:1, borderBottomColor: '#d1dadb',paddingVertical:30}}><Text style={[Style.fontGilroyLight,Style.smallText,{paddingVertical:10}]}>DISTANCE TO YOUR LOCATION</Text>
    <Slider
        minimumValue={150}
        maximumValue={1000}
        step={100}
        minimumTrackTintColor={'#ffa500'}
        thumbTintColor={'gray'}
        value={this.state.value}
        onValueChange={value => this.setState({ value })}
        disabledHoverEffect={false}
        />
    </View>
    <View style={{borderBottomWidth:1, borderBottomColor: '#d1dadb',paddingVertical:30,}}><Text style={[Style.fontGilroyLight,Style.smallText,{paddingVertical:10}]}>FEATURES/AMENITIES</Text>

        <View style={{flexDirection:'row',justifyContent:'space-around',paddingVertical:20}}>
            <Text styl={[Style.smallText,Style.fontGilroyLight,{}]}>Free Wifi</Text>
            <Text styl={[Style.smallText,Style.fontGilroyLight]}>Pool</Text>
            <Text styl={[Style.smallText,Style.fontGilroyLight]}>SPA</Text>
            <Text styl={[Style.smallText,Style.fontGilroyLight]}>Breakfast</Text>
        </View>
    </View>
    <View style={{paddingVertical:30}}>
        <ListItem titleStyle={[Style.fontGilroyLight,Style.smallText,{paddingVertical:10}]} title="TYPE OF ACCOMODATION" rightIcon={ <Icon name="chevron-right"/> } onPress={Actions.accommodations}/>
    </View>

            </View>
        )
    }
}
export default Sortby;
