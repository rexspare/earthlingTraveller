import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Button, Modal,Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ListItem } from 'react-native-elements';
import Style   from '../../assets/Styles';
import { CustomNav1 } from '../../components/CustomNav1';;
import Styles from '../../assets/Styles';
import { LinearButton, LinearButtons, TransparentHeaderLogo } from '../../components/Common';
import { connect } from 'react-redux';
class Accommodations extends Component{
    constructor(props) {
        super(props);
        this.state = {
            all: false,
            hotel: false,
            restaurant: false,
            condo: false,
            apartment: false,
            resort: false,
            select:[ ]
        };
    }
   _prevScreen = () => {
  
   
    
    
     //const objAccVal = Object.entries(this.state);
     
     const all  =  this.state.all;
     const hotel  =  this.state.hotel;
     const restaurant  =  this.state.restaurant;
     const condo  =  this.state.condo;
     const apartment  =  this.state.apartment;
     const resort  =  this.state.resort;
    const  datas = {
        all,hotel,restaurant,condo,apartment,resort
    };
    const data= Object.entries(datas);
    data.map((val,index)=>{
      
       if(val[1] === 1){
           
            this.state.select.push(val[0]);
       }
       
        
    })
    this.props.updateState({ target: 'accommodationtype', value: this.state.select } ); 

    console.log(this.props);
    // this.setState({
    //     accommodations: [data]
    //   });
    
      
     
      
     
    //   this.props.updateState( { target: 'hotel', value: hotel }  );  
    //   this.props.updateState(  { target: 'restaurant', value: restaurant } );  
    //   this.props.updateState( { target: 'condo', value: condo } );  
    //   this.props.updateState(    { target: 'apartment', value: apartment }  );  
    //   this.props.updateState(  { target: 'resort', value: resort } );   
    Actions.pop();
    // objAccVal.map((values)=>{
      
    //    const datas = {
    //     ...values
    //    }
    //    console.log(values[1]);
       
    //    this.setState({
    //        data:datas
    //         });
       
   
    //         // this.props.updateState({ target: 'all', value: values },
    //         //     { target: 'hotel', value: values }  ,
    //         //     { target: 'restaurant', value: values }  ,
    //         //     { target: 'condo', value: values }  ,
    //         //     { target: 'apartment', value: values }  ,
    //         //     { target: 'resort', value: values }  
    //         // );   
       
    //         // console.log(this.props);
        
    // })
 
    // Actions.pop();
    
    
   
   }
    render(){
      
    
        return(
            <View style={[Style.container,{flex: 1}]}>
                <View style={{borderBottomWidth:1, borderBottomColor: '#d1dadb',paddingVertical:10}}>
                

                    <ListItem titleStyle={[Style.fontGilroyLight,Style.smallText,{paddingVertical:10}]} title="ALL" rightIcon={
                         <Switch
                         style={{ alignSelf: 'flex-start' }}
                         onValueChange={() => this.setState({ all: this.state.all == 1 ? 0 : 1 ,
                            hotel: this.state.hotel == 1 ? 0 : 1,
                            restaurant:this.state.restaurant == 1 ? 0 : 1,
                            condo:this.state.condo == 1 ? 0 : 1,
                            apartment:this.state.apartment == 1 ? 0 : 1,
                            resort:this.state.resort == 1 ? 0 : 1


                        })}
                         value={this.state.all == 1 ? true : false
                            

                        }
                         trackColor={{ true: '#57b5aa', false: '#ccc' }}
                         thumbColor={'#fff'}
                     />

                    }/>
                    
                    
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor: '#d1dadb',paddingVertical:10}}>
                <ListItem titleStyle={[Style.fontGilroyLight,Style.smallText,{paddingVertical:10}]} title="Hotel" rightIcon={
                         <Switch
                         style={{ alignSelf: 'flex-start' }}
                         onValueChange={() => this.setState({ hotel: this.state.hotel == 1 ? 0 : 1 })}
                         value={this.state.hotel == 1 ? true : false}
                         trackColor={{ true: '#57b5aa', false: '#ccc' }}
                         thumbColor={'#fff'}
                     />

                    }/>
                
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor: '#d1dadb',paddingVertical:10}}>
                <ListItem titleStyle={[Style.fontGilroyLight,Style.smallText,{paddingVertical:10}]} title="Restaurant" rightIcon={
                         <Switch
                         style={{ alignSelf: 'flex-start' }}
                         onValueChange={() => this.setState({ restaurant: this.state.restaurant == 1 ? 0 : 1 })}
                         value={this.state.restaurant == 1 ? true : false}
                         trackColor={{ true: '#57b5aa', false: '#ccc' }}
                         thumbColor={'#fff'}
                     />

                    }/>
                
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor: '#d1dadb',paddingVertical:10}}>
                <ListItem titleStyle={[Style.fontGilroyLight,Style.smallText,{paddingVertical:10}]} title="Condo" rightIcon={
                         <Switch
                         style={{ alignSelf: 'flex-start' }}
                         onValueChange={() => this.setState({ condo: this.state.condo == 1 ? 0 : 1 })}
                         value={this.state.condo == 1 ? true : false}
                         trackColor={{ true: '#57b5aa', false: '#ccc' }}
                         thumbColor={'#fff'}
                     />

                    }/>
                
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor: '#d1dadb',paddingVertical:10}}>
                <ListItem titleStyle={[Style.fontGilroyLight,Style.smallText,{paddingVertical:10}]} title="Apartment" rightIcon={
                         <Switch
                         style={{ alignSelf: 'flex-start' }}
                         onValueChange={() => this.setState({ apartment: this.state.apartment == 1 ? 0 : 1 })}
                         value={this.state.apartment == 1 ? true : false}
                         trackColor={{ true: '#57b5aa', false: '#ccc' }}
                         thumbColor={'#fff'}
                     />

                    }/>
                
                </View>
                <View style={{paddingVertical:10}}>
                <ListItem titleStyle={[Style.fontGilroyLight,Style.smallText,{paddingVertical:10}]} title="Resort" rightIcon={
                         <Switch
                         style={{ alignSelf: 'flex-start' }}
                         onValueChange={() => this.setState({ resort: this.state.resort == 1 ? 0 : 1 })}
                         value={this.state.resort == 1 ? true : false}
                         trackColor={{ true: '#57b5aa', false: '#ccc' }}
                         thumbColor={'#fff'}
                     />

                    }/>
                
                </View>
                <View style={{ padding: 10 }}>
                          <LinearButton
                                title="Submit"
                                onPress={() => this._prevScreen()}
                                style={[Styles.buttonText, Styles.fontGilroyBold]}
                           />
                 </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
  
    
    return {
        userID: state.userID,
       accommodationtype:state.accommodationtype
       
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
)(Accommodations);
