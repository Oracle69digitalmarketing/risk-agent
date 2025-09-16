import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "oracle69-website.firebaseapp.com",
  projectId: "oracle69-website",
  storageBucket: "oracle69-website.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

// 🔐 Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signIn = () => signInWithPopup(auth, provider);

// 🔔 Messaging
const messaging = getMessaging(app);

export const requestPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "YOUR_VAPID_KEY"
    });
    console.log("FCM Token:", token);
    return token;
  } catch (err) {
    console.error("FCM permission denied", err);
    return null;
  }
};

export const listenForMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    alert(`🚨 ${payload.notification.title}: ${payload.notification.body}`);
  });
};
