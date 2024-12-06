import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { toast, Toaster } from "sonner";
import { CodeService } from "./services/api";
import { StoreL, PropsL, GetL } from "./interfaces";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectLanguage {
  title: string;
  value: number;
}

export function DialogLanguage({
  show,
  onClose,
  update,
  data,
  languages,
}: PropsL) {
  const codeService = new CodeService();
  const [form, setForm] = useState<StoreL>({
    name: "",
    short: "",
    extention: "",
    image: "",
    type: 1,
    reference: null,
  });
  const [edit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [svg, setSvg] = useState<string>("");
  const [items, setItems] = useState<SelectLanguage[]>([]);
  const { data: session } = useSession();

  const formatData = (data: GetL[]) => {
    let langs: SelectLanguage[] = [];
    data.map((v) => {
      if (v.type == 1) {
        langs.push({ title: v.name, value: v.id });
      }
    });
    setItems(langs);
  };

  useEffect(() => {
    if (languages.length > 0) {
      formatData(languages);
    }
  }, [languages]);

  useEffect(() => {
    if (data) {
      setEdit(true);
      setForm({
        id: data.id,
        name: data.name,
        short: data.short,
        extention: data.extention,
        image: data.image,
        type: data.type,
        reference: data.reference,
      });
      setSvg(data.image);
    } else {
      setEdit(false);
      setForm({
        name: "",
        short: "",
        extention: "",
        image: "",
        type: 1,
        reference: null,
      });
      setSvg("");
      setError("");
    }
  }, [data]);

  const clearCode = () => {
    update();
    setForm({
      name: "",
      short: "",
      extention: "",
      image: "",
      type: 1,
      reference: null,
    });
    setError("");
    onClose();
    setSvg("");
  };

  const saveCode = async () => {
    if (form.name == "")
      return setError("Name"), toast.info("Write the name..");
    if (form.short.trim().length == 0)
      return setError("Short"), toast.info("Write the short..");
    if (form.extention.trim().length == 0)
      return setError("Extention"), toast.info("Write the extention..");
    if (form.image.trim().length == 0)
      return setError("Image"), toast.info("Add SVG..");
    try {
      let data = {
        ...form,
        type: +form.type,
        reference: form.reference == "" ? null : form.reference,
      };

      const result = !edit
        ? await codeService.postLanguage(data, session?.user?.token)
        : await codeService.updateLanguage(form.id, data, session?.user?.token);

      if (result.status !== 500 && result.status !== 400) {
        toast.success(edit ? "Update Successfully!" : "Save Successfully!");
        clearCode();
      } else {
        toast.error("Error to register..");
      }
    } catch (error) {
      toast.error("Error to register..");
    }
  };

  const test = (svg: string) => {
    setSvg(svg);
    // const newSvg = svg.replace(' xmlns="http://www.w3.org/2000/svg"', "");
    // setForm({ ...form, image: svg });
  };
  return (
    <>
      <Toaster position="top-left" duration={1000} />
      <Dialog open={show} onOpenChange={onClose}>
        <DialogContent
          className="sm:max-w-[400px]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="opacity-70 w-10 h-10 p-1">
                <svg viewBox="0 0 24 24">
                  <g fill="none">
                    <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                    <path
                      fill="currentColor"
                      d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"
                    ></path>
                  </g>
                </svg>
              </div>
              <div>
                <DialogTitle>
                  {edit ? "Edit Language" : "Create Language"}
                </DialogTitle>
                <DialogDescription>
                  Here you can create a language.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <form>
            <div className="grid gap-2  space-y-1 py-4 -mt-3 sm:-mx-2">
              <div className="flex gap-2">
                <Select
                  value={form.type.toString()}
                  onValueChange={(e) => {
                    setForm({
                      ...form,
                      type: parseInt(e),
                      reference: parseInt(e) == 1 ? "" : form.reference,
                    }),
                      setError("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"1"}>Language</SelectItem>
                    <SelectItem value={"0"}>Framework</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={form.reference?.toString()}
                  onValueChange={(e) =>
                    setForm({ ...form, reference: parseInt(e) })
                  }
                  disabled={form.type == 1}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Reference" />
                  </SelectTrigger>
                  <SelectContent>
                    {items.map((item, i) => (
                      <SelectItem value={item.value.toString()} key={i}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className={error == "Name" ? "text-amber-400" : ""}>
                  Name
                </Label>
                <Input
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value }), setError("");
                  }}
                  autoComplete="off"
                />
              </div>

              <div className="flex gap-2">
                <div className="w-full">
                  <Label className={error == "Short" ? "text-amber-400" : ""}>
                    Short
                  </Label>
                  <Input
                    value={form.short}
                    onChange={(e) => {
                      setForm({ ...form, short: e.target.value }), setError("");
                    }}
                    autoComplete="off"
                  />
                </div>

                <div className="w-full">
                  <Label
                    className={error == "Extention" ? "text-amber-400" : ""}
                  >
                    Extention
                  </Label>
                  <Input
                    value={form.extention}
                    onChange={(e) => {
                      setForm({ ...form, extention: e.target.value }),
                        setError("");
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <Label className={error == "Image" ? "text-amber-400" : ""}>
                  Image
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={form.image}
                    onChange={(e) => {
                      setForm({ ...form, image: e.target.value }), setError("");
                    }}
                    autoComplete="off"
                  />
                  {form.image && (
                    <Button
                      variant="outline"
                      className="shadow-sm select-none"
                      type="button"
                      onClick={() => test(form.image)}
                    >
                      <svg width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="m14 10l-3 3m9.288-9.969a.535.535 0 0 1 .68.681l-5.924 16.93a.535.535 0 0 1-.994.04l-3.219-7.242a.54.54 0 0 0-.271-.271l-7.242-3.22a.535.535 0 0 1 .04-.993z"
                        ></path>
                      </svg>
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <hr />
            <DialogFooter className="mt-4">
              <div className="flex justify-between w-full">
                <div className="flex justify-center items-center w-10 h-10 rounded-md bg-white shadow dark:bg-slate-800">
                  <div dangerouslySetInnerHTML={{ __html: svg }}></div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    className="shadow-sm select-none rounded-full"
                    type="button"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="select-none active:scale-95 rounded-full"
                    type="button"
                    onClick={saveCode}
                  >
                    <span className="ml-1">
                      {edit ? "Save Change" : "Save Code"}
                    </span>
                  </Button>
                </div>
              </div>
            </DialogFooter>
            {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
