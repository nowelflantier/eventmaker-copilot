"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@utils/UserContext";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";

const Navbar = () => {
  const { data: session } = useSession();
  const { user, userName } = useUser();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    function isWebview(userAgent) {
      return /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent) || /Android.*W\/[a-z]+\/[0-9]+.[0-9]+/i.test(userAgent);
    }
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
    if (isWebview(window.navigator.userAgent)) {
      toast.error("Open Fatebook in Safari or Chrome to sign in.\n\nGoogle does not support this browser.", {
        duration: 10000,
      });
    }
  }, []);

  return (
    <nav className="flex-between w-full mb-3 pt-3">
        {!session?.user && <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{ duration: 2000 }}
            />}
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
            <Link href="/profile/edit">
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
            {user?.token && <Link  className="black_btn" href="/dashboard">Dashboard</Link>}
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
                  href="/profile/edit"
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