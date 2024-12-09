import ty from "../../../src/app/img/thanks.jpg";
interface Props {
  status: any;
  verify: boolean;
}
export function DownloadThanks({ status, verify }: Props) {
  const downloadImage = () => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = ty.src;
    a.download = "glance.jpg";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(a.href);
    localStorage.setItem("downloader", "true");
  };

  return (
    <div className="relative cursor-pointer" onClick={downloadImage}>
      <div
        className={`fixed z-10 right-10 group flex justify-center items-center active:scale-90 duration-200 w-8 h-8 rounded-md p-2 drop-shadow-lg bg-white dark:bg-gray-800 ${
          status === "unauthenticated" ? "bottom-28" : "bottom-40"
        }`}
      >
        <div className="flex items-center w-10 h-8 text-gray-500 dark:text-gray-300">
          {verify && (
            <div className="w-3 h-3 rounded-full absolute -mt-7 ml-5 bg-teal-200 animate-pulse"></div>
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12 15.577l-3.539-3.538l.708-.72L11.5 13.65V5h1v8.65l2.33-2.33l.709.719zM6.616 19q-.691 0-1.153-.462T5 17.384v-2.423h1v2.423q0 .231.192.424t.423.192h10.77q.23 0 .423-.192t.192-.424v-2.423h1v2.423q0 .691-.462 1.153T17.384 19z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
