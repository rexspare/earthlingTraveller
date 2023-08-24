import Axios from "axios";
import { AppConfig } from "./Helpers";

// Google Server Key
class Notifications {
    triggerNotif = (props) => {
        Axios({
            method: 'POST',
            url: 'https://fcm.googleapis.com/fcm/send',
            data: {
                "to": props.notifyFcm,
                "notification": {
                    "title": "Earthling - Handler",
                    "body": "You have a new message!",
                    "sound": "default"
                },
                "data": {
                    "notification": "You have a new message!",
                    "link": props.link ? props.link : null
                },
            },
            headers: {
                'Authorization': "key=" + AppConfig.GOOGLEAPI,
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            console.log(response);
        });

        return true
    }

    // Data Needed:
    // - notifyFcm 
    // - content
    // - link (Optional)
    sendNotification = (props) => {
        Axios({
            method: 'POST',
            url: 'https://fcm.googleapis.com/fcm/send',
            data: {
                "to": props.notifyFcm,
                "notification": {
                    "title": "Earthling - Handler",
                    "body": props.content,
                    "sound": "default"
                },
                "data": {
                    "notification": props.content,
                    "link": props.link ? props.link : null
                },
            },
            headers: {
                'Authorization': "key=" + AppConfig.GOOGLEAPI,
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            console.log(response);
        });

        return true
    }
}

export default new Notifications();
