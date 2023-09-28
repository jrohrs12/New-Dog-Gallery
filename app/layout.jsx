"use client";

import "app/globals.css";
import Nav from "./components/nav";
import { ReactDOM, useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { db } from "./firebase-config";
import { getDocs, collection } from "firebase/firestore";

const metadata = {
  title: "Dog App",
  description: "Generated by create next app",
};

export default function Layout({ children }) {
  const [user, setUser] = useState([]);

  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredData);
        setUser(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  return (
    <html lang="en">
      <body className="bg-stone-100">
        {<Nav />}
        {children}
      </body>
    </html>
  );
}