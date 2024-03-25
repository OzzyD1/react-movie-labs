import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const email = "user@example.com"; // replace with user's email
const password = "password"; // replace with user's password

createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
