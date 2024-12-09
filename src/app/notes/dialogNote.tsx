import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { toast, Toaster } from "sonner";
import { NotesService } from "./services/api";
import { Store, Props, Tags } from "./interfaces";
import { useSession } from "next-auth/react";
import { TextAnimation } from "../../components/me/textAniamtion";
import { Languages } from "../api/config";
import { socket } from "../api/socket/socket";

export function DialogNote({ show, onClose, setNote }: Props) {
  const languages = new Languages();
  const { English, Spanish, language } = languages;
  const notesService = new NotesService();
  const [tag, setTag] = useState<Tags>({
    name: "",
    color: "bg-teal-200 text-gray-950",
  });
  const [form, setForm] = useState<Store>({
    title: "",
    description: "",
    tags: [],
  });
  const [active, setActive] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { data: session } = useSession();

  const addTags = (dto: Tags) => {
    if (tag.name.trim().length == 0)
      return toast.info(language ? "Write something.." : "Escribe algo..");
    setTag({ ...tag, name: "" });
    setForm({ ...form, tags: [...form.tags, dto] });
    setError("");
  };

  const deleteTag = (index: number) => {
    setForm({ ...form, tags: form.tags.filter((_, i) => i !== index) });
    if (form.tags.length == 1) setError("Tags");
  };

  const activeAnimation = () => {
    setActive(!active);
    setTimeout(() => {
      setActive(false);
      onClose();
    }, 500);
  };

  const clearNote = () => {
    localStorage.setItem("downloader", "false");
    activeAnimation();
    setNote();
    setForm({ title: "", description: "", tags: [] });
    setTag({ ...tag, name: "" });
    setError("");
  };

  const saveNote = async () => {
    if (form.title.trim().length == 0)
      return (
        setError("Title"),
        toast.info(language ? English.errorTitle : Spanish.errorTitle)
      );
    if (form.description.trim().length == 0)
      return (
        setError("Description"),
        toast.info(
          language ? English.errorDescription : Spanish.errorDescription
        )
      );
    if (form.tags.length == 0)
      return (
        setError("Tags"),
        toast.info(language ? English.errorTags : Spanish.errorTags)
      );
    try {
      const result = !session
        ? await notesService.postNotes(form)
        : await notesService.postMyNotes(form, session?.user?.token);
      if (result.status !== 500) {
        toast.success(language ? English.noteSaved : Spanish.noteSaved);
        setMessage();
        clearNote();
      } else {
        toast.error(language ? English.noteNotSaved : Spanish.noteNotSaved);
      }
    } catch (error) {
      toast.error(language ? English.noteNotSaved : Spanish.noteNotSaved);
    }
  };

  const setMessage = () => {
    socket.emit("messageNotMe", !session ? "User" : session.user.user.name);
  };

  return (
    <>
      <Toaster position="top-left" duration={1000} />
      <Dialog open={show} onOpenChange={onClose}>
        <DialogContent
          className="sm:max-w-[385px] font-comic"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="opacity-90 w-10 h-10 p-1 hover:animate-spin">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g fill="none">
                    <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                    <path
                      fill="currentColor"
                      d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"
                    ></path>
                  </g>
                </svg>
              </div>
              <div>
                <DialogTitle>
                  {language ? English.headerTitle : Spanish.headerTitle}
                </DialogTitle>
                <DialogDescription>
                  <TextAnimation
                    text={
                      language
                        ? English.headerDescription
                        : Spanish.headerDescription
                    }
                  />
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <form>
            <div className="grid gap-3 space-y-1 py-4 -mt-3 sm:-mx-2">
              <div className="space-y-1.5">
                <Label className={error == "Title" ? "text-amber-400" : ""}>
                  {language ? English.title : Spanish.title}
                </Label>
                <Input
                  value={form.title}
                  onChange={(e) => {
                    setForm({ ...form, title: e.target.value }), setError("");
                  }}
                  autoComplete="off"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  className={error == "Description" ? "text-amber-400" : ""}
                >
                  {language ? English.description : Spanish.description}
                </Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => {
                    setForm({ ...form, description: e.target.value }),
                      setError("");
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <Label className={error == "Tags" ? "text-amber-400" : ""}>
                  {language ? English.tags : Spanish.tags}
                </Label>
                <div className="flex w-full justify-between space-x-2 mb-1">
                  <div className="relative w-[90%]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <span
                          className={
                            "absolute left-2 top-2 h-5 w-5 rounded-full cursor-pointer " +
                            tag.color
                          }
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-12">
                        <DropdownMenuGroup className="cursor-pointer">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              Default
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-white text-gray-950",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-white" />
                                  White
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-gray-200 text-gray-950",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-gray-200 " />
                                  Gray
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-gray-700 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-gray-700" />
                                  DarkGray
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-gray-950 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-gray-950" />
                                  Black
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              Calid
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-amber-200 text-gray-950",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-amber-200 " />
                                  Amber
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-yellow-400 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                                  Yellow
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-orange-400 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-orange-400" />
                                  Orange
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-red-500 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-red-500" />
                                  Red
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              Peace
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-teal-200 text-gray-950",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-teal-200 " />
                                  Teal
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-emerald-400 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                  Emerald
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-green-500 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-green-500" />
                                  Green
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-lime-500 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-lime-500" />
                                  Lime
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              Colds
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-cyan-300 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-cyan-300 " />
                                  Cyan
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-sky-500 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                                  Sky
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-blue-600 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                                  Blue
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-indigo-800 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-indigo-800" />
                                  Indigo
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              Roses
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-violet-400 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-violet-400 " />
                                  Violet
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-purple-600 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-purple-600" />
                                  Purple
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-fuchsia-400 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
                                  Fuchsia
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    setTag({
                                      ...tag,
                                      color: "bg-pink-400 text-white",
                                    })
                                  }
                                >
                                  <span className="h-2 w-2 rounded-full bg-pink-400" />
                                  Pink
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Input
                      autoComplete="off"
                      className="pl-8"
                      value={tag.name}
                      onChange={(e) => setTag({ ...tag, name: e.target.value })}
                    />
                  </div>

                  <div
                    onClick={() => addTags(tag)}
                    className="flex select-none cursor-pointer justify-center items-center active:scale-90 duration-200 w-9 h-9 rounded-md p-2
                                                    drop-shadow-md hover:shadow-xl bg-white dark:bg-gray-900/70 dark:border dark:text-white"
                  >
                    <svg
                      className="text-gray-700 dark:text-white flex-no-shrink fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <g fill="none">
                        <path
                          fill="currentColor"
                          d="M15.499 7a2.5 2.5 0 0 1 2.495 2.335l.005.164v.757a5.513 5.513 0 0 0-1-.657v-.1a1.5 1.5 0 0 0-1.356-1.493l-.144-.007h-6a1.5 1.5 0 0 0-1.493 1.356l-.007.144v6a1.5 1.5 0 0 0 1.356 1.493l.144.007h.1c.183.358.404.693.657 1H9.5a2.5 2.5 0 0 1-2.495-2.336L7 15.5v-6a2.5 2.5 0 0 1 2.336-2.495L9.499 7h6zM12.66 3.693l.048.158l.575 2.147h-1.036l-.505-1.889a1.5 1.5 0 0 0-1.696-1.091l-.141.03L4.11 4.604A1.5 1.5 0 0 0 3.02 6.298l.03.142l1.554 5.795a1.5 1.5 0 0 0 1.396 1.111v1a2.502 2.502 0 0 1-2.31-1.682l-.052-.17l-1.553-5.795a2.5 2.5 0 0 1 1.61-3.015l.158-.047l5.795-1.553a2.5 2.5 0 0 1 2.957 1.458l.057.152zM18.999 14.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0zm-4-2a.5.5 0 0 0-1 0V14h-1.5a.5.5 0 1 0 0 1H14v1.5a.5.5 0 1 0 1 0V15h1.5a.5.5 0 1 0 0-1H15v-1.5z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-1 select-none">
                  <div className="max-w-full -mb-4">
                    <div className="overflow-x-scroll scrollbar dark:scrollbar-dark py-1 flex gap-2">
                      {form.tags.map((item, i) => (
                        <div
                          key={i}
                          className={item.color + " flex-none px-4 rounded-md"}
                        >
                          <div className="flex items-center select-none">
                            <span className="text-sm font-medium -ml-1">
                              {item.name}
                            </span>
                            <span
                              className="w-4 h-4 ml-1 -mr-2 cursor-pointer"
                              onClick={() => deleteTag(i)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                              >
                                <path
                                  d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      ))}
                      {tag.name !== "" && (
                        <span
                          className={
                            tag.color +
                            " flex-none select-non align-start items-center px-4 text-sm font-medium rounded-md"
                          }
                        >
                          {tag.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <DialogFooter className="flex space-x-2 mt-6">
              <Button
                variant="ghost"
                className="shadow-sm select-none rounded-full"
                type="button"
                onClick={onClose}
              >
                {language ? English.cancelButton : Spanish.cancelButton}
              </Button>
              <Button
                className="select-none hover:scale-105 duration-1000 active:scale-100 rounded-full"
                disabled={active}
                type="button"
                onClick={saveNote}
              >
                {active && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <defs>
                      <filter id="svgSpinnersGooeyBalls20">
                        <feGaussianBlur
                          in="SourceGraphic"
                          result="y"
                          stdDeviation={1}
                        ></feGaussianBlur>
                        <feColorMatrix
                          in="y"
                          result="z"
                          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
                        ></feColorMatrix>
                        <feBlend in="SourceGraphic" in2="z"></feBlend>
                      </filter>
                    </defs>
                    <g filter="url(#svgSpinnersGooeyBalls20)">
                      <circle cx={5} cy={12} r={4} fill="currentColor">
                        <animate
                          attributeName="cx"
                          calcMode="spline"
                          dur="2s"
                          keySplines=".36,.62,.43,.99;.79,0,.58,.57"
                          repeatCount="indefinite"
                          values="5;8;5"
                        ></animate>
                      </circle>
                      <circle cx={19} cy={12} r={4} fill="currentColor">
                        <animate
                          attributeName="cx"
                          calcMode="spline"
                          dur="2s"
                          keySplines=".36,.62,.43,.99;.79,0,.58,.57"
                          repeatCount="indefinite"
                          values="19;16;19"
                        ></animate>
                      </circle>
                      <animateTransform
                        attributeName="transform"
                        dur="0.75s"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 12 12;360 12 12"
                      ></animateTransform>
                    </g>
                  </svg>
                )}
                <span className="ml-1">
                  {language ? English.saveButton : Spanish.saveButton}
                </span>
              </Button>
            </DialogFooter>
            {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
