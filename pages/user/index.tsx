import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Form from "../../components/Form";
import Header from "../../components/Header";
import TodoList from "../../components/TodoList";
import app from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import styles from "../../styles/UserScreen.module.scss";

const UserScreen = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);

  type todoItemType = { id: string; text: string; completed: boolean };
  type userType = { displayName: string; uid: string };

  const [todoItems, setTodoItems]: [
    todoItems: todoItemType[],
    setTodoItems: Dispatch<SetStateAction<todoItemType[]>>
  ] = useState([]);
  const [signedInUser, setSignedInUser]: [
    signedInUser: userType,
    setSignInUser: Dispatch<SetStateAction<userType>>
  ] = useState({ displayName: "User", uid: "" });
  const [todoFilter, setTodoFilter] = useState("all");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/");
        return;
      }

      if (signedInUser.uid.length > 0) {
        const saveUser = async () => {
          await setDoc(doc(db, "users", signedInUser.uid), {
            name: signedInUser.displayName,
          });
        };

        const fetchTodoItems = async () => {
          const querySnapshot = await getDocs(
            collection(db, `users/${signedInUser.uid}/todos`)
          ).catch();

          const fetchedItems: todoItemType[] = [];
          querySnapshot.forEach((doc) => {
            fetchedItems.push({
              id: doc.data().id,
              text: doc.data().text,
              completed: doc.data().completed,
            });
          });

          setTodoItems(fetchedItems);
        };

        saveUser();
        fetchTodoItems();
      } else {
        const displayName = user.displayName;
        const uid = user.uid;
        setSignedInUser({ displayName: displayName, uid: uid });
      }
    });
  }, [signedInUser, auth, db, router]);

  const onAddTodo = async (text: string) => {
    const todoItem: todoItemType = {
      id: new Date().getTime().toString(),
      text: text,
      completed: false,
    };

    setTodoItems([...todoItems, todoItem]);

    await setDoc(
      doc(db, `users/${signedInUser.uid}/todos`, todoItem.id),
      todoItem
    );
  };

  const onRemoveTodo = async (id: string) => {
    setTodoItems(
      todoItems.filter((todoItem) => {
        return todoItem.id !== id;
      })
    );

    await deleteDoc(doc(db, `users/${signedInUser.uid}/todos`, id));
  };

  const onToggleCompleted = async (id: string) => {
    setTodoItems(
      todoItems.map((todoItem) => {
        return todoItem.id === id
          ? { ...todoItem, completed: !todoItem.completed }
          : todoItem;
      })
    );

    const docRef = doc(db, `users/${signedInUser.uid}/todos`, id);
    const docSnap = await getDoc(docRef);

    await updateDoc(docRef, {
      completed: !docSnap.data().completed,
    });
  };

  const onFilterChange = (selection: string) => {
    setTodoFilter(selection);
  };

  return (
    <div className={styles.container}>
      <Header
        title={`${signedInUser.displayName.split(" ")[0]}'s Todo List`}
        userStatus={1}
      />
      {signedInUser.uid.length > 0 && (
        <Form onAddTodo={onAddTodo} onFilterChange={onFilterChange} />
      )}
      {signedInUser.uid.length > 0 && (
        <TodoList
          todoItems={todoItems}
          onRemoveTodo={onRemoveTodo}
          onToggleCompleted={onToggleCompleted}
          todoFilter={todoFilter}
        />
      )}
    </div>
  );
};

export default UserScreen;
