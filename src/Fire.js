import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import Notifications from './Notifications';
import Axios from 'axios';
import qs from 'qs';
import Helpers from './Helpers';

class Fire {
    state = {
        conversationID: null
    }

    constructor() {
        this.init();
        // this.checkAuth();
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyAFnNVx0pAVWEyh9sTukBRrNJbqICPqJJY",
                authDomain: "earthling-7b751.firebaseapp.com",
                databaseURL: "https://earthling-7b751.firebaseio.com",
                projectId: "earthling-7b751",
                storageBucket: "earthling-7b751.appspot.com",
                messagingSenderId: "54160685722",
                appId: "1:54160685722:web:b7827c0228e6625620bd23",
                measurementId: "G-4Z0FPSDD35"
            })
        }
    }

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        })
    }

    send = (message, updateConvo) => {
        Axios.post(
            Helpers.traveller_api + 'updateconvo',
            qs.stringify({ conversation_id: this.state.conversationID, content: message.text })
        ).then(response => {
            updateConvo();
        }).catch(error => {
            console.log(error);
        })

        this.db
            .doc(this.state.conversationID)
            .collection('chats')
            .add(message)

        Notifications.triggerNotif(message);
    }

    parse = (message) => {
        const { user, text, timestamp, _id } = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        }
    }

    get = (callback, docID) => {
        const self = this;

        this.state.conversationID = docID;

        this.db.doc(docID).collection('chats').orderBy("_id", "asc")
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach((change, index) => {
                    if (change.type == 'added') {
                        callback(self.parse(change.doc.data(), index))
                    }
                });
            });
    }

    off = () => {
        // this.db.off();
    }

    get db() {
        return firebase.firestore().collection('conversation')
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }
}

export default new Fire();
