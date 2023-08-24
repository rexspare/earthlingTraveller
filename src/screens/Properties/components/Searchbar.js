import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../../../../assets/Styles';
import { Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export const SearchBar = (props) => {
    return (
        <View style={styles.container}>
            <Icon name="search" color="orange" size={19} style={{marginLeft:20}}/>
            <Input
                placeholder='Search property...'
                inputStyle={[Styles.fontGilroyLight, styles.input]}
                inputContainerStyle={styles.inputContainer}
                {...props}
            />
            <View style={{width:1, height:'70%', backgroundColor:'#eee',marginRight:15}}></View>
            <TouchableOpacity onPress={() => props.addButtonAction()} style={{marginRight:20}}>
                <Icon name="plus" color="orange" size={19} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
        borderBottomColor: '#bbb',
        shadowColor: '#bbb',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 40,
        zIndex: 1
    },
    inputContainer: {
        borderBottomColor: 'white',
    },
    input: {
        fontSize: 15,
    },
});