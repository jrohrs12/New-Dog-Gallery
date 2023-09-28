"use client";

import React from "react";
import { useState, useEffect } from "react";

export default function Breeds() {
  const [breedData, setBreedData] = useState({});
  // const [breedList, setBreedList] = useState({});

  // const list = [];

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        //setBreedList(data.message);
        setBreedData(data.message);
      });
  }, []);

  const formatBreedList = (breedList) => {
    return Object.keys(breedList).map((breed) => {
      const subBreeds = breedList[breed].map((subBreed) => (
        <li key={subBreed}>{subBreed}</li>
      ));

      return (
        <li key={breed}>
          {subBreeds.length > 0 ? (
            <>
              {breed}:<ul>{subBreeds}</ul>
            </>
          ) : (
            breed
          )}
        </li>
      );
    });
  };

  return (
    <div className=" container">
      <div className=" font-thin">
        <h1 className=" font-thin">Dog Breeds Dictionary</h1>
        <p>Here is a list of all breeds and sub-breeds</p>
        <div className="container mx-auto p-2">
          <div className="grid grid-cols-3 gap-3 font-thin">
            {formatBreedList(breedData)}
          </div>
        </div>
      </div>
    </div>
  );
}
