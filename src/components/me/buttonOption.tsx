import { useEffect, useState } from "react";
import { Languages } from "../../app/api/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface Props {
  onAllNotes: () => void;
  onMyNotes?: () => void;
}
export function ButtonOption({ onMyNotes, onAllNotes }: Props) {
  const languages = new Languages();
  const { English, Spanish, language } = languages;
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    languages.getLanguage();
  }, [key]);

  const changeLang = () => {
    setKey((prevKey) => prevKey + 1);
  };
  return (
    <div className="relative cursor-pointer" onFocus={changeLang}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className="fixed z-10 bottom-28 right-10 group flex justify-center items-center 
                active:scale-90 duration-200 w-8 h-8 rounded-md p-2
                shadow-lg hover:shadow-xl bg-white dark:bg-gray-800/70"
          >
            <div className="flex items-center w-10 h-8 text-gray-500 dark:text-gray-300">
              <svg viewBox="0 0 16 16">
                <g fill="none">
                  <path
                    d="M5.25 8a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zm4 0a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0zM12 9.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5z"
                    fill="currentColor"
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
          sideOffset={2}
          alignOffset={-7}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer text-sm"
              onClick={onMyNotes}
            >
              <div className="w-3.5 h-3.5">
                <svg viewBox="0 0 20 20">
                  <g fill="none">
                    <path
                      d="M14 3a3 3 0 0 1 2.995 2.824L17 6v4.379a2 2 0 0 1-.467 1.284l-.119.13l-4.621 4.621a2 2 0 0 1-1.238.578l-.176.008H6a3 3 0 0 1-2.995-2.824L3 14V6a3 3 0 0 1 2.824-2.995L6 3h8zm0 1H6a2 2 0 0 0-1.995 1.85L4 6v8a2 2 0 0 0 1.85 1.995L6 16h4v-3a3 3 0 0 1 2.824-2.995L13 10h3V6a2 2 0 0 0-1.85-1.995L14 4zm1.783 7.001L13 11a2 2 0 0 0-1.995 1.85L11 13v2.781l.086-.074l4.621-4.621c.027-.027.052-.055.075-.085z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </div>
              <span className="text-xs ml-1 font-comic">
                {language ? English.optionNote : Spanish.optionNote}
              </span>
            </DropdownMenuItem>
            <hr className="my-1" />
            <DropdownMenuItem
              className="cursor-pointer text-sm"
              onClick={onAllNotes}
            >
              <div className="w-3.5 h-3.5">
                <svg viewBox="0 0 20 20">
                  <g fill="none">
                    <path
                      d="M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6zm3-2a2 2 0 0 0-2 2v3.5h5.5V4H6zm4.5 0v5.5H16V6a2 2 0 0 0-2-2h-3.5zm5.5 6.5h-5.5V16H14a2 2 0 0 0 2-2v-3.5zM9.5 16v-5.5H4V14a2 2 0 0 0 2 2h3.5z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </div>
              <span className="text-xs ml-1 font-comic">
                {language ? English.optionNotes : Spanish.optionNotes}
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
