"use client";
import React from "react";
import { useUser } from "@utils/UserContext";
import Link from "next/link";

const Setup = () => {
  const { user, token, id } = useUser();
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
          <Link href="/profile/edit"className="black_btn mt-5 mx-auto">Associer un Token</Link>
        </div>
        </div>
      )}
    </div>
  );
};

export default Setup;
