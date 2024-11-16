"use client";
import { NotesService } from "./services/api";
import { useEffect, useState } from "react";
import { Get } from "./interfaces";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { socket } from "../api/socket/socket";
import { toast, Toaster } from "sonner";
import { Languages } from "../api/config";

interface Props {
  onUpdate: number;
}

const itemVariants = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export default function Notes({ onUpdate }: Props) {
  const { data: session } = useSession();
  const notesService = new NotesService();
  const [notes, setNotes] = useState<Get[]>([]);
  const languages = new Languages();
  const { language } = languages;

  const getNotes = async () => {
    const result = await notesService.getNotes();
    setNotes(result);
  };

  const getMyNotes = async () => {
    const result = await notesService.getMyNotes(session?.user?.token);
    setNotes(result);
  };

  const setLovedNote = async (id: number) => {
    if (session && session.user.user.role === "admin") {
      const result = await notesService.postLovedNotes(
        id,
        session?.user?.token
      );
      if (result.ok) {
        const updatedNotes = notes.map((note) =>
          note.id === id ? { ...note, loved: !note.loved } : note
        );
        setNotes(updatedNotes);
      }
    }
  };

  useEffect(() => {
    setNotes([]);
    if (onUpdate == 1) {
      getMyNotes();
    } else {
      getNotes();
    }
  }, [onUpdate]);

  useEffect(() => {
    socket.on("messageServerNotMe", (message) => {
      let text: string = "";

      if (language) {
        text =
          message == "User"
            ? "Something User add one Note."
            : message + " add one Note";
      } else {
        text =
          message == "User"
            ? "Un Usuario agrego una Nota."
            : message + " creo una Nota.";
      }
      toast.success(text);
      getNotes();
    });

    return () => {
      socket.off("messageServerNotMe");
    };
  }, []);

  return (
    <>
      {notes.map((item, i) => (
        <motion.div
          variants={itemVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.1, delay: i > 3 ? i * 0.1 : 2 * 0.1 }}
          key={i}
          onDoubleClick={() => setLovedNote(item.id)}
        >
          <div
            className="flex flex-col items-start gap-2 p-3 shadow dark:border rounded-lg cursor-pointer text-left text-sm transition-all hover:bg-accent/70 
                              hover:scale-105 dark:hover:[background:linear-gradient(45deg,#0D0F15,#0D0F15)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.white)_100%)_border-box]
                              dark:hover:border-transparent animate-border"
          >
            <div className="flex w-full flex-col gap-1 font-comic">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold line-clamp-1 select-none">
                    {item.author}
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="ml-auto text-[10.5px] text-muted-foreground line-clamp-1 select-none">
                    {item.createdAtTime}
                  </div>
                  {item.loved && (
                    <div className="opacity-50">
                      <svg width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          fillOpacity={0}
                          d="M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9c0 0 -7.43 -7.79 -8.24 -9c-0.48 -0.71 -0.76 -1.57 -0.76 -2.5c0 -2.49 2.01 -4.5 4.5 -4.5c1.56 0 2.87 0.84 3.74 2c0.76 1 0.76 1 0.76 1Z"
                        >
                          <animate
                            fill="freeze"
                            attributeName="fill-opacity"
                            begin="0.7s"
                            dur="0.5s"
                            values="0;1"
                          ></animate>
                        </path>
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray={32}
                          strokeDashoffset={32}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c0 0 0 0 -0.76 -1c-0.88 -1.16 -2.18 -2 -3.74 -2c-2.49 0 -4.5 2.01 -4.5 4.5c0 0.93 0.28 1.79 0.76 2.5c0.81 1.21 8.24 9 8.24 9M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            dur="0.7s"
                            values="32;0"
                          ></animate>
                        </path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xs font-medium">{item.title}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.description}
            </div>

            <div className="max-w-full">
              <div className="overflow-x-scroll scrollbar dark:scrollbar-dark gap-2 py-1">
                <div className="flex items-center gap-2 select-none">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={
                        tag.color +
                        " flex-none select-non align-start items-center px-4 text-xs font-comic rounded-md"
                      }
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      <Toaster position="top-left" duration={1000} />
    </>
  );
}
