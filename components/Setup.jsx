"use client";
import React from "react";
import { useUser } from "@utils/UserContext";
import Link from "next/link";
// import Feed from "./Feed";

const Setup = () => {
  const { user, userName } = useUser();
  return (
    <div>
      {user && !user.token ? (
        <div className="prompt_card mt-10 mb-10">
          <div className="mx-auto max-w-md text-center">
            <h3 className="text-center">
              <span className="green_gradient text-center font-semibold">
                Bonjour {userName} !
              </span>
              <br />
              Encore quelques étapes avant de pouvoir accéder à vos évènements :
            </h3>
            <Link href="/profile/edit" className="black_btn mt-5 mx-auto">
              Associer un Token
            </Link>
          </div>
        </div>
      ) : (
        <div className="prompt_card mt-10 mb-10">
          <div className="mx-auto max-w-md text-center">
            <h3 className="text-center">
              <span className="green_gradient text-center font-semibold">
                Bonjour {user.first_name} !
              </span>
              <br />
              Retrouvez vos évènements sur votre dashboard :
            </h3>
            <Link className="black_btn mt-5 mx-auto" href="/dashboard">
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setup;
