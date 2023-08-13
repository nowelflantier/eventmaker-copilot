"use client";
import React from "react";
import { useUser } from "@utils/UserContext";

const Setup = () => {
  const { user, token } = useUser();
  console.log({ user, token });
  return (
    <div>
      {user && !token && (
        <div className="prompt_card mt-10 mb-10">
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
