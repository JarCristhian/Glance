"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import glance from "../../../src/app/img/glance.png";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import { TextAnimation } from "@/components/me/textAniamtion";
import { Languages } from "../api/config";
import Meteors from "../../components/me/meteors";
import { ApiClient } from "../api/apiClient";

interface User {
  name: string;
  email: string;
  password: string;
}

function Login() {
  const languages = new Languages();
  const { English, Spanish, language } = languages;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(true);
  const [nUser, setNUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const api = new ApiClient();
  const router = useRouter();
  const [lang, setLang] = useState<boolean | null>(false);

  useEffect(() => {
    setLang(languages.getLanguage());
  }, [language]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let message = "";

    if (email.trim().length === 0 && password.trim().length === 0) {
      message = lang ? "Add your Credentials" : "Ingresa tus Credenciales.";
    } else if (email.trim().length === 0) {
      message = lang ? English.ErrorEmail : Spanish.ErrorEmail;
    } else if (password.trim().length === 0) {
      message = lang ? English.ErrorPass : Spanish.ErrorPass;
    }

    if (message != "") {
      toast.error(message);
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      email: email + "@gmail.com",
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      toast.error("Tu Usuario es incorrecto.");
      return;
    } else {
      toast.success("Login Successfully!");
      router.push("/");
    }
  };

  const createUser = async () => {
    let message = "";

    if (nUser.name.trim().length === 0) {
      message = lang ? English.ErrorName : Spanish.ErrorName;
    } else if (nUser.email.trim().length === 0) {
      message = lang ? English.ErrorEmail : Spanish.ErrorEmail;
    } else if (nUser.password.trim().length === 0) {
      message = lang ? English.ErrorPass : Spanish.ErrorPass;
    } else if (nUser.password.trim().length <= 5) {
      message = lang
        ? "Password is lenght 5"
        : "La contraseña debe ser mayor a 5 digitos.";
    }

    if (message != "") {
      toast.error(message);
      return;
    }

    const response = await api.postAll("auth/register", {
      name: nUser.name.trim(),
      email: nUser.email.trim() + "@gmail.com",
      password: nUser.password,
    });
    console.log(response);

    if (response.status != 400) {
      const responseNextAuth = await signIn("credentials", {
        email: nUser.email.trim() + "@gmail.com",
        password: nUser.password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        toast.error("Tu Usuario es incorrecto.");
        return;
      } else {
        toast.success(lang ? English.welcome : Spanish.welcome);
        router.push("/");
      }
    } else {
      toast.error(lang ? "User to exist." : "Usuario ya existe.");
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-center w-full overflow-hidden">
        <Meteors number={30} />
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen"
          >
            <Toaster position="top-left" duration={1000} />
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start p-4">
              <div className="mx-auto flex w-full flex-col justify-center item space-y-6">
                <div className="relative flex-col space-y-2 text-center">
                  <div className="flex justify-center select-none opacity-80 dark:opacity-100 dark:invert">
                    <Image
                      className="w-20 h-20"
                      src={glance}
                      unoptimized={true}
                      priority={true}
                      alt=""
                      placeholder="empty"
                    />
                  </div>
                  <div>
                    <h1 className="text-4xl font-semibold tracking-tight select-none  min-w-[265px]">
                      Glance
                    </h1>
                    <TextAnimation
                      className="text-sm text-muted-foreground select-none"
                      text={lang ? English.welcome : Spanish.welcome}
                    />
                  </div>
                </div>
                {show ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label>{lang ? English.user : Spanish.user}</Label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                      />
                    </div>

                    <div>
                      <Label>{lang ? English.pass : Spanish.pass}</Label>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <div className="mb-2.5">
                        <button
                          type="submit"
                          className="rounded-full w-full mt-2 border cursor-pointer border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 px-4 sm:px-5"
                        >
                          {lang ? English.login : Spanish.login}
                        </button>
                      </div>
                      <div className="flex justify-start">
                        <a
                          onClick={() => setShow(false)}
                          className="text-sm text-muted-foreground hover:text-primary select-none opacity-50 cursor-pointer hover:underline hover:underline-offset-4"
                        >
                          {lang ? English.created : Spanish.created}
                        </a>
                      </div>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="space-y-5">
                      <div>
                        <Label>{lang ? English.name : Spanish.name}</Label>
                        <Input
                          value={nUser.name}
                          onChange={(e) =>
                            setNUser({ ...nUser, name: e.target.value })
                          }
                          autoComplete="off"
                        />
                      </div>
                      <div>
                        <Label>{lang ? English.user : Spanish.user}</Label>
                        <Input
                          value={nUser.email}
                          onChange={(e) =>
                            setNUser({ ...nUser, email: e.target.value })
                          }
                          autoComplete="off"
                          maxLength={6}
                        />
                      </div>
                      <div>
                        <Label>{lang ? English.pass : Spanish.pass}</Label>
                        <Input
                          type="password"
                          value={nUser.password}
                          onChange={(e) =>
                            setNUser({ ...nUser, password: e.target.value })
                          }
                          autoComplete="off"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            className="shadow-sm h-10 rounded-full"
                            type="button"
                            onClick={() => setShow(true)}
                          >
                            {lang ? English.cancelButton : Spanish.cancelButton}
                          </Button>

                          <button
                            onClick={createUser}
                            className="rounded-full w-full  border cursor-pointer border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 px-4 sm:px-5"
                          >
                            {lang ? English.register : Spanish.register}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              {/* <pre>{JSON.stringify(nUser, null, 2)}</pre> */}

              <footer className="flex gap-5 h-20 items-center w-full justify-center">
                <a className="text-sm text-muted-foreground hover:text-primary select-none opacity-50 cursor-pointer hover:underline hover:underline-offset-4">
                  © Created by Jarcy
                </a>
                <div className="flex space-x-2 items-center">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://github.com/JarCristhian"
                    target="_blank"
                    className="text-muted-foreground/70 hover:text-primary opacity-50 w-5 h-5 cursor-pointer"
                  >
                    <svg viewBox="0 0 496 512">
                      <path
                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6c-3.3.3-5.6-1.3-5.6-3.6c0-2 2.3-3.6 5.2-3.6c3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9c2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9c.3 2 2.9 3.3 5.9 2.6c2.9-.7 4.9-2.6 4.6-4.6c-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2c12.8 2.3 17.3-5.6 17.3-12.1c0-6.2-.3-40.4-.3-61.4c0 0-70 15-84.7-29.8c0 0-11.4-29.1-27.8-36.6c0 0-22.9-15.7 1.6-15.4c0 0 24.9 2 38.6 25.8c21.9 38.6 58.6 27.5 72.9 20.9c2.3-16 8.8-27.1 16-33.7c-55.9-6.2-112.3-14.3-112.3-110.5c0-27.5 7.6-41.3 23.6-58.9c-2.6-6.5-11.1-33.3 2.6-67.9c20.9-6.5 69 27 69 27c20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27c13.7 34.7 5.2 61.4 2.6 67.9c16 17.7 25.8 31.5 25.8 58.9c0 96.5-58.9 104.2-114.8 110.5c9.2 7.9 17 22.9 17 46.4c0 33.7-.3 75.4-.3 83.6c0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252C496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2c1.6 1.6 3.9 2.3 5.2 1c1.3-1 1-3.3-.7-5.2c-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9c1.6 1 3.6.7 4.3-.7c.7-1.3-.3-2.9-2.3-3.9c-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2c2.3 2.3 5.2 2.6 6.5 1c1.3-1.3.7-4.3-1.3-6.2c-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9c1.6 2.3 4.3 3.3 5.6 2.3c1.6-1.3 1.6-3.9 0-6.2c-1.4-2.3-4-3.3-5.6-2z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    className="text-muted-foreground/70 hover:text-primary opacity-50 w-6 h-6 cursor-pointer"
                  >
                    <svg viewBox="0 0 1024 1024">
                      <path
                        d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3S645.3 585.4 645.3 512S585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165c-3.1-64-17.7-120.8-64.5-167.6c-46.9-46.9-103.6-61.4-167.6-64.5c-55.2-3.1-109.9-2.6-165-2.6c-55.2 0-109.9-.5-165 2.6c-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6c46.9 46.9 103.6 61.4 167.6 64.5c55.2 3.1 109.9 2.6 165 2.6c55.2 0 109.9.5 165-2.6c64-3.1 120.8-17.7 167.6-64.5c46.9-46.9 61.4-103.6 64.5-167.6c3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9S717.1 398.5 717.1 512S625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9s47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    className="text-muted-foreground/70 hover:text-primary opacity-50 w-6 h-6 cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24">
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        color="currentColor"
                      >
                        <path d="m7 17l4.194-4.193M17 7l-4.193 4.194m0 0L9.777 7H7l4.194 5.807m1.612-1.614L17 17h-2.778l-3.028-4.193"></path>
                        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"></path>
                      </g>
                    </svg>
                  </motion.a>
                </div>
              </footer>
            </main>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default Login;
