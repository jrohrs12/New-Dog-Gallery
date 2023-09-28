import React from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import { IconContext } from "react-icons/lib/esm";

export default function About() {
  return (
    <div className=" text-center font-thin background">
      <h1 className=" text-7xl mt-40  ">This is the Dog Gallery</h1>
      <div className=" text-3xl mt-3">
        <p>Our goal is to get people to love dogs! Adopt a dog today!</p>
        <a
          href="https://www.petfinder.com/search/dogs-for-adoption/us/wi/madison/"
          className=" text-blue-300"
        >
          Click here to adopt
        </a>
      </div>
    </div>
  );
}
