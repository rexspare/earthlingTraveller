import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Styles from '../assets/Styles';

export default class CustomNav1 extends React.Component {

	constructor(props) {
		super(props);
	}

	rightIconAction = () => {
	}

	_renderLeft = () => {
		const { contentColor, lightTheme } = this.props;

		let textColor = contentColor ? contentColor : 'white';

		if (lightTheme) {
			textColor = 'black';
		}


		if (this.props.leftIconAction) {
			return (
				<TouchableOpacity onPress={this.props.leftIconAction} style={[styles.navBarItem, { width: 20, height:20, alignItems: 'center', marginLeft: 20, marginRight: -20 }]}>
					<Text style={[Styles.fontGilroyBold, { color: 'white', fontSize: 18 }]}>X</Text>
				</TouchableOpacity>
			);
		}
		else {
			return (
				<TouchableOpacity onPress={Actions.pop} style={[styles.navBarItem, { marginLeft: 20, marginRight: -20 }]}>
					{
						this.props.leftIcon !== false ? (
							<Icon name="angle-left" color={textColor} size={25} ></Icon>
						) : null
					}
				</TouchableOpacity>
			);
		}
	}

	_renderMiddle = () => {
		const { contentColor, lightTheme } = this.props;

		let textColor = contentColor ? contentColor : 'white';

		if (lightTheme) {
			textColor = 'black';
		}

		return (
			<View style={styles.navBarItem}>
				<Text style={[styles.middleText, { color: textColor }]}>{this.props.title}</Text>
			</View>
		);
	}

	_renderRight = () => {
		const { rightIcon, rightIconAction, contentColor, rightContent } = this.props;


		return (
			<View style={[styles.navBarItem, { flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20, marginLeft: -20 }]}>
				{
					rightIcon ? (
						<TouchableOpacity onPress={rightIconAction}>
							<Icon name={rightIcon} color={contentColor ? contentColor : 'white'} size={25} ></Icon>
						</TouchableOpacity>
					) : null
				}
			</View>
		)
	}

	render() {
		const { lightTheme } = this.props;

		return (
			<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={lightTheme ? ["#fff", "#fff", "#fff"] : ['#57b5aa', '#12c7b3', '#05ffe3']} style={[styles.linearGradientContainer]}>
				<View style={styles.container}>
					{this._renderLeft()}
					{this._renderMiddle()}
					{this._renderRight()}
				</View>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: Platform.OS === 'ios' ? 30 : 0,
		height: Platform.OS === 'ios' ? 64 : 54,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	navBarItem: {
		justifyContent: 'center',
		alignSelf: 'center',
	},
	middleText: {
		color: 'white',
		alignSelf: 'center',
		alignItems: 'center',
		fontFamily: 'Gilroy-ExtraBold',
		fontSize: 15,
		overflow: 'hidden',
		textTransform: 'uppercase'
	},
	linearGradientContainer: {
		textAlign: 'center',
		borderBottomWidth: .2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2
	}
});
