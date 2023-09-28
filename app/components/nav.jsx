"use client";

import Link from "next/link";
import "app/globals.css";
import "app/bootstrap.min.css";
import Image from "next/image";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { useEffect, useState, Fragment } from "react";
import { auth, googleProvider } from "app/firebase-config.js";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  EyeIcon,
  NewspaperIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { db } from "@app/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { useHref } from "react-router-dom";

{
  /* STOCK TAB OPTIONS */
}
const products = [
  {
    name: "Watchlists",
    // description: "Get a better understanding of your traffic",
    href: "#",
    icon: EyeIcon,
  },
  {
    name: "News",
    // description: "Speak directly to your customers",
    href: "#",
    icon: NewspaperIcon,
  },
  {
    name: "Markets",
    // description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: PresentationChartLineIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  // const [user, setUser] = useState({});
  // const { user, signInWithGoogle, logout } = UserAuth();
  const [loading, setLoading] = useState(true);

  const userCollectionRef = collection(db, "users");

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 50));
  //     setLoading(false);
  //   };
  //   checkAuth();
  // }, [user]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredData);
        setUserInfo(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  const logoutMobile = async () => {
    try {
      await signOut(auth);
      setMobileMenuOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const userDropdown = [
    {
      name: "My Profile",
    },
    {
      name: "Logout",
      href: "/",
    },
  ];

  /* useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
*/
  return (
    <header className="bg-stone-100">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            Dog Gallery Home
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12 bg-stone-100 ">
          <Popover className="relative">
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            ></Transition>
          </Popover>

          <a
            href="/explore"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Explore
          </a>

          <a
            href="/about"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            About
          </a>

          <a
            href="/breeds"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Breed List
          </a>
        </Popover.Group>
      </nav>

      {/* ---------------------------------------------------------MOBILE SECTION--------------------------------------------------------- */}

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5 font-thin">
              Dog Gallery Home
            </a>

            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/* DROPDOWN NAVBAR OPTIONS */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      {/* <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Info
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel> */}
                    </>
                  )}
                </Disclosure>
                <a
                  href="/explore"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Explore
                </a>
                <a
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </a>
                <a
                  href="/breeds"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Breed List
                </a>
              </div>
              {/* AUTH SECTION */}
              {/* <div className="py-6">
                {user?.email == null ? (
                  <a
                    href="/sign-in"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                ) : (
                  <a
                    href=""
                    onClick={logoutMobile}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log out
                  </a>
                )}
              </div> */}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
