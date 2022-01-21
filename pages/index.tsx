import Header from "../components/Header";
import { FcBusinessman, FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import app from "../firebase";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import styles from "../styles/Home.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  type signInErrorInfoType = { errorCode: number; errorMessage: string };
  const [errorInfo, setErrorInfo]: [
    errorInfo: signInErrorInfoType,
    setErrorInfo: Dispatch<SetStateAction<signInErrorInfoType>>
  ] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/user");
      }
    });
  }, [auth, router]);

  const onGoogleButtonClick = () => {
    setErrorInfo(null);
    signInWithPopup(auth, provider)
      .then((result) => {
        router.replace("/user");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorInfo({ errorCode, errorMessage });
      });
  };

  const onGuestButtonClick = () => {
    router.push("/guest");
  };

  return (
    <div className={styles.container}>
      <Header title="My Todo List" />
      <div className={styles.buttonGroup}>
        <button onClick={onGoogleButtonClick}>
          <FcGoogle /> Continue with Google
        </button>
        {errorInfo !== null && (
          <p>
            An error ocurred when signing in
            <br />
            <strong>Error code: </strong>
            {errorInfo.errorCode}
            <br />
            <strong>Error message: </strong>
            {errorInfo.errorMessage}
          </p>
        )}
        <button onClick={onGuestButtonClick}>
          <FcBusinessman /> Continue as guest
        </button>
      </div>
    </div>
  );
}
