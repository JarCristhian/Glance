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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <g fill="none">
                      <path
                        d="M16 5.268A2 2 0 0 1 17 7v6a4 4 0 0 1-4 4H7a2 2 0 0 1-1.732-1H13a3 3 0 0 0 3-3V5.268zM15 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5zm-3 4a.5.5 0 0 1-.5.5h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 1 1 0-1h2v-2a.5.5 0 1 1 1 0v2h2a.5.5 0 0 1 .5.5z"
                        fill="currentColor"
                      ></path>
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
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
              <hr className="my-1" />
              <DropdownMenuItem
                className="cursor-pointer text-sm"
                onClick={() => setShow(2)}
              >
                <div className="w-3.5 h-3.5 opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
