// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDgAorGx5cx7fx_a5aCnqKk1hrgn7CMUsA",
	authDomain: "wwtbam-huydarwin-controller.firebaseapp.com",
	databaseURL: "https://wwtbam-huydarwin-controller-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "wwtbam-huydarwin-controller",
	storageBucket: "wwtbam-huydarwin-controller.appspot.com",
	messagingSenderId: "232833819877",
	appId: "1:232833819877:web:ed1a96308dbd1020e2a00c",
	measurementId: "G-W1853GNPFY"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);