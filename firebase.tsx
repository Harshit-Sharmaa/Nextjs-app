import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBihGPQDbywHbCQNwtLhdDYz-FHvc--SIM",
    authDomain: "nextjs-todo-6d055.firebaseapp.com",
    projectId: "nextjs-todo-6d055",
    storageBucket: "nextjs-todo-6d055.appspot.com",
    messagingSenderId: "82341901595",
    appId: "1:82341901595:web:fdf523155974888ee60fbe",
    measurementId: "G-D9BM8BBPZX"
};

const app = initializeApp(firebaseConfig);
export default app;