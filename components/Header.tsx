import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import app from "../firebase";
import styles from "../styles/Header.module.scss";

const Header = ({
  title,
  userStatus,
}: {
  title: string;
  userStatus: number;
}) => {
  const router = useRouter();
  const auth = getAuth(app);

  const onButtonClick = () => {
    if (userStatus === 0) {
      router.replace("/");
    } else if (userStatus === 1) {
      router.replace("/");
      signOut(auth);
    }
  };

  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      {userStatus > -1 && (
        <button onClick={onButtonClick}>
          {userStatus === 0 ? "Sign In" : "Sign Out"}
        </button>
      )}
    </header>
  );
};

Header.defaultProps = {
  userStatus: -1,
};

export default Header;
