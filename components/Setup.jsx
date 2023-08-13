"use client";
import React from "react";
import { useUser } from "@utils/UserContext";

const Setup = () => {
  const { user, token } = useUser();
  console.log({ user, token });
  return (
    <div>
      {user && !token && (
        <div className="relative p-10 mt-10 col-span-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md md:col-span-2">
            <div className="mx-auto max-w-md text-center">
          <h3 className="text-center">
            <span className="green_gradient text-center font-semibold">Bonjour {user} !</span>
            <br/>
            Encore quelques étapes avant de pouvoir accéder à vos
            évènements :
          </h3>
          <button className="black_btn mt-5 mx-auto">Associer un Token</button>
        </div>
        </div>
      )}
      {/* Reste du contenu */}
    </div>
  );
};

export default Setup;
