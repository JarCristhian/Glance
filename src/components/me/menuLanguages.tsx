import { DialogLanguage } from "@/app/codes/dialogLanguage";
import { GetL } from "@/app/codes/interfaces";
import { useEffect, useState } from "react";
import { DialogConfirm } from "./dialogConfirm";
import { toast, Toaster } from "sonner";
import { useSession } from "next-auth/react";
import { CodeService } from "@/app/codes/services/api";
import ReactDOM from "react-dom";

interface Props {
  type: number;
  languages: GetL[];
  resetType: () => void;
  getLanguages: () => void;
  setlanguageId: (id: number) => void;
}

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
      <div
        className="flex justify-center items-center gap-2"
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
                  className="group-hover:hidden"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5"
                    color="currentColor"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:hidden"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    color="currentColor"
                  >
                    <path d="m16.214 4.982l1.402-1.401a1.982 1.982 0 0 1 2.803 2.803l-1.401 1.402m-2.804-2.804l-5.234 5.234c-1.045 1.046-1.568 1.568-1.924 2.205S8.342 14.561 8 16c1.438-.342 2.942-.7 3.579-1.056s1.16-.879 2.205-1.924l5.234-5.234m-2.804-2.804l2.804 2.804"></path>
                    <path d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3"></path>
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
      </div>
      <Toaster position="top-left" duration={1000} />
      <DialogConfirm
        show={showD}
        onClose={openConfirm}
        setConfirm={getDeletConfirm}
      />
    </>
  );
}
