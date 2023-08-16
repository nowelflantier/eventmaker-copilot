"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@utils/UserContext";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const { user, userName } = useUser();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-3 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.png"
          alt="Eventmaker Copilot Logo"
          width={50}
          height={50}
          className="object-contain"
        />
        <p className="logo_text">Eventmaker Copilot</p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
               {user && !user.token && (<Link  className="black_btn" href="/profile/edit">Associer un token</Link>)}
               {user && user.token && (<Link  className="black_btn" href="/dashboard">Dashboard</Link>)}
            <button type="button" onClick={signOut} className="outline_btn">
              Se déconnecter
            </button>
            <Link href="/">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="user avatar"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Se connecter
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        
        {session?.user ? (
          <div className="flex gap-3">
            <Link  className="black_btn" href="/dashboard">Dashboard</Link>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              alt="user avatar"
              className="rounded-full"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />
            
            {toggleDropdown && (
              <div className="dropdown">
                <p>Bonjour {session?.user.name}</p>
                <Link
                  href="/"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Mon profil
                </Link>
                {user && user.token && (<Link  className="black_btn mt-5" href="/dashboard">Dashboard</Link>)}
                {user && !user.token && (<Link  className="black_btn w-full mt-4" href="/profile/edit">Associer un token</Link>)}
                <button
                  type="button"
                  className="mt-5 w-full outline_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Se connecter
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;