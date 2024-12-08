import { useState } from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  setValue: (text: string) => void;
  setShow: (type: number) => void;
}
export function InputSearch({ setValue, setShow }: Props) {
  const [text, setText] = useState<string>("");

  const setEnter = (e: any) => {
    if (e.key === "Enter") {
      setValue(text);
    }
  };

  return (
    <div className="flex mb-4 justify-center gap-2">
      <div className="relative hover:scale-105 duration-100">
        <div className="opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
        <Input
          className="pl-8 rounded-lg shadow"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyDown={setEnter}
          placeholder="Search.."
          autoComplete="off"
        />
      </div>
      <div className="cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="group flex justify-center items-center 
                active:scale-110 duration-100 w-9 h-9 rounded-md p-2
                shadow hover:shadow-lg bg-white dark:bg-gray-800/20"
            >
              <div className="flex items-center w-10 h-10 text-gray-500 dark:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 12h16m0-5H7.003c-1.821 0-2.732 0-2.958-.617c-.227-.618.417-1.344 1.705-2.797L6.269 3M4 17h12.997c1.821 0 2.732 0 2.958.617c.227.618-.417 1.344-1.705 2.797l-.519.586"
                    color="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-[120px]"
            align="end"
            side="bottom"
            sideOffset={4}
            alignOffset={-5}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer text-sm"
                onClick={() => setShow(0)}
              >
                <div className="w-3.5 h-3.5 opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={16}
                    >
                      <circle cx={128} cy={128} r={112}></circle>
                      <path d="M 79.999992,128 H 176.0001"></path>
                      <path d="m 128.00004,79.99995 v 96.0001"></path>
                    </g>
                  </svg>
                </div>
                <span className="text-xs ml-1">Add</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-sm"
                onClick={() => setShow(1)}
              >
                <div className="w-3.5 h-3.5 opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
              <hr className="my-1" />
              <DropdownMenuItem
                className="cursor-pointer text-sm"
                onClick={() => setShow(2)}
              >
                <div className="w-3.5 h-3.5 opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
