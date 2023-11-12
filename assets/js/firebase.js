// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBD9Sib0McpeRzQ7RLWlgw2f83x-O4UEiE",
  authDomain: "knowledge-project-7e224.firebaseapp.com",
  projectId: "knowledge-project-7e224",
  storageBucket: "knowledge-project-7e224.appspot.com",
  messagingSenderId: "334590771194",
  appId: "1:334590771194:web:d2d63763aee80c8ce56e43",
  measurementId: "G-4263LPRR8L"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {
  app,
  storage
}