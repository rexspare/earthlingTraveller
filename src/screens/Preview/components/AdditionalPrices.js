import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CollapsibleHeader, RowInfo } from '../../../components/Common';
import Styles from '../../../assets/Styles';

class AdditionalPrices extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[{ flex: 1 }]}>
                <CollapsibleHeader>
                    <View style={[Styles.container, { paddingVertical: 20 }]}>
                        <Text style={[Styles.fontGilroyBold, { fontSize: 35 }]}>Utility Fees</Text>
                        <RowInfo
                            leftContent="Cleaning Fee"
                            leftSubContent={'$' + this.props.prices.cleaning_fee}
                        />
                        <RowInfo
                            leftContent="Service Fee"
                            leftSubContent={'$' + this.props.prices.service_fee}
                            noBorderBottom={true}
                        />
                    </View>
                </CollapsibleHeader>
            </View>
        );
    }
}

export default AdditionalPrices;
