"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Item from "./item";
import { InputSearch } from "@/components/me/inputSearch";
import { ButtonNote } from "@/components/me/buttonNote";
import { MenuLanguages } from "@/components/me/menuLanguages";
import { DialogCode } from "./dialogCode";
import { CodeService } from "./services/api";
import { GetL, Get } from "./interfaces";

export default function MyCode() {
  const [show, setShow] = useState<boolean>(false);
  const [type, setType] = useState<number>(3);
  const [update, setUpdate] = useState<number>(0);
  const [idL, setIdL] = useState<number>(0);
  const [text, setText] = useState<string>(" ");
  const [languages, setLanguages] = useState<GetL[]>([]);
  const [form, setForm] = useState<Get | null>();
  const codeService = new CodeService();
  const { data: session } = useSession();

  const getLanguages = async () => {
    const result = await codeService.getLanguages(session?.user?.token);
    // console.log(result);
    setLanguages(result);
  };

  useEffect(() => {
    if (session) {
      getLanguages();
    }
  }, [session]);

  const openCodeModal = () => {
    setShow(!show);
    if (show == false) {
      setForm(null);
    }
  };

  const openCodeModalEdit = (data: Get) => {
    setForm(data);
    setShow(!show);
  };

  const getShow = (type: number) => {
    setType(type);
  };

  return (
    <>
      <DialogCode
        show={show}
        languages={languages}
        onClose={openCodeModal}
        data={form}
        update={() => setUpdate(update == 2 ? 0 : 2)}
      />
      <ButtonNote type={false} onOpen={openCodeModal} />
      <div className="h-screen w-full p-4 font-[family-name:var(--font-geist-sans)]">
        <main className="items-center p-2 pt-11">
          <InputSearch setValue={setText} setShow={getShow} />
          <MenuLanguages
            type={type}
            languages={languages}
            resetType={() => setType(3)}
            getLanguages={() => getLanguages()}
            setlanguageId={setIdL}
          />

          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-7">
            <Item
              onUpdate={update}
              languageId={idL}
              text={text}
              onOpen={openCodeModalEdit}
            />
          </div>
        </main>
      </div>
    </>
  );
}
// font-[family-name:var(--font-geist-mono)]
