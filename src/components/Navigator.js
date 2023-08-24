import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Button, Modal, Image } from 'react-native';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { defaultColors } from './Common';
import Styles from '../assets/Styles';

class Navigator extends Component {
    constructor(props) {
        super(props);
    }

    tabs = [
        {
            key: 'searches',
            icon: 'search',
            label: 'Search',
        },
        {
            key: 'wishlist',
            icon: 'heart',
            label: 'Wishlist',
        },
        {
            key: 'messages',
            icon: 'comments',
            label: 'Messages',
        },
        {
            key: 'bookings',
            icon: 'plane',
            label: 'Bookings',
        },
    ]

    state = {
        activeTab: 'searches'
    }

    renderIcon = icon => ({ isActive }) => {

        return (
            <Icon size={24} color="black" name={icon} />
        )
    }

    renderTab = ({ tab, isActive }) => {
        return (
            <FullTab
                barColor="transparent"
                backgroundColor="transparent"
                key={tab.key}
                label={tab.label}
                labelStyle={[{ color: '#555' }, Styles.fontGilroyLight]}
                renderIcon={this.renderIcon(tab.icon)}
            />
        )
    }

    navigate(parameters) {
        let screen = parameters.key;
        Actions[screen]({ type: 'replace' });
    }

    render() {
        return (
            <BottomNavigation
                style={{ paddingVertical: 1 }}
                onTabPress={newTab => this.navigate(newTab)}
                renderTab={this.renderTab}
                tabs={this.tabs}
            />
        )
    }
}

export default Navigator;
