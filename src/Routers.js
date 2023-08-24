import React from 'react';
import { View, Text, StyleSheet, YellowBox } from 'react-native';

import { Router, Scene, Overlay, Modal, Lightbox, Tabs, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import CustomNav1 from './components/CustomNav1'
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import Landing from './screens/Landing/Landing';
import Login from './screens/Landing/modal/Login';
import Ambot from './screens/Landing/modal/Register1'
import Lang from './screens/Landing/modal/Register2'
import forgotpass from './screens/Landing/modal/Forgotpass'

import Search from './screens/Booking/Search';
import Filters from './screens/Booking/Filters';
import Accommodations from './screens/Booking/Accommodations';
import Sortby from './screens/Booking/Sortby';

import Messages from './screens/Booking/Tabs/Messages'
import Wishlist from './screens/Booking/Tabs/Wishlist'
import Searches from './screens/Booking/Tabs/Searches'
import Bookings from './screens/Booking/Tabs/Bookings'

import Preview from './screens/Preview/Preview';
import CheckAvailability from './screens/Preview/CheckAvailability';
import Profile from './screens/Profile/Profile';
import Feedback from './screens/BookingInfo/components/Feedback';
import MapInput from './screens/Booking/MapInput';
import Geolocation from './screens/Booking/Geolocation';

import Filterbysearch from './screens/Booking/Compoenent/Filterbysearch';
import SearchDisplay from './screens/Booking/Compoenent/SearchDisplay'


import ViewMessage from './screens/Booking/Tabs/ViewMessage';
import BookInfo from './screens/BookingInfo/BookInfo';
import ViewPricing from './screens/BookingInfo/components/ViewPricing';
import SubmitReview from './screens/BookingInfo/SubmitReview';
import EditProfile from './screens/Profile/EditProfile';
import ViewProfile from './screens/Profile/ViewProfile';
import AdditionalPrices from './screens/Preview/components/AdditionalPrices';
import HouseRules from './screens/Preview/components/HouseRules';
import PreviewMap from './screens/Preview/components/PreviewMap';
import AmenitiesList from './screens/Preview/components/AmenitiesList';
import PropertyReviews from './screens/Preview/components/PropertyReviews';
import Forgotpass from './screens/Landing/modal/Forgotpass';
import Reserve from './screens/Preview/Reserve';
import Paypal from './screens/BookingInfo/components/PayPal';
import TermsOfService from './screens/Profile/TermsOfService';


const stateHandler = (prevState, newState, action) => {
	// console.log('action:', action);
	// console.log('onStateChange: ACTION:', newState);
	// console.log('onStateChange: ACTION:', prevState);
};

const transitionConfig = () => ({
	screenInterpolator: (props) => {
		const { scene } = props;

		if (scene.route.routeName == 'tabs') {
			return StackViewStyleInterpolator.forNoAnimation
		} else if (
			scene.route.routeName == 'profile' ||
			scene.route.routeName == 'editprofile' ||
			scene.route.routeName == 'viewprofile' ||
			scene.route.routeName == 'reserve' ||
			scene.route.routeName == 'termsofservice' ||
			scene.route.routeName == 'viewMessage'
		) {
			return StackViewStyleInterpolator.forHorizontal(props)
		} else {
			return StackViewStyleInterpolator.forFadeToBottomAndroid(props)
		}
	},
});

const App = (props) => {
	console.log('StackViewStyleInterpolator', StackViewStyleInterpolator);

	return (
		<Router onStateChange={stateHandler} sceneStyle={styles.scene} >
			<Modal key="modal" hideNavBar  >
				<Scene key="root" titleStyle={{ alignSelf: 'center' }} headerLayoutPreset="center" transitionConfig={transitionConfig} hideNavBar>
					<Scene key="landing" component={Landing} title="" initial hideNavBar />
					<Scene key="auth">
						<Scene key="login" title="Login" component={Login} hideNavBar back initial />
					</Scene>
					<Scene key="forgotpass">
						<Scene key="forgot" title="Forgot Password" component={Forgotpass} hideNavBar back initial />
					</Scene>

					<Scene key="register">
						<Scene key="ambot" title="Register" component={Ambot} back />
						<Scene key="lang" component={Lang} hideNavBar initial back />
					</Scene>
					<Scene key="searchs" initial={props.isLoggedIn ? true : false}>
						<Scene key="search" title="Search" component={Search} hideNavBar initial />
						<Scene key="filters" title="FILTERS" component={Filters} navBar={CustomNav1} back />
						<Scene key="accommodations" title="TYPE OF ACCOMMODATIONS" component={Accommodations} navBar={CustomNav1} back />
						<Scene key="sortby" title="SORT BY" component={Sortby} navBar={CustomNav1} back />
					</Scene>

					<Scene key="profile" title="My Profile" component={Profile} hideNavBar={false} navBar={CustomNav1} back />
					<Scene key="editprofile" title="Profile" component={EditProfile} hideNavBar back />
					<Scene key="viewprofile" hideNavBar component={ViewProfile} back />
					<Scene key="termsofservice" hideNavBar component={TermsOfService} back />

					<Scene key="tabs">
						<Scene key="wishlist" title="Wishlist" component={Wishlist} navBar={CustomNav1} back />
						<Scene key="messages" title="Messages" component={Messages} navBar={CustomNav1} back />
						<Scene key="searches" title="Search History" component={Searches} navBar={CustomNav1} back initial />
						<Scene key="bookings" title="Bookings" component={Bookings} navBar={CustomNav1} back />
					</Scene>

					<Scene key="preview">
						<Scene key="previewtab" title="Details" component={Preview} hideNavBar initial back />
					</Scene>

					<Scene key="checkavailability" title="" component={CheckAvailability} hideNavBar={true} back />

					<Scene key="reserve" title="" component={Reserve} hideNavBar={false} back />

					<Scene key="showAmenities" title="Amenities" component={AmenitiesList} hideNavBar={true} back />
					<Scene key="showLocation" title="Location" component={PreviewMap} hideNavBar={true} back />
					<Scene key="showRules" title="Location" component={HouseRules} hideNavBar={true} back />
					<Scene key="showPrices" title="Additional Prices" component={AdditionalPrices} hideNavBar={true} back />
					<Scene key="showReviews" title="Reviews" component={PropertyReviews} hideNavBar={true} back />

					<Scene key="feedback">
						<Scene key="feed" title="Details" component={Feedback} hideNavBar initial back />
					</Scene>

					<Scene key="geolocation">
						<Scene key="mapiput" title="Location" component={MapInput} hideNavBar back />
						<Scene key="geoloc" title="Location" component={Geolocation} navBar={CustomNav1} initial back />
					</Scene>
				
					<Scene key="searchdisplay">
						<Scene key="displaysearch" title="SEARCH" component={SearchDisplay} navBar={CustomNav1} initial back />
					</Scene>

					<Scene key="filterbysearch">
						<Scene key="filtersearch" title="Search Results" component={Filterbysearch} navBar={CustomNav1} initial back />
					</Scene>

					<Scene key="viewMessage" title="Messages" component={ViewMessage} hideNavBar back />

					<Scene key="bookinfo" title="Booking Information" component={BookInfo} navBar={CustomNav1} hideNavBar={false} back />

					<Scene key="paypalview" title="Payment" component={Paypal} navBar={CustomNav1} hideNavBar={false} back />

					<Scene key="submitreview" title="" component={SubmitReview} navBar={CustomNav1} lightTheme={true} hideNavBar={false} back />

					<Scene key="viewpricing" title="" component={ViewPricing} navBar={CustomNav1} lightTheme={true} hideNavBar={false} back />
				</Scene>
			</Modal>
		</Router >
	);
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.isLoggedIn
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
)(App)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
	},
	scene: {
		// backgroundColor: '#F5FCFF',
		backgroundColor: '#FFF',
		shadowOpacity: 1,
		shadowRadius: 3,
	},
	tabBarStyle: {
		backgroundColor: '#eee',
	},
	tabBarSelectedItemStyle: {
		backgroundColor: '#ddd',
	}
})
