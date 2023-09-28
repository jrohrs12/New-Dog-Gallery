"use client";

import React, { PureComponent } from "react";

import { useState, useEffect } from "react";

import Dog from "./Dog";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

let data = [];

/*
    lookUp component for explore page
*/
export const LookUp = () => {
  const [breeds, setBreeds] = useState([]);
  const [breedPics, setBreedPics] = useState([]);

  const [errMessage, setErrMessage] = useState("");
  const [err, setErr] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // API requests for each breed in the breeds array
    const fetchBreedsData = async (breed) => {
      const url = `https://dog.ceo/api/breed/${breed}/images`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        if (result.code == 404) {
          setErr(true);
          setErrMessage("Sorry, that breeds does not exist");
        } else {
          setErr(false);
          setErrMessage("");
        }
        console.log(result.message);
        return { breed, pics: result.message };
      } catch (err) {
        console.error(`Error fetching data for ${breed}:`, err);
        return null;
      }
    };

    const fetchDataForBreeds = async () => {
      const requests = breeds.map((breed) => fetchBreedsData(breed.trim()));
      const breedData = await Promise.all(requests);
      const validBreedsData = breedData.filter((data) => data !== null);
      setBreedPics(validBreedsData);
    };

    fetchDataForBreeds();
  };

  //   const url = `https://dog.ceo/api/breeds/${breeds}/images`;

  //   const options = {
  //     method: "GET",
  //   };

  //   try {
  //     const response = await fetch(url, options);
  //     const result = await response.json();
  //     if (result.code == 404) {
  //       setErr(true);
  //       setErrMessage("Sorry, that breeds does not exist");
  //     } else {
  //       setErr(false);
  //       setErrMessage("");
  //     }
  //     console.log(result);
  //     setBreedPics(result.message);
  //   } catch (err) {
  //     console.log(err);
  //     setErr(true);
  //   }
  // };

  // try {
  //   useEffect(() => {
  //     setImages(

  //     );
  //   }, [breedPics]);
  // } catch (err) {
  //   console.log(err);
  // }

  return (
    <div className="container">
      <div className="flex justify-center items-center">
        <form onSubmit={handleFormSubmit}>
          <div className="">
            <div className=" flex justify-center items-center">
              <input
                type="text"
                name="breeds"
                placeholder="Search breeds...(breed, ...)"
                value={breeds.join(",")}
                onChange={(e) => setBreeds(e.target.value.split(","))}
                className=" p-3 border rounded"
              />
            </div>

            <div className="flex justify-center py-2">
              <input
                type="submit"
                value="Search"
                className=" border rounded bg-green-500 p-2"
              />
            </div>

            {errMessage != "" ? (
              <p className="border-1 border-red-500 rounded p-2 text-red-500">
                {errMessage}
              </p>
            ) : (
              ""
            )}

            <br />
          </div>
        </form>
      </div>
      <div className="">
        {err == false ? (
          <>
            {breedPics.map(({ breed, pics }) => (
              <div key={breed} className="container mx-auto p-5">
                <div className="grid grid-cols-3 gap-5">
                  {pics.map((pic, index) => (
                    <img
                      key={index}
                      src={pic}
                      alt="dogs"
                      className="block h-full w-full rounded-lg object-cover object-center"
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
