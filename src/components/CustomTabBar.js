import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../assets/Styles';
import { Actions } from 'react-native-router-flux';

const deviceWidth = Dimensions.get("window").width;

export default class CustomTabBar extends React.Component {
    constructor (props){
        super(props);
    }

    _getIcon = (key) => {
        const icons = {
            inbox: "paper-plane-o",
            properties: "building-o",
            profile: "user-o",
        }

        return icons[key];
    }

    render() {
        const { state } = this.props.navigation,
            activeTabIndex = state.index,
            itemWidth = deviceWidth / state.routes.length;

        return (
            <View style={styles.container}>
                {
                    state.routes.map((element, index) => {
                        const color = activeTabIndex == index ? '#57b5aa' : 'grey';

                        return (
                            <TouchableOpacity key={element.key} onPress={() => Actions[element.routeName]()} style={[{ width: itemWidth }, styles.itemContainer]}>
                                <View style={styles.item}>
                                    <Icon name={this._getIcon(element.key)} style={{ marginBottom: 7 }} color={color} size={25} />
                                    <Text style={[Styles.fontGilroyBold, styles.itemText, {color:color}]}>{element.key.toUpperCase()}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: Platform.OS == 'ios' ? 25 : 15,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5
    },
    itemContainer: {
        width: '33%',
    },
    item: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: '100%'
    },
    itemText: {
        fontSize: 10
    }
});
