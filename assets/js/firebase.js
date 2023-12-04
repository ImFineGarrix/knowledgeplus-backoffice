// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { useRuntimeConfig } from "nuxt/app";

const config = useRuntimeConfig()

const firebaseConfig = {
  apiKey: config.public.firebaseApiKey,
  authDomain: config.public.firebaseAuthDomain,
  projectId: config.public.firebaseProjectId,
  storageBucket: config.public.firebaseStorageBucket,
  messagingSenderId: "334590771194",
  appId: config.public.firebaseAppId,
  measurementId: "G-4263LPRR8L"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {
  app,
  storage
}