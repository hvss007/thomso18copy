import firebase from 'firebase/app';
import 'firebase/messaging';
import FetchApi from './FetchAPI';

const config = {
    messagingSenderId: "276509845371"
};

const publicVapidKey = 'BDnyI9swBVVfXCK_V1bN4y2KEWpfFvkAlAiLv9l4sNQ3VgVn_t63nhSPzza7IQaAFqGlOwUmhFLeBhliWujzVhg';
firebase.initializeApp(config);

export const checkInArray = topic => {
    let array = localStorage.getItem('notifications')
    if (array) {
        array = array.split(',')
        if (array.length > 0 && array.indexOf(topic) === -1) {
            return {inArray: false, isArray: true, array}
        } else {
            return {inArray: true}
        }
    } else {
        return {inArray: false, isArray: false}
    }
}

export const addTopic = (topic) => {
    const token = localStorage.getItem('notificationToken');
    if (topic && token) {
        const check = checkInArray(topic)
        if ( check && check.inArray === false) {
            FetchApi('POST','/api/notification', {
                topic: topic,
                token: token
            })
                .then(result => {
                    if (check.isArray && check.array.length > 0) {
                        const notifArray = check.array.push(topic)
                        localStorage.setItem('notifications', notifArray)
                    } else {
                        localStorage.setItem('notifications', [topic])
                    }
                    console.log(`Subscribed to ${topic}`)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    } else {
        console.log('Invalid Token/Topic')
    };
};

export const addCATopic = (topic) => {
    const token = localStorage.getItem('notificationToken');
    const auth_token = localStorage.getItem('temp_ca_auth_token')
    if (topic && token) {
        const check = checkInArray(topic)
        if ( check.inArray === false) {
            FetchApi('POST','/api/notification/ca', {
                topic: topic,
                token: token
            }, auth_token)
                .then(result => {
                    if (check.isArray && check.array.length > 0) {
                        let notifArray = check.array
                        notifArray.push(topic)
                        localStorage.setItem('notifications', notifArray)
                    } else {
                        localStorage.setItem('notifications', [topic])
                    }
                    console.log(`Subscribed to ${topic}`)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    } else {
        console.log('Invalid Token/Topic')
    };
};

export const firebaseInit = () => {

    const messaging = firebase.messaging();

    messaging.usePublicVapidKey(publicVapidKey);    

    messaging.onMessage(function(payload) {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon,        
        };

        if (!("Notification" in window)) {
            console.log("This browser does not support system notifications");
        }
        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            const notification = new Notification(notificationTitle,notificationOptions);
            notification.onclick = function(event) {
                event.preventDefault(); // prevent the browser from focusing the Notification's tab
                console.log(window.location.href, payload.notification.click_action)
                if (window.location.href !== payload.notification.click_action){
                    window.location.href = payload.notification.click_action;                    
                }
                notification.close();
            }
        }
    });

    messaging.onTokenRefresh(function() {
        messaging.getToken().then(function(refreshedToken) {
            // Indicate that the new Instance ID token has not yet been sent to the
            // app server.
            // setTokenSentToServer(false);
            localStorage.setItem("notificationToken", refreshedToken);
            const notifArray = localStorage.getItem('notifications');
            if (notifArray && notifArray.length > 0) {
                for(var i = 0; i < notifArray.length; i++) {
                    addTopic(notifArray[i]);
                }
            }
            // Send Instance ID token to app server.
            // sendTokenToServer(refreshedToken);
            // ...
        }).catch(function(err) {
            console.log('Unable to retrieve refreshed token. Unable to retrieve refreshed token', err);
        });
    });

    messaging.requestPermission()
        .then(function() {
            return messaging.getToken();
        })
        .then(function(token) {
            localStorage.setItem("notificationToken", token);
        })
        .catch(function(err) {
            console.log('Unable to get permission to notify.', err);
        });
}