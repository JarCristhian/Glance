"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import { useTheme } from "next-themes";
import picachu from "../../../src/app/img/picachu.jpg";
import ania from "../../../src/app/img/ania.jpg";
import men from "../../../src/app/img/men.jpg";
import women from "../../../src/app/img/women.jpg";
import girl from "../../../src/app/img/girl.jpg";
import cat from "../../../src/app/img/cat.jpg";
import luffysky from "../../../src/app/img/luffysky.jpg";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import ShinyButton from "./buttonShiny";
import { Languages } from "../../app/api/config";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DialogProfile } from "./dialogProfile";
import { toast, Toaster } from "sonner";

export default function ButtonAuth() {
  const languages = new Languages();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const { data: session } = useSession();
  const { English, Spanish } = languages;
  const [language, setLan] = useState<boolean | null>(languages.getLanguage());
  const [show, setShow] = useState<boolean>(false);

  const handleSetLanguage = () => {
    languages.setLanguage();
    setLan(languages.getLanguage());
  };

  const getNewValues = (value: number) => {
    if (value == 0) {
      toast.info(language ? "Incorrect Password" : "Contraseña Incorrecta");
    } else {
      toast.success(language ? "Updated Profile" : "Perfil Actualizado");
    }
  };

  if (session) {
    let userT: any;
    if (session.user.user.image == "") {
      userT = picachu;
    } else if (session.user.user.image == "men") {
      userT = men;
    } else if (session.user.user.image == "women") {
      userT = women;
    } else if (session.user.user.image == "ania") {
      userT = ania;
    } else if (session.user.user.image == "cat") {
      userT = cat;
    } else if (session.user.user.image == "luffysky") {
      userT = luffysky;
    } else if (session.user.user.image == "girl") {
      userT = girl;
    }

    return (
      <>
        <DialogProfile
          show={show}
          onClose={() => setShow(!show)}
          setUpdate={getNewValues}
        />
        <Toaster position="top-left" duration={1000} />
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
            className="hidden sm:hidden md:block"
          >
            <div className="flex items-center justify-center">
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            </div>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center px-1 space-x-1.5 cursor-pointer hover:bg-accent/65 hover:shadow-sm rounded-sm">
                <Image
                  className="w-7 h-7 rounded mt-1"
                  src={userT}
                  alt=""
                  unoptimized={true}
                  priority={true}
                />
                <div className="flex items-center space-x-2">
                  <div className="grid -space-y-1 select-none">
                    <span className="text-sm">{session.user.user.name}</span>
                    <span className="text-[9.5px] text opacity-70">
                      {session.user.user.email}
                    </span>
                  </div>
                  <div className="w-4 h-4 opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12 5.83L15.17 9l1.41-1.41L12 3L7.41 7.59L8.83 9L12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15L12 18.17z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-12"
              align="end"
              sideOffset={10}
              alignOffset={1}
            >
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer text-sm"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  <div className="w-3.5 h-3.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 2a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3 3 0 0 1-3 3m9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-xs ml-1">
                    {language ? English.profile : Spanish.profile}
                  </span>
                </DropdownMenuItem>
                {session.user.user.role == "admin" && (
                  <DropdownMenuItem
                    className="cursor-pointer text-sm"
                    onClick={() => {
                      router.push("/codes");
                    }}
                  >
                    <div className="w-3.5 h-3.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M4 18V6v13zm0 2q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h5.175q.4 0 .763.15t.637.425L12 6h8q.825 0 1.413.588T22 8v4q0 .425-.288.713T21 13t-.712-.288T20 12V8h-8.825l-2-2H4v12h4q.425 0 .713.288T9 19t-.288.713T8 20zm9.825-1l1.475 1.475q.3.3.3.7t-.3.7t-.712.3t-.713-.3L11.7 19.7q-.3-.3-.3-.7t.3-.7l2.175-2.175q.3-.3.713-.3t.712.3t.3.7t-.3.7zm6.35 0L18.7 17.525q-.3-.3-.3-.7t.3-.7t.713-.3t.712.3L22.3 18.3q.3.3.3.7t-.3.7l-2.175 2.175q-.3.3-.713.3t-.712-.3t-.3-.7t.3-.7z"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-xs ml-1">
                      {language ? "Codes" : "Codigos"}
                    </span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="cursor-pointer text-sm sm:block md:hidden"
                  onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
                >
                  <div className="flex space-x-3">
                    <div className="w-3 h-3">
                      <MoonIcon className="absolute w-3 h-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <SunIcon className="w-3 h-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    </div>
                    <span className="text-xs ml-1">
                      {language ? English.theme : Spanish.theme}
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-sm"
                  onClick={() => handleSetLanguage()}
                >
                  <div className="w-3.5 h-3.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="M48 112h288"
                      ></path>
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="M192 64v48"
                      ></path>
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="M272 448l96-224l96 224"
                      ></path>
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="M301.5 384h133"
                      ></path>
                      <path
                        d="M281.3 112S257 206 199 277S80 384 80 384"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      ></path>
                      <path
                        d="M256 336s-35-27-72-75s-56-85-56-85"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-xs ml-1">
                    {language ? English.language : Spanish.language}
                  </span>
                </DropdownMenuItem>
                <hr className="my-1" />
                <DropdownMenuItem
                  className="cursor-pointer text-sm"
                  onClick={() => signOut()}
                >
                  <div className="w-3.5 h-3.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                      <path
                        d="M6 30h12a2.002 2.002 0 0 0 2-2v-3h-2v3H6V4h12v3h2V4a2.002 2.002 0 0 0-2-2H6a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M20.586 20.586L24.172 17H10v-2h14.172l-3.586-3.586L22 10l6 6l-6 6l-1.414-1.414z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-xs ml-1">
                    {language ? English.logout : Spanish.logout}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
        >
          <div className="flex items-center justify-center">
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </div>
        </Button>
        <ShinyButton signIn={() => signIn()} />
      </div>
    </>
  );
}
