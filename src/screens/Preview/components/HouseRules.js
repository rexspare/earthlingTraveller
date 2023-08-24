import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CollapsibleHeader, RowInfo } from '../../../components/Common';
import Styles from '../../../assets/Styles';
import { Divider, ListItem } from 'react-native-elements';

const rulesCondition = [
    { id: 'children', true: 'Suitable for Children', false: 'Not Suitable for Children' },
    { id: 'infants', true: 'Suitable for Infants', false: 'Not Suitable for Infants' },
    { id: 'pets', true: 'Suitable for Pets', false: 'Not Suitable for Pets' },
    { id: 'smoking', true: 'Smoking allowed', false: 'No Smoking' },
    { id: 'events', true: 'Events or Parties', false: 'No Events or Parties' },
];

const detailsCondition = [
    { id: 'noise', info: 'Potential for Noise' },
    { id: 'pets', info: 'Pets live in property' },
    { id: 'spaces', info: 'Some spaces are shared' },
    { id: 'surveillance', info: 'Surveillance or recording devices on property' },
];

class HouseRules extends Component {
    constructor(props) {
        super(props);
    }

    _renderRules = (data) => {
        const rules = JSON.parse(data);

        let displayRules = [];

        for (let [key, value] of Object.entries(rules)) {
            const display = rulesCondition.find(({ id }) => id == key);
            displayRules.push(display[value]);
        }


        return (
            <View style={{ flex: 1 }}>
                <Text style={[styles.sectionHeader, Styles.fontGilroyBold]}>General Rules</Text>
                {
                    displayRules.map((rule, index) => <RowInfo key={index} leftContent={rule} />)
                }

                <Divider style={{ marginVertical: 20, backgroundColor: 'transparent' }} />
            </View>
        )
    }

    _renderMoreDetails = (data) => {
        const moreDetails = JSON.parse(data);

        let displayDetails = [];

        for (let [key, value] of Object.entries(moreDetails)) {
            if (value == 'true') {
                const display = detailsCondition.find(({ id }) => id == key);
                displayDetails.push(display.info);
            }
        }

        return (
            <View style={{ flex: 1 }}>
                {
                    displayDetails.length ? (
                        <View>
                            <Text style={[styles.sectionHeader, Styles.fontGilroyBold]}>More Details</Text>
                            {
                                displayDetails.map((detail, index) => <RowInfo key={index} leftContent={detail} />)
                            }

                            <Divider style={{ marginVertical: 20, backgroundColor: 'transparent' }} />
                        </View>
                    ) : null
                }
            </View>
        )
    }

    _renderAdditional = (data) => {
        return (
            <View style={{ flex: 1 }}>
                {
                    data != '' ? (
                        <View>
                            <Text style={[styles.sectionHeader, Styles.fontGilroyBold, {marginBottom:20}]}>You must also acknowledge:</Text>
                            <Text style={[Styles.fontGilroyLight, {fontSize:18}]}>{data}</Text>
                        </View>
                    ) : null
                }
            </View>
        )
    }

    render() {
        const { rules } = this.props;

        return (
            <View style={[{ flex: 1 }]}>
                <CollapsibleHeader>
                    <View style={[Styles.container, { paddingVertical: 20 }]}>
                        <Text style={[Styles.fontGilroyBold, { fontSize: 35 }]}>House Rules</Text>
                        <Text style={[Styles.fontGilroyLight, { fontSize: 18, marginTop: 5, color: '#333' }]}>Here are some rules and guidelines you should know.</Text>

                        <Divider style={{ marginVertical: 20, backgroundColor: 'transparent' }} />

                        {this._renderRules(rules.rules)}

                        {this._renderMoreDetails(rules.more_details)}

                        {this._renderAdditional(rules.additional_rules)}
                    </View>
                </CollapsibleHeader>
            </View>
        );
    }
}

export default HouseRules;

const styles = StyleSheet.create({
    sectionHeader: {
        fontSize: 20,
        color: '#222',
        marginBottom: 5
    }
});