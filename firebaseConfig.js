import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDbQA1i0INdj866ojIL_oZU36fUrF7yr7Y",
  authDomain: "quiztm-9250c.firebaseapp.com",
  projectId: "quiztm-9250c",
  storageBucket: "quiztm-9250c.appspot.com",
  messagingSenderId: "745546945742",
  appId: "1:745546945742:web:0e6d75c25f290751626c9f",
  measurementId: "G-YKZY0RS6V1"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);