"use client";
import { Codev } from "@/components/me/codev";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CodeService } from "./services/api";
import { Get } from "./interfaces";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogConfirm } from "@/components/me/dialogConfirm";

interface Props {
  onUpdate: number;
  languageId: number;
  text: string;
  onOpen: (data: Get) => void;
}

const itemVariants = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const codeAnimation = {
  initial: { scale: [0.8, 1] },
  animate: { scale: 1 },
};

export default function Item({ onUpdate, languageId, text, onOpen }: Props) {
  const [code, setCodes] = useState<Get[]>([]);
  const codeService = new CodeService();
  const { data: session } = useSession();
  const [show, setShow] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [copyId, setCopyId] = useState<number | null>(null);

  const getCodes = async () => {
    const result = await codeService.getCodes(session?.user?.token);
    setTimeout(() => {
      setLoading(false);
    }, 250);
    // console.log(result);
    setCodes(result);
  };

  const searchCode = async (value: string | number, type: number) => {
    const result = await codeService.searchCode(
      value,
      type,
      session?.user?.token
    );
    // console.log(result);
    setCodes(result);
  };

  useEffect(() => {
    setCodes([]);
    if (session) {
      getCodes();
    }
  }, [session, onUpdate]);

  useEffect(() => {
    if (languageId != 0) {
      searchCode(languageId, 1);
    }
  }, [languageId]);

  useEffect(() => {
    if (text != " ") {
      searchCode(text, 2);
    }
  }, [text]);

  const copyToClipboard = async (text: string, i: number) => {
    setCopyId(i);
    await navigator.clipboard.writeText(text);
    setTimeout(() => {
      setCopyId(null);
    }, 650);
  };

  const setData = (item: Get) => {
    onOpen(item);
  };

  const openConfirm = () => {
    setShow(!show);
  };

  const getDeletConfirm = async (confirm: boolean) => {
    if (confirm) {
      const result = await codeService.deleteCode(id, session?.user?.token);
      if (result.status !== 500 && result.status !== 400) {
        toast.success("Delete Successfully!");
        await getCodes();
        setId(0);
      } else {
        toast.error("Error to delet..");
      }
    }
  };

  return (
    <>
      {code.map((item, i) => (
        <motion.div
          variants={itemVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.1, delay: i > 3 ? i * 0.1 : 2 * 0.1 }}
          key={i}
        >
          <div className="flex flex-col items-start gap-2 p-3 shadow rounded-lg dark:bg-stone-950/30  dark:shadow-gray-600/30 text-left text-sm transition-all hover:-translate-y-2 duration-100">
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-medium line-clamp-1 select-none">
                    {item.title}
                  </div>
                </div>
                <div className="ml-auto text-[10.5px] text-muted-foreground font-sans line-clamp-1 select-none">
                  {item.createdAtTime}
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between group">
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.description}
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-center rounded-sm hover:scale-125 w-5 h-4 select-none cursor-pointer active:scale-95 duration-75">
                      <div className="w-5 h-5 text-muted-foreground">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g fill="none">
                            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                            <path
                              fill="currentColor"
                              d="M5 10a2 2 0 1 1 0 4a2 2 0 0 1 0-4m7 0a2 2 0 1 1 0 4a2 2 0 0 1 0-4m7 0a2 2 0 1 1 0 4a2 2 0 0 1 0-4"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="min-w-[100px]"
                    align="end"
                    side="top"
                    sideOffset={4}
                    alignOffset={-5}
                  >
                    <DropdownMenuItem
                      className="cursor-pointer text-sm"
                      onClick={() => {
                        openConfirm(), setId(item.id);
                      }}
                    >
                      <div className="w-3.5 h-3.5 opacity-70">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g fill="none">
                            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                            <path
                              fill="currentColor"
                              d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07L5 7H4a1 1 0 0 1 0-2zm-3.003 2H7.003l.928 13h8.138zM14 2a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <span className="text-xs ml-1">Delete</span>
                    </DropdownMenuItem>
                    <hr className="my-1" />
                    <DropdownMenuItem
                      className="cursor-pointer text-sm"
                      onClick={() => setData(item)}
                    >
                      <div className="w-3 h-3 opacity-70">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g className="edit-outline">
                            <g
                              fill="currentColor"
                              fillRule="evenodd"
                              className="Vector"
                              clipRule="evenodd"
                            >
                              <path d="M2 6.857A4.857 4.857 0 0 1 6.857 2H12a1 1 0 1 1 0 2H6.857A2.857 2.857 0 0 0 4 6.857v10.286A2.857 2.857 0 0 0 6.857 20h10.286A2.857 2.857 0 0 0 20 17.143V12a1 1 0 1 1 2 0v5.143A4.857 4.857 0 0 1 17.143 22H6.857A4.857 4.857 0 0 1 2 17.143z"></path>
                              <path d="m15.137 13.219l-2.205 1.33l-1.033-1.713l2.205-1.33l.003-.002a1.2 1.2 0 0 0 .232-.182l5.01-5.036a3 3 0 0 0 .145-.157c.331-.386.821-1.15.228-1.746c-.501-.504-1.219-.028-1.684.381a6 6 0 0 0-.36.345l-.034.034l-4.94 4.965a1.2 1.2 0 0 0-.27.41l-.824 2.073a.2.2 0 0 0 .29.245l1.032 1.713c-1.805 1.088-3.96-.74-3.18-2.698l.825-2.072a3.2 3.2 0 0 1 .71-1.081l4.939-4.966l.029-.029c.147-.15.641-.656 1.24-1.02c.327-.197.849-.458 1.494-.508c.74-.059 1.53.174 2.15.797a2.9 2.9 0 0 1 .845 1.75a3.15 3.15 0 0 1-.23 1.517c-.29.717-.774 1.244-.987 1.457l-5.01 5.036q-.28.281-.62.487m4.453-7.126s-.004.003-.013.006z"></path>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <span className="text-xs ml-1">Edit</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid grid-cols-1 w-full ">
              <div className="relative group">
                <div className="h-44 bg-[#f5f7fa] dark:bg-[#0e0f1a]">
                  {!loading && (
                    <motion.div
                      variants={codeAnimation}
                      initial="initial"
                      animate="animate"
                      transition={{
                        duration: 0.5,
                      }}
                    >
                      <Codev
                        code={item.content}
                        lang={item.extention}
                        themes={item.themes}
                      />
                    </motion.div>
                  )}
                </div>
                <div
                  className="absolute top-2 right-2 opacity-100 md:opacity-0 group-hover:opacity-100"
                  onClick={() => copyToClipboard(item.content, i)}
                >
                  <div className="flex items-center justify-center rounded-sm bg-white shadow dark:bg-gray-800 w-7 h-7 select-none cursor-pointer hover:scale-105 active:scale-95 duration-75">
                    <div className="w-4 h-4 text-slate-600 dark:text-slate-200">
                      {copyId === i ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M11.223 4.75a.973.973 0 0 0-.973.973v1.465h3.5V5.723a.973.973 0 0 0-.973-.973zm3.911.223H16a2.75 2.75 0 0 1 2.75 2.75V18A2.75 2.75 0 0 1 16 20.75H8A2.75 2.75 0 0 1 5.25 18V7.723A2.75 2.75 0 0 1 8 4.973h.866a2.47 2.47 0 0 1 2.357-1.723h1.554c1.104 0 2.04.724 2.357 1.723m.116 1.5v1.365c0 .47-.38.85-.85.85H9.6a.85.85 0 0 1-.85-.85V6.473H8c-.69 0-1.25.56-1.25 1.25V18c0 .69.56 1.25 1.25 1.25h8c.69 0 1.25-.56 1.25-1.25V7.723c0-.69-.56-1.25-1.25-1.25z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-1 md:opacity-80 opacity-0 group-hover:md:opacity-0 text-slate-500 dark:text-foreground font-bold text-[10px]">
                  {item.short}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      <Toaster position="top-left" duration={1000} />
      <DialogConfirm
        show={show}
        onClose={openConfirm}
        setConfirm={getDeletConfirm}
      />
    </>
  );
}
