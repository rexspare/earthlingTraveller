import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Styles from '../../../assets/Styles';
import { CollapsibleHeader } from '../../../components/Common';

class AmenitiesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newAmenities: ""
		}
	}

	_renderAllAmenities = (amenities) => {
		const arrAmenities = Object.entries(amenities);

		return arrAmenities.map((amenity) => {

			return (
				<View key={amenity}>
					<Text style={styles.headerText}>{amenity[0].replace('_', ' ')}</Text>
					{
						amenity[1].map((info, index) => (
							<Text key={index} style={[Styles.fontGilroyLight, styles.amenity]}>{info}</Text>
						))
					}
				</View>
			)
		})
	}


	render() {
		const { allAmenities } = this.props;

		return (
			<View style={{ flex: 1 }}>
				<CollapsibleHeader>
					<View style={[Styles.container, { paddingVertical: 20 }]}>
						<Text style={[Styles.fontGilroyBold, { fontSize: 35, marginLeft: -8 }]}> Amenities </Text>
						{this._renderAllAmenities(allAmenities)}
					</View>
				</CollapsibleHeader>
			</View>
		);
	}
}

export default AmenitiesList;

const styles = StyleSheet.create({
	headerText: {
		textTransform: 'capitalize',
		fontFamily: "Gilroy-ExtraBold",
		fontSize: 25,
		marginTop: 30
	},
	amenity: {
		fontSize: 20,
		marginVertical: 20,
		paddingBottom: 20,
		borderBottomWidth: 1,
		borderColor: '#ebebeb'
	}
});
