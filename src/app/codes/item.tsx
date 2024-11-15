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

export default function Item({ onUpdate, languageId, text, onOpen }: Props) {
  const [code, setCodes] = useState<Get[]>([]);
  const codeService = new CodeService();
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
  const [id, setId] = useState<number | undefined>(0);

  const getCodes = async () => {
    const result = await codeService.getCodes(session?.user?.token);
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

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
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
          <div className="flex flex-col items-start gap-2 p-3 shadow rounded-lg dark:bg-stone-950/30  dark:shadow-gray-600/30 text-left text-sm transition-all hover:scale-105 duration-150">
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
                    <div className="flex items-center justify-center rounded-sm hover:bg-white hover:shadow dark:hover:bg-gray-800/70 w-5 h-4 select-none cursor-pointer hover:scale-105 active:scale-95 duration-75">
                      <div className="w-5 h-5 text-muted-foreground">
                        <svg viewBox="0 0 24 24">
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
                        <svg viewBox="0 0 24 24">
                          <g fill="none">
                            <path
                              d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648zM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5z"
                              fill="currentColor"
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
                      <div className="w-3.5 h-3.5 opacity-70">
                        <svg viewBox="0 0 16 16">
                          <g fill="none">
                            <path
                              d="M7.318 13.031c.122-.488.375-.934.73-1.29l4.288-4.287a1.56 1.56 0 1 1 2.207 2.207l-4.288 4.287a2.776 2.776 0 0 1-1.29.73l-1.21.303a.61.61 0 0 1-.74-.739l.303-1.21zM13.998 5v-.5A2.5 2.5 0 0 0 11.498 2H4.5A2.5 2.5 0 0 0 2 4.5V5h11.998zm-1 1.036V6H2v5.5a2.5 2.5 0 0 0 2.5 2.499h1.546l.302-1.21c.166-.663.51-1.27.994-1.754l4.287-4.287A2.549 2.549 0 0 1 13 6.035z"
                              fill="currentColor"
                            ></path>
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
                <Codev
                  code={item.content}
                  lang={item.extention}
                  themes={item.themes}
                />
                <div
                  className="absolute top-2 right-2 opacity-100 md:opacity-0 group-hover:opacity-100"
                  onClick={() => copyToClipboard(item.content)}
                >
                  <div className="flex items-center justify-center rounded-sm bg-white shadow dark:bg-gray-800 w-7 h-7 select-none cursor-pointer hover:scale-105 active:scale-95 duration-75">
                    <div className="w-4 h-4 text-slate-600 dark:text-slate-200">
                      <svg viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M11.223 4.75a.973.973 0 0 0-.973.973v1.465h3.5V5.723a.973.973 0 0 0-.973-.973zm3.911.223H16a2.75 2.75 0 0 1 2.75 2.75V18A2.75 2.75 0 0 1 16 20.75H8A2.75 2.75 0 0 1 5.25 18V7.723A2.75 2.75 0 0 1 8 4.973h.866a2.47 2.47 0 0 1 2.357-1.723h1.554c1.104 0 2.04.724 2.357 1.723m.116 1.5v1.365c0 .47-.38.85-.85.85H9.6a.85.85 0 0 1-.85-.85V6.473H8c-.69 0-1.25.56-1.25 1.25V18c0 .69.56 1.25 1.25 1.25h8c.69 0 1.25-.56 1.25-1.25V7.723c0-.69-.56-1.25-1.25-1.25z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
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
//  hover:bg-accent/70"
// font-[family-name:var(--font-geist-mono)]
// dark:hover:[background:linear-gradient(45deg,#0D0F15,#0D0F15)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.white)_100%)_border-box]
//                               dark:hover:border-transparent animate-border"
