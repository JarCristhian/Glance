import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { NotesService } from "../../app/notes/services/api";
import { Languages } from "../../app/api/config";
import Image from "next/image";
import picachu from "../../../src/app/img/picachu.jpg";
import ania from "../../../src/app/img/ania.jpg";
import men from "../../../src/app/img/men.jpg";
import women from "../../../src/app/img/women.jpg";
import girl from "../../../src/app/img/girl.jpg";
import cat from "../../../src/app/img/cat.jpg";
import luffysky from "../../../src/app/img/luffysky.jpg";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

interface Props {
  show: boolean;
  onClose: () => void;
  setUpdate: (value: number) => void;
}

interface Form {
  name: string;
  image: string | undefined;
}

export function DialogProfile({ show, onClose, setUpdate }: Props) {
  const notesService = new NotesService();
  const [active, setActive] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(true);
  const languages = new Languages();
  const { language } = languages;
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { data: session } = useSession();
  const [form, setForm] = useState<Form>({
    name: session ? session.user.user.name : "",
    image: session?.user?.user?.image,
  });

  const activeAnimation = () => {
    setActive(!active);
    setTimeout(() => {
      setActive(false);
    }, 500);
  };

  const changeImage = (value: string) => {
    setForm({ ...form, image: value });
  };

  const updatedSession = async () => {
    const refresh = await signIn("credentials", {
      email: session?.user?.user?.email,
      password,
      redirect: false,
    });
    if (!refresh?.ok) {
      setUpdate(0);
    } else {
      setUpdate(1);
    }
  };

  const updateProfile = async () => {
    if (form.name.trim().length == 0) return setError("Name");
    activeAnimation();
    const result = await notesService.updateProfile(
      session?.user?.user.id,
      form,
      session?.user?.token
    );
    if (result.ok) {
      setEdit(true);
      updatedSession();
      onClose();
    }
  };
  return (
    <>
      <Dialog open={show} onOpenChange={onClose}>
        <DialogContent
          className="sm:max-w-[450px]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="opacity-70 w-8 h-8 p-1 flex items-center">
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3 3 0 0 1-3 3m9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
                  ></path>
                </svg>
              </div>
              <div className="grid">
                <DialogTitle className="text-[17px]">
                  {language ? "Profile" : "Perfil"}
                </DialogTitle>
                <DialogDescription className="text-[13.5px] -mt-1">
                  {language ? "Edit your data." : "Editas tus datos."}
                </DialogDescription>
              </div>
            </div>
            <div>
              <div className="my-4">
                <div className="flex items-center gap-2">
                  <Label className={error == "Name" ? "text-amber-400" : ""}>
                    {language ? "Name" : "Nombre"}
                  </Label>
                  <Input
                    disabled={edit}
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value }), setError("");
                    }}
                    autoComplete="off"
                  />
                  <div
                    className="group flex justify-center items-center 
                active:scale-110 duration-100 w-9 h-9 rounded-md p-2
                shadow bg-white dark:bg-gray-800/20 cursor-pointer"
                    onClick={(e) => {
                      setForm({
                        ...form,
                        name: session ? session.user.user.name : "",
                      }),
                        setEdit(!edit);
                    }}
                  >
                    <div className="flex items-center w-10 h-10 text-gray-500 dark:text-gray-300">
                      {edit ? (
                        <svg viewBox="0 0 24 24">
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                          >
                            <path d="M9.533 11.15A1.82 1.82 0 0 0 9 12.438V15h2.578c.483 0 .947-.192 1.289-.534l7.6-7.604a1.82 1.82 0 0 0 0-2.577l-.751-.751a1.82 1.82 0 0 0-2.578 0z"></path>
                            <path d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3"></path>
                          </g>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 48 48">
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M44 24c0 11.046-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4s20 8.954 20 20m-7.272 12.728A17.94 17.94 0 0 1 24 42c-9.941 0-18-8.059-18-18c0-4.97 2.015-9.47 5.272-12.728zm1.336-1.492l-25.3-25.3A17.92 17.92 0 0 1 24 6c9.941 0 18 8.059 18 18c0 4.25-1.473 8.156-3.936 11.236"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <Label>{language ? "Image" : "Imagen"}</Label>
                  <div className="flex gap-3 mt-2">
                    <Image
                      onClick={() => changeImage("men")}
                      className={
                        "w-10 h-10 rounded mt-1 cursor-pointer " +
                        (form.image === "men"
                          ? "border-[3px] border-primary darK:border-white"
                          : "")
                      }
                      src={men}
                      alt=""
                      unoptimized={true}
                      priority={true}
                    />

                    <Image
                      onClick={() => changeImage("women")}
                      className={
                        "w-10 h-10 rounded mt-1 cursor-pointer " +
                        (form.image === "women"
                          ? "border-[3px] border-primary darK:border-white"
                          : "")
                      }
                      src={women}
                      alt=""
                      unoptimized={true}
                      priority={true}
                    />
                    <Image
                      onClick={() => changeImage("luffysky")}
                      className={
                        "w-10 h-10 rounded mt-1 cursor-pointer " +
                        (form.image === "luffysky"
                          ? "border-[3px] border-primary darK:border-white"
                          : "")
                      }
                      src={luffysky}
                      alt=""
                      unoptimized={true}
                      priority={true}
                    />
                    <Image
                      onClick={() => changeImage("girl")}
                      className={
                        "w-10 h-10 rounded mt-1 cursor-pointer " +
                        (form.image === "girl"
                          ? "border-[3px] border-primary darK:border-white"
                          : "")
                      }
                      src={girl}
                      alt=""
                      unoptimized={true}
                      priority={true}
                    />

                    <Image
                      onClick={() => changeImage("ania")}
                      className={
                        "w-10 h-10 rounded mt-1 cursor-pointer " +
                        (form.image === "ania"
                          ? "border-[3px] border-primary darK:border-white"
                          : "")
                      }
                      src={ania}
                      alt=""
                      unoptimized={true}
                      priority={true}
                    />
                    <Image
                      onClick={() => changeImage("cat")}
                      className={
                        "w-10 h-10 rounded mt-1 cursor-pointer " +
                        (form.image === "cat"
                          ? "border-[3px] border-primary darK:border-white"
                          : "")
                      }
                      src={cat}
                      alt=""
                      unoptimized={true}
                      priority={true}
                    />

                    <Image
                      onClick={() => changeImage("")}
                      className={
                        "w-10 h-10 rounded mt-1 cursor-pointer " +
                        (form.image === ""
                          ? "border-[3px] border-primary darK:border-white"
                          : "")
                      }
                      src={picachu}
                      alt=""
                      unoptimized={true}
                      priority={true}
                    />
                  </div>
                </div>
                <div className="relative mt-5">
                  <div className="opacity-70">
                    <svg
                      viewBox="0 0 24 24"
                      className="lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
                    >
                      <path
                        fill="currentColor"
                        d="M12 17a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m6 3V10H6v10zm0-12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
                      ></path>
                    </svg>
                  </div>
                  <Input
                    className="pl-8 rounded-lg shadow"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value), setError("");
                    }}
                    autoComplete="off"
                    placeholder={
                      language ? "Add your Password" : "Ingresa tu Contraseña"
                    }
                    type="password"
                  />
                </div>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="-mt-1 flex gap-2">
            <Button
              size={"sm"}
              variant="ghost"
              className="shadow-sm select-none rounded-full"
              type="button"
              onClick={() => onClose()}
            >
              {language ? "Cancel" : "Cancelar"}
            </Button>
            <Button
              size={"sm"}
              className="select-none active:scale-95 rounded-full"
              disabled={password == "" ? true : false}
              type="button"
              onClick={() => updateProfile()}
            >
              {active && (
                <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                    opacity={0.5}
                  ></path>
                  <path
                    fill="currentColor"
                    d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
                  >
                    <animateTransform
                      attributeName="transform"
                      dur="1s"
                      from="0 12 12"
                      repeatCount="indefinite"
                      to="360 12 12"
                      type="rotate"
                    ></animateTransform>
                  </path>
                </svg>
              )}
              <span className="ml-1  rounded-full">
                {language ? "Update Profile" : "Actualizar Perfil"}
              </span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
