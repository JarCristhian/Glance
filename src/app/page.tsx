"use client";
import { useSession } from "next-auth/react";
import { ButtonNote } from "../components/me/buttonNote";
import { useEffect, useState } from "react";
import { DialogNote } from "./notes/dialogNote";
import { ButtonOption } from "../components/me/buttonOption";
import Notes from "./notes/notes";

export default function Home() {
  const { data: session } = useSession();
  const [note, setNote] = useState(false);
  const [update, setUpdate] = useState(0);

  const openNote = () => {
    setNote(!note);
  };

  return (
    <>
      <ButtonNote type={true} onOpen={openNote} />
      <DialogNote
        show={note}
        onClose={openNote}
        setNote={() => setUpdate(update == 2 ? 0 : 2)}
      />
      {session && (
        <ButtonOption
          onAllNotes={() => setUpdate(0)}
          onMyNotes={() => setUpdate(1)}
        />
      )}
      <div className="h-screen w-full p-4 font-[family-name:var(--font-geist-sans)]">
        <main className="items-center p-2 pt-14 md:p-16">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 ">
            <Notes onUpdate={update} />
          </div>
        </main>
      </div>
    </>
  );
}
