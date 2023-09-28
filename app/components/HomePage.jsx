"use client";

import React from "react";
import { useState, useEffect } from "react";

export const HomePage = () => {
  const [randPics, setRandPics] = useState([]);
  // const [breedList, setBreedList] = useState({});

  // const list = [];

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random/9")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        //setBreedList(data.message);
        setRandPics(data.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-3 gap-5">
          {randPics.map((pics) => (
            <img
              key={pics}
              src={pics}
              alt="random dog pic"
              className="block h-full w-full rounded-lg object-cover object-center"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
