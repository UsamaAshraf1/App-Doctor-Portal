import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCqfcIjMvODb-7iVS7mgQbj6MwcQp7CHmc",
  authDomain: "aggregator-be7d4.firebaseapp.com",
  projectId: "aggregator-be7d4",
  storageBucket: "aggregator-be7d4.firebasestorage.app",
  messagingSenderId: "128157644912",
  appId: "1:128157644912:web:a0dc2d631670b21e4f1cb5"
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const messaging = getMessaging(firebaseApp);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
export const fetchToken = (setTokenFound, setFcmToken) => {
  return getToken(messaging, {
    vapidKey:
      "BKAD7SdrBmp9TIgQShG-k9T7NwxN9RRJNON3-wc_-4iqBpssKlkSDLtqeWt4exrDPUykX5RcrClIOYhewQtzJ_o",
  })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        setTokenFound(true);
        setFcmToken(currentToken);
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        setFcmToken("");
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
};

export const onMessageListner = () => {
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // ...
    });
  });
};
