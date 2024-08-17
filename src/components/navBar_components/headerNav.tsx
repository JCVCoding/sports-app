"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
import NavDropdown from "./navDropdown";
import { Avatar } from "@material-tailwind/react";

export default function HeaderNav() {
  let [vpSize, setVpSize] = useState(0);
  const getVpSize = () => {
    setVpSize(window.innerWidth);
  };
  useEffect(() => {
    setVpSize(window.innerWidth);
    window.addEventListener("resize", getVpSize);
    return () => {
      window.removeEventListener("resize", getVpSize);
    };
  }, []);

  const { data } = useSession();

  return (
    <div className="flex justify-between items-center">
      <div className="flex md:gap-6 gap-3">
        <Link href="/" className="md:text-xl text-base font-medium">
          Home
        </Link>
        <Link href="/nba" className="md:text-xl text-base font-medium">
          NBA
        </Link>

        <Link href="/nfl" className="md:text-xl text-base font-medium">
          NFL
        </Link>

        <Link href="/mlb" className="md:text-xl text-base font-medium">
          MLB
        </Link>

        <Link href="/nhl" className="md:text-xl text-base font-medium">
          NHL
        </Link>
      </div>
      <div className="flex md:gap-6 gap-3 items-center">
        {vpSize > 768 ? (
          <>
            {data?.user ? (
              <>
                <Avatar
                  src={data.user.image ? data.user.image : undefined}
                  size="md"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                <Link
                  href="/"
                  className="md:text-xl text-base font-medium"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="md:text-xl text-base font-medium"
                  onClick={() => signIn()}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="md:text-xl text-base font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </>
        ) : (
          <NavDropdown />
        )}
      </div>
    </div>
  );
}
