import { DialogLanguage } from "@/app/codes/dialogLanguage";
import { GetL } from "@/app/codes/interfaces";
import { useEffect, useState } from "react";
import { DialogConfirm } from "./dialogConfirm";
import { toast, Toaster } from "sonner";
import { useSession } from "next-auth/react";
import { CodeService } from "@/app/codes/services/api";
import { motion } from "framer-motion";
import ReactDOM from "react-dom";

interface Props {
  type: number;
  languages: GetL[];
  resetType: () => void;
  getLanguages: () => void;
  setlanguageId: (id: number) => void;
}

const menuAnimation = {
  initial: { scale: [0.8, 1] },
  animate: { scale: 1 },
};

const Tooltip = ({ text, position }: any) => {
  return ReactDOM.createPortal(
    <div
      className="fixed bg-gray-800 text-white text-xs rounded py-1 px-2 z-50"
      style={{ top: position.top, left: position.left }}
    >
      {text}
    </div>,
    document.body
  );
};

export function MenuLanguages({
  type,
  languages,
  getLanguages,
  setlanguageId,
  resetType,
}: Props) {
  const [show, setShow] = useState<boolean>(false);
  const [showD, setShowD] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [form, setForm] = useState<GetL | null>();
  const [id, setId] = useState<number | undefined>(0);
  const { data: session } = useSession();
  const codeService = new CodeService();
  const [tooltip, setTooltip] = useState({
    show: false,
    text: "",
    position: { top: 0, left: 0 },
  });

  useEffect(() => {
    if (type == 0) {
      openCodeModal();
      setActive(false);
    }
    if (type == 1 || type == 2) {
      setActive(true);
    }
  }, [type]);

  const selectLanguage = (item: GetL) => {
    if (type == 1) {
      openCodeModalEdit(item);
    } else if (type == 2) {
      setId(item.id);
      openConfirm();
    } else {
      setlanguageId(item.id);
    }
    setTooltip({ ...tooltip, show: false });
  };

  const openCodeModal = () => {
    setShow(!show);
    if (show == false) {
      setForm(null);
    }
  };

  const openCodeModalEdit = (data: GetL) => {
    setForm(data);
    setShow(!show);
  };

  const getDeletConfirm = async (confirm: boolean) => {
    if (confirm) {
      const result = await codeService.deleteLanguage(id, session?.user?.token);
      if (result.status !== 500 && result.status !== 400) {
        toast.success("Delete Successfully!");
        getLanguages();
        setId(0);
      } else {
        toast.error("Error to delet..");
      }
    }
  };

  const openConfirm = () => {
    setShowD(!showD);
  };

  const hideButton = () => {
    setActive(false);
    resetType();
  };

  const handleMouseEnter = (item: any, event: any) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      show: true,
      text: item.name,
      position: { top: rect.top - 30, left: rect.left },
    });
  };
  const handleMouseLeave = () => {
    setTooltip({ show: false, text: "", position: { top: 0, left: 0 } });
  };

  return (
    <>
      <DialogLanguage
        show={show}
        languages={languages}
        onClose={() => {
          openCodeModal();
          if (type == 0) {
            resetType();
          }
        }}
        data={form}
        update={() => getLanguages()}
      />
      <motion.div
        variants={menuAnimation}
        initial="initial"
        animate="animate"
        transition={{
          duration: 0.5,
        }}
        className="flex justify-center items-center gap-2 sm:overflow-y-hidden"
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-slate-100/60 dark:bg-gray-800/20 w-full md:max-w-3xl md:w-auto h-12 px-2 rounded-md shadow-slate-700">
          <div className="flex overflow-x-scroll scrollbar dark:scrollbar-dark py-2 -mt-1 gap-1">
            {languages.map((item, index) => (
              <div
                key={index}
                onClick={() => selectLanguage(item)}
                onMouseEnter={(event) => handleMouseEnter(item, event)}
                onMouseLeave={handleMouseLeave}
                className="flex items-center group ml-1 justify-center rounded-xl bg-white shadow dark:bg-gray-800/70 min-w-10 min-h-10 select-none cursor-pointer hover:scale-105 active:-translate-y-1 duration-75"
              >
                <div dangerouslySetInnerHTML={{ __html: item.image }}></div>
              </div>
            ))}
          </div>
        </div>
        {tooltip.show && (
          <Tooltip text={tooltip.text} position={tooltip.position} />
        )}
        {active && (
          <div
            className="group flex justify-center items-center 
           active:scale-110 duration-100 w-7 h-7 rounded-md p-2
           hover:shadow bg-white dark:bg-gray-900 cursor-pointer"
            onClick={() => hideButton()}
          >
            <div className="flex items-center text-gray-500 dark:text-gray-300">
              {type == 2 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="group-hover:hidden"
                  width="1em"
                  height="1em"
                >
                  <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                    <path
                      fill="currentColor"
                      d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07L5 7H4a1 1 0 0 1 0-2zm-3.003 2H7.003l.928 13h8.138zM14 2a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"
                    ></path>
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="group-hover:hidden"
                  width="1em"
                  height="1em"
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
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden group-hover:block"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                  strokeWidth={1.5}
                  d="m7.757 16.243l8.486-8.486m0 8.486L7.757 7.757"
                ></path>
              </svg>
            </div>
          </div>
        )}
      </motion.div>
      <Toaster position="top-left" duration={1000} />
      <DialogConfirm
        show={showD}
        onClose={openConfirm}
        setConfirm={getDeletConfirm}
      />
    </>
  );
}
