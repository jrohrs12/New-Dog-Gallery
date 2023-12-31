"use client";
import "app/globals.css";
import "app/bootstrap.min.css";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  UserInfo,
  getAdditionalUserInfo,
  getAuth,
} from "firebase/auth";
import { createUserDocument } from "@app/firebase-config";
import { use, useEffect, useState } from "react";
import { auth, googleProvider } from "app/firebase-config.js";
import { db } from "@app/firebase-config";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import GoogleButton from "react-google-button";

/*
  TODO: create user database so that user's name may be displayed throughout navbar and site

        IMPLEMENT PROTECTED/PRIVATE ROUTES FOR USERS
*/

export const Auth = () => {
  const router = useRouter();
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = getAuth();

  const [user, setUser] = useState([]);

  // new user states
  const [username, setUsername] = useState("");

  const userCollectionRef = collection(db, "users");

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

  useEffect(() => {
    getUser();
  }, []);

  const [error, setError] = useState("");

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      ).then((data) => {
        console.log(data, "authData");

        router.push("/");
      });

      await addDoc(userCollectionRef, {
        email: signUpEmail,
        password: signUpPassword,
        username: username,
      });

      getUser();
    } catch (err) {
      {
        console.log(err);
        if (err.code == "auth/email-already-in-use") {
          setError("Email address already in use");
        } else if (err.code == "auth/weak-password") {
          setError("Weak password: password should be at least 6 characters");
        } else if (err.code == "auth/invalid-email") {
          setError("Please enter valid email");
        } else if (err.code == "auth/missing-password") {
          setError("Please enter a password");
        }
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((data) => {
        console.log(data, "authData");

        router.push("/");
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center">
        <div className="rounded-3xl p-4 m-3 border-1 border-neutral-900 text-center col-12 col-md-auto justify-content-center justify-content-md-between font-semibold leading-7 text-gray-900">
          <h1 className="sign-up-text pt-3">Sign Up</h1>
          <br></br>
          <input
            className="input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            id="username"
          ></input>
          <br></br>
          <input
            value={signUpEmail}
            placeholder="Email"
            onChange={(e) => setSignUpEmail(e.target.value)}
            className="input"
          ></input>
          <br></br>
          <input
            value={signUpPassword}
            placeholder="Password"
            type="password"
            onChange={(e) => setSignUpPassword(e.target.value)}
            className="input"
            id="password"
          ></input>
          <br></br>
          <p className="err-text">{error}</p>
          <button onClick={signUp} className="sign-up-btn p-2 mb-2">
            <Link href={""} className="sign-up-btn-text">
              Sign up
            </Link>
          </button>
          <br></br>
          <button className="sign-up-btn p-2 mb-2">
            <Link href={"/sign-in"} className="sign-up-btn-text">
              Sign In
            </Link>
          </button>
          <br></br>

          <button>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="60px"
              height="60px"
              viewBox="0 0 48 55"
              className="flex-center align-items-center justify-content-center "
              onClick={signInWithGoogle}
            >
              <defs>
                <filter
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                  filterUnits="objectBoundingBox"
                  id="filter-1"
                >
                  <feOffset
                    dx="0"
                    dy="1"
                    in="SourceAlpha"
                    result="shadowOffsetOuter1"
                  ></feOffset>
                  <feGaussianBlur
                    stdDeviation="0.5"
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                  ></feGaussianBlur>
                  <feColorMatrix
                    values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.168 0"
                    in="shadowBlurOuter1"
                    type="matrix"
                    result="shadowMatrixOuter1"
                  ></feColorMatrix>
                  <feOffset
                    dx="0"
                    dy="0"
                    in="SourceAlpha"
                    result="shadowOffsetOuter2"
                  ></feOffset>
                  <feGaussianBlur
                    stdDeviation="0.5"
                    in="shadowOffsetOuter2"
                    result="shadowBlurOuter2"
                  ></feGaussianBlur>
                  <feColorMatrix
                    values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.084 0"
                    in="shadowBlurOuter2"
                    type="matrix"
                    result="shadowMatrixOuter2"
                  ></feColorMatrix>
                  <feMerge>
                    <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                    <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>
                <rect
                  id="path-2"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  rx="2"
                ></rect>
                <rect
                  id="path-3"
                  x="5"
                  y="5"
                  width="38"
                  height="38"
                  rx="1"
                ></rect>
              </defs>
              <g
                id="Google-Button"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="9-PATCH"
                  transform="translate(-608.000000, -219.000000)"
                ></g>
                <g
                  id="btn_google_dark_normal"
                  transform="translate(-1.000000, -1.000000)"
                >
                  <g
                    id="button"
                    transform="translate(4.000000, 4.000000)"
                    filter="url(#filter-1)"
                  >
                    <g id="button-bg">
                      <use fill="#4285F4" fillRule="evenodd"></use>
                      <use fill="none"></use>
                      <use fill="none"></use>
                      <use fill="none"></use>
                    </g>
                  </g>
                  <g id="button-bg-copy">
                    <use fill="#FFFFFF" fillRule="evenodd"></use>
                    <use fill="none"></use>
                    <use fill="none"></use>
                    <use fill="none"></use>
                  </g>
                  <g
                    id="logo_googleg_48dp"
                    transform="translate(15.000000, 15.000000)"
                  >
                    <path
                      d="M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z"
                      id="Shape"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z"
                      id="Shape"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z"
                      id="Shape"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z"
                      id="Shape"
                      fill="#EA4335"
                    ></path>
                    <path d="M0,0 L18,0 L18,18 L0,18 L0,0 Z" id="Shape"></path>
                  </g>
                  <g id="handles_square"></g>
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
