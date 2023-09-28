import React from "react";
import "app/globals.css";
import Image from "next/image";
import { HomePage } from "./components/HomePage";

// server side component
export default function Home() {
  return (
    <div>
      <div className=" text-center font-thin">
        <h1 className=" text-7xl mt-40  ">The Dog Gallery</h1>
        <p className=" text-3xl mt-3">Explore dog breeds, pictures, and more</p>
      </div>
      <HomePage />
    </div>
  );
}
