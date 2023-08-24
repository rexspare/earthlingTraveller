import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text
} from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import qs from 'qs';
import { ThemeButton, FullScreenLoader } from '../../../components/Common';
import { Actions } from 'react-native-router-flux';
import { AppConfig } from '../../../Helpers';
import { showMessage } from 'react-native-flash-message';

class Paypal extends Component {
    state = {
        accessToken: null,
        approvalUrl: null,
        paymentId: null,
        isWebViewLoading: false,
        shouldShowWebViewLoading: true
    }

    componentDidMount = () => {
        this.initPaypal();
    }

    initPaypal = () => {
        const self = this;

        const dataDetail = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": this.props.amount,
                    "currency": "USD",
                    "details": {
                        "subtotal": this.props.amount,
                        "tax": "0",
                        "shipping": "0",
                        "handling_fee": "0",
                        "shipping_discount": "0",
                        "insurance": "0"
                    }
                },
                "description": this.props.description,
                "payment_options":
                {
                    "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                },
            }],
            "redirect_urls": {
                "return_url": "https://example.com?params=return",
                "cancel_url": "https://example.com?params=cancel"
            }
        }

        const url = `https://api.sandbox.paypal.com/v1/oauth2/token`;

        const data = {
            grant_type: 'client_credentials'
        };

        const auth = {
            username: AppConfig.CLIENTID,  //"your_paypal-app-client-ID",
            password: AppConfig.SECRET  //"your-paypal-app-secret-ID
        };

        const options = {
            method: 'post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Credentials': true
            },
            //Make sure you use the qs.stringify for data
            data: qs.stringify(data),
            auth: auth,
            url,
        };

        // Authorise with seller app information (clientId and secret key) HEHE
        axios(options)
            .then(response => {
                self.setState({
                    accessToken: response.data.access_token
                })


                //Resquest payal payment (It will load login page payment detail on the way)  HHEHEHEHHEHE
                axios.post('https://api.sandbox.paypal.com/v1/payments/payment', dataDetail,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${response.data.access_token}`
                        }
                    }
                )
                    .then(response => {
                        const { id, links } = response.data
                        const approvalUrl = links.find(data => data.rel == "approval_url").href

                        self.setState({
                            paymentId: id,
                            approvalUrl: approvalUrl
                        })
                    }).catch(err => {
                        console.log({ ...err })
                    })
            }).catch(err => {
                console.warn('ERROR', err);

                showMessage({
                    message: "Oops!",
                    description: 'Something went wrong. Try again later.',
                    type: "default",
                    backgroundColor: "white",
                    color: "#555555",
                });
                Actions.popTo('bookinfo');
            })

    }


    _onNavigationStateChange = (webViewState) => {
        const self = this;

        if (webViewState.title == "") {
            //When the webview get here Don't need our loading anymore because there is one from paypal  HAHAHA
            self.setState({ shouldShowWebViewLoading: false });
        }

        if (webViewState.url.includes('params=return')) {
            self.setState({
                approvalUrl: null
            })

            const urlArr = webViewState.url.split(/(=|&)/);
            const paymentId = urlArr[6];
            const payerId = urlArr[14];

            axios.post(
                `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
                { payer_id: payerId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${self.state.accessToken}`
                    }
                }
            ).then(response => {
                this.props.onSuccess();
                self.setState({ shouldShowWebViewLoading: false });
                Actions.popTo('bookinfo');
            }).catch(err => {
                console.warn('ERROR', err);

                showMessage({
                    message: "Oops!",
                    description: 'Something went wrong. Try again later.',
                    type: "default",
                    backgroundColor: "white",
                    color: "#555555",
                });
                Actions.popTo('bookinfo');
            });
        } else if (webViewState.url.includes('params=cancel')) {
            Actions.popTo('bookinfo');
        }
    }

    onWebviewLoadStart = () => {
        if (this.state.shouldShowWebViewLoading) {
            this.setState({ isWebViewLoading: true });
        }
    }


    render() {
        const { approvalUrl } = this.state

        return (
            <View style={{ flex: 1 }}>
                {
                    approvalUrl ? (
                        <View style={styles.webview}>
                            <WebView
                                style={{ height: "100%", width: "100%" }}
                                source={{ uri: approvalUrl }}
                                onNavigationStateChange={this._onNavigationStateChange}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                startInLoadingState={false}
                                onLoadStart={this.onWebviewLoadStart}
                                onLoadEnd={(a, b, c) => {
                                    this.setState({ isWebViewLoading: false });
                                }}
                            />
                        </View>
                    ) : <FullScreenLoader theme="light" />}

            </View>
        )
    }
}

export default Paypal;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    webview: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    btn: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#61E786',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
});