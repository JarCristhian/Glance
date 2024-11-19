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
  const [visible, setVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [counter, setCounter] = useState<boolean>(true);
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
    setTimeout(() => {
      setCounter(false);
    }, 500);
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
    setLoading(true);
    const responseNextAuth = await signIn("credentials", {
      email: email + "@gmail.com",
      password,
      redirect: false,
    });
    setLoading(false);

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
      {counter ? (
        <div className="loading-page">
          <span className="loader" />
        </div>
      ) : (
        <div className="relative flex items-center justify-center w-full overflow-hidden">
          <div></div>
          <Meteors number={30} />
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                      <p className="text-sm text-muted-foreground select-none font-comic">
                        {lang ? English.welcome : Spanish.welcome}
                      </p>
                    </div>
                  </div>
                  {show ? (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6  font-comic"
                    >
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
                        <div className="relative">
                          <Input
                            className="pr-8"
                            type={visible ? "password" : "text"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                          />

                          <div
                            className={
                              password != ""
                                ? "opacity-70 cursor-pointer"
                                : "opacity-0"
                            }
                          >
                            {visible ? (
                              <svg
                                onClick={() => setVisible(!visible)}
                                viewBox="0 0 32 32"
                                className="lucide lucide-search absolute right-3 top-2.5 h-4 w-4"
                              >
                                <path
                                  fill="currentColor"
                                  d="M28.034 17.29c.13.43.53.71.96.71v-.01a.993.993 0 0 0 .96-1.28C29.923 16.61 26.613 6 15.995 6S2.07 16.61 2.04 16.72c-.16.53.14 1.08.67 1.24s1.09-.14 1.25-.67C4.069 16.91 6.889 8 15.996 8c9.105 0 11.915 8.903 12.038 9.29M12 18a4 4 0 1 1 8 0a4 4 0 0 1-8 0m4-6a6 6 0 1 0 0 12a6 6 0 0 0 0-12"
                                ></path>
                              </svg>
                            ) : (
                              <svg
                                onClick={() => setVisible(!visible)}
                                viewBox="0 0 32 32"
                                className="lucide lucide-search absolute right-3 top-2.5 h-4 w-4"
                              >
                                <path
                                  fill="currentColor"
                                  d="m20.525 21.94l7.768 7.767a1 1 0 0 0 1.414-1.414l-26-26a1 1 0 1 0-1.414 1.414l5.19 5.19c-3.99 3.15-5.424 7.75-5.444 7.823c-.16.53.14 1.08.67 1.24s1.09-.14 1.25-.67c.073-.254 1.358-4.323 4.926-6.99l3.175 3.175a6 6 0 1 0 8.465 8.465m-1.419-1.42a4 4 0 1 1-5.627-5.627zm-3.553-8.504l2.633 2.634c.464.303.86.7 1.164 1.163l2.634 2.634q.015-.222.016-.447a6 6 0 0 0-6.447-5.984M10.59 7.053L12.135 8.6a12.2 12.2 0 0 1 3.861-.6c9.105 0 11.915 8.903 12.038 9.29c.13.43.53.71.96.71v-.01a.993.993 0 0 0 .96-1.28C29.923 16.61 26.613 6 15.995 6c-2.07 0-3.862.403-5.406 1.053"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-2.5">
                          <button
                            type="submit"
                            className="rounded-full w-full active:scale-95 duration-75 mt-2 border cursor-pointer border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 px-4 sm:px-5"
                          >
                            {loading && (
                              <svg
                                width="1.3em"
                                height="1.3em"
                                viewBox="0 0 24 24"
                              >
                                <rect
                                  width={2.8}
                                  height={12}
                                  x={1}
                                  y={6}
                                  fill="currentColor"
                                >
                                  <animate
                                    id="svgSpinnersBarsScale0"
                                    attributeName="y"
                                    begin="0;svgSpinnersBarsScale1.end-0.1s"
                                    calcMode="spline"
                                    dur="0.6s"
                                    keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
                                    values="6;1;6"
                                  ></animate>
                                  <animate
                                    attributeName="height"
                                    begin="0;svgSpinnersBarsScale1.end-0.1s"
                                    calcMode="spline"
                                    dur="0.6s"
                                    keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
                                    values="12;22;12"
                                  ></animate>
                                </rect>
                                <rect
                                  width={2.8}
                                  height={12}
                                  x={5.8}
                                  y={6}
                                  fill="currentColor"
                                >
                                  <animate
                                    attributeName="y"
                                    begin="svgSpinnersBarsScale0.begin+0.1s"
                                    calcMode="spline"
                                    dur="0.6s"
                                    keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
                                    values="6;1;6"
                                  ></animate>
                                  <animate
                                    attributeName="height"
                                    begin="svgSpinnersBarsScale0.begin+0.1s"
                                    calcMode="spline"
                                    dur="0.6s"
                                    keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
                                    values="12;22;12"
                                  ></animate>
                                </rect>
                                <rect
                                  width={2.8}
                                  height={12}
                                  x={10.6}
                                  y={6}
                                  fill="currentColor"
                                >
                                  <animate
                                    attributeName="y"
                                    begin="svgSpinnersBarsScale0.begin+0.2s"
                                    calcMode="spline"
                                    dur="0.6s"
                                    keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
                                    values="6;1;6"
                                  ></animate>
                                  <animate
                                    attributeName="height"
                                    begin="svgSpinnersBarsScale0.begin+0.2s"
                                    calcMode="spline"
                                    dur="0.6s"
                                    keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
                                    values="12;22;12"
                                  ></animate>
                                </rect>
                                <rect
                                  width={2.8}
                                  height={12}
                                  x={15.4}
                                  y={6}
                                  fill="currentColor"
                                >
                                  <animate
                                    attributeName="y"
                                    begin="svgSpinnersBarsScale0.begin+0.3s"
                                    calcMode="spline"
                                    dur="0.6s"
                                    keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
                                    values="6;1;6"
                                  ></animate>
                                  <animate
                                    attributeName="height"
                                    begin="svgSpinnersBarsScale0.begin+0.3s"
                                    calcMode="spline"
                                    dur="0.6s"
                                    keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
                                    values="12;22;12"
                                  ></animate>
                                </rect>
                                <rect
                                  width={2.8}
                                  height={12}
                                  x={20.2}
                                  y={6}
                                  fill="currentColor"
                                >
                                  <animate
                                    id="svgSpinnersBarsScale1"
                                    attributeName="y"
                                    begin="svgSpinnersBarsScale0.begin+0.4s"
                                    calcMode="spline"
                                    dur="0.6s"
                                    keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
                                    values="6;1;6"
                                  ></animate>
                                  <animate
                                    attributeName="height"
                                    begin="svgSpinnersBarsScale0.begin+0.4s"
                                    calcMode="spline"
                                    dur="0.6s"
                                    keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
                                    values="12;22;12"
                                  ></animate>
                                </rect>
                              </svg>
                            )}
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
                      <div className="space-y-5 font-comic">
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
                              className="shadow-sm h-10 rounded-full hover:scale-105 active:scale-95 duration-75"
                              type="button"
                              onClick={() => setShow(true)}
                            >
                              {lang
                                ? English.cancelButton
                                : Spanish.cancelButton}
                            </Button>

                            <button
                              onClick={createUser}
                              className="rounded-full w-full hover:scale-105 active:scale-95 duration-75 border cursor-pointer border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 px-4 sm:px-5"
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
                      href="https://instagram.com/jarcristhian"
                      target="_blank"
                      className="text-muted-foreground/70 hover:text-primary opacity-50 w-6 h-6 cursor-pointer"
                    >
                      <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12.001 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6m0-2a5 5 0 1 1 0 10a5 5 0 0 1 0-10m6.5-.25a1.25 1.25 0 0 1-2.5 0a1.25 1.25 0 0 1 2.5 0M12.001 4c-2.474 0-2.878.007-4.029.058c-.784.037-1.31.142-1.798.332a2.9 2.9 0 0 0-1.08.703a2.9 2.9 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.007 9.075 4 9.461 4 12c0 2.475.007 2.878.058 4.029c.037.783.142 1.31.331 1.797c.17.435.37.748.702 1.08c.337.336.65.537 1.08.703c.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.475 0 2.878-.007 4.029-.058c.782-.037 1.308-.142 1.797-.331a2.9 2.9 0 0 0 1.08-.703c.337-.336.538-.649.704-1.08c.19-.492.296-1.018.332-1.8c.052-1.103.058-1.49.058-4.028c0-2.474-.007-2.878-.058-4.029c-.037-.782-.143-1.31-.332-1.798a2.9 2.9 0 0 0-.703-1.08a2.9 2.9 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.926 4.006 14.54 4 12 4m0-2c2.717 0 3.056.01 4.123.06c1.064.05 1.79.217 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.047 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122s-.218 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465c-1.067.047-1.406.06-4.123.06s-3.056-.01-4.123-.06c-1.064-.05-1.789-.218-2.427-.465a4.9 4.9 0 0 1-1.772-1.153a4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.012 15.056 2 14.717 2 12s.01-3.056.06-4.122s.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.362-.415 2.427-.465C8.945 2.013 9.284 2 12.001 2"
                        ></path>
                      </svg>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href="https://x.com/cristhian_jar"
                      target="_blank"
                      className="text-muted-foreground/70 hover:text-primary opacity-50 w-6 h-6 cursor-pointer"
                    >
                      <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="m13.081 10.712l-4.786-6.71a.6.6 0 0 0-.489-.252H5.28a.6.6 0 0 0-.488.948l6.127 8.59m2.162-2.576l6.127 8.59a.6.6 0 0 1-.488.948h-2.526a.6.6 0 0 1-.489-.252l-4.786-6.71m2.162-2.576l5.842-6.962m-8.004 9.538L5.077 20.25"
                        ></path>
                      </svg>
                    </motion.a>
                  </div>
                </footer>
              </main>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default Login;
