// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { useRuntimeConfig } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.messagingSenderId,
    appId: config.public.firebaseAppId,
  };



  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  nuxtApp.vueApp.provide("storage", storage);
  nuxtApp.provide("storage", storage);
})
