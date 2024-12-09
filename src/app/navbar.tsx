"use client";

import * as React from "react";

import ButtonAuth from "@/components/me/buttonAuth";
import Image from "next/image";
import glance from "../../src/app/img/glance.png";
import { usePathname, useRouter } from "next/navigation";

export function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const showNavbar = pathname !== "/login";

  return (
    <>
      {showNavbar && (
        <div className="fixed z-10 top-0 overflow-y-hidden w-full h-12 backdrop-blur-sm  bg-white/10 dark:bg-stone-950/10 drop-shadow-md p-1.5 ">
          <div className="flex justify-between items-center mx-2 md:mx-4">
            <div
              onClick={() => {
                router.push("/");
              }}
              className="flex space-x-2 items-center cursor-pointer"
            >
              <div className="flex justify-center opacity-80 dark:opacity-100 dark:invert">
                <Image
                  className="w-7 h-7"
                  src={glance}
                  unoptimized={true}
                  priority={true}
                  alt=""
                  placeholder="blur"
                />
              </div>
              <div className="select-none dark:text-white text-2xl">Glance</div>
            </div>
            <ButtonAuth />
          </div>
        </div>
      )}
    </>
  );
}
