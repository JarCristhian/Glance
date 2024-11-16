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
import { Textarea } from "../../components/ui/textarea";
import { toast, Toaster } from "sonner";
import { CodeService } from "./services/api";
import { Store, Props, GetL } from "./interfaces";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextAnimation } from "@/components/me/textAniamtion";

interface SelectLanguage {
  title: string;
  value: number;
}

export function DialogCode({ show, onClose, update, data, languages }: Props) {
  const codeService = new CodeService();
  const [form, setForm] = useState<Store>({
    title: "",
    description: "",
    content: "",
    languageId: "",
    themes: { dark: "catppuccin-macchiato", light: "catppuccin-latte" },
  });
  const [active, setActive] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [items, setItems] = useState<SelectLanguage[]>([]);
  const { data: session } = useSession();

  const formatData = (data: GetL[]) => {
    let langs: SelectLanguage[] = [];
    data.map((v) => {
      langs.push({ title: v.name, value: v.id });
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
        title: data.title,
        description: data.description,
        content: data.content,
        languageId: data.languageId,
        themes: data.themes,
      });
    } else {
      setEdit(false);
      setForm({
        title: "",
        description: "",
        content: "",
        languageId: "",
        themes: { dark: "catppuccin-macchiato", light: "catppuccin-latte" },
      });
      setError("");
    }
  }, [data]);

  const activeAnimation = () => {
    setActive(!active);
    setTimeout(() => {
      setActive(false);
      onClose();
    }, 500);
  };

  const clearCode = () => {
    activeAnimation();
    update();
    setForm({
      title: "",
      description: "",
      content: "",
      languageId: "",
      themes: { dark: "catppuccin-macchiato", light: "catppuccin-latte" },
    });
    setError("");
  };

  const saveCode = async () => {
    if (form.languageId == "")
      return setError("LanguageId"), toast.info("Select language..");
    if (form.title.trim().length == 0)
      return setError("Title"), toast.info("Write the title..");
    if (form.description.trim().length == 0)
      return setError("Description"), toast.info("Write the description..");
    if (form.content.trim().length == 0)
      return setError("Content"), toast.info("Add one content. =)");
    try {
      let data = {
        ...form,
        languageId: +form.languageId,
        themes: JSON.stringify(form.themes),
      };

      const result = !edit
        ? await codeService.postCode(data, session?.user?.token)
        : await codeService.updateCode(form.id, data, session?.user?.token);

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
                <DialogTitle>{edit ? "Edit Code" : "Create Code"}</DialogTitle>
                <DialogDescription>
                  <TextAnimation text="Here you can create a code." />
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <form>
            <div className="grid gap-2  space-y-1 py-4 -mt-3 sm:-mx-2">
              <div className="flex gap-2">
                <Select
                  value={form.languageId.toString()}
                  onValueChange={(e) => {
                    setForm({ ...form, languageId: parseInt(e) }), setError("");
                  }}
                >
                  <SelectTrigger
                    className={error == "LanguageId" ? "text-amber-400" : ""}
                  >
                    <SelectValue placeholder="Select a Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {items.map((item, i) => (
                      <SelectItem value={item.value.toString()} key={i}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={JSON.stringify(form.themes)}
                  onValueChange={(e) =>
                    setForm({ ...form, themes: JSON.parse(e) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value={JSON.stringify({
                        dark: "rose-pine",
                        light: "rose-pine-dawn",
                      })}
                    >
                      Rose Pine
                    </SelectItem>
                    <SelectItem
                      value={JSON.stringify({
                        dark: "catppuccin-macchiato",
                        light: "catppuccin-latte",
                      })}
                    >
                      Catppuccin
                    </SelectItem>
                    <SelectItem
                      value={JSON.stringify({
                        dark: "tokyo-night",
                        light: "snazzy-light",
                      })}
                    >
                      Tokyo Night
                    </SelectItem>
                    <SelectItem
                      value={JSON.stringify({
                        dark: "night-owl",
                        light: "catppuccin-latte",
                      })}
                    >
                      Night Owl
                    </SelectItem>
                    <SelectItem
                      value={JSON.stringify({
                        dark: "nord",
                        light: "snazzy-light",
                      })}
                    >
                      Nord
                    </SelectItem>
                    <SelectItem
                      value={JSON.stringify({
                        dark: "dracula",
                        light: "catppuccin-latte",
                      })}
                    >
                      Dracula Theme
                    </SelectItem>
                    <SelectItem
                      value={JSON.stringify({
                        dark: "github-dark",
                        light: "github-light",
                      })}
                    >
                      Github
                    </SelectItem>
                    <SelectItem
                      value={JSON.stringify({
                        dark: "material-theme-palenight",
                        light: "material-theme-lighter",
                      })}
                    >
                      Paletnight
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className={error == "Title" ? "text-amber-400" : ""}>
                  Title
                </Label>
                <Input
                  value={form.title}
                  onChange={(e) => {
                    setForm({ ...form, title: e.target.value }), setError("");
                  }}
                  autoComplete="off"
                />
              </div>
              <div>
                <Label
                  className={error == "Description" ? "text-amber-400" : ""}
                >
                  Description
                </Label>
                <Input
                  value={form.description}
                  onChange={(e) => {
                    setForm({ ...form, description: e.target.value }),
                      setError("");
                  }}
                  autoComplete="off"
                />
              </div>

              <div>
                <Label className={error == "Content" ? "text-amber-400" : ""}>
                  Content
                </Label>
                <Textarea
                  className="min-h-[160px] text-[10px]"
                  value={form.content}
                  onChange={(e) => {
                    setForm({ ...form, content: e.target.value }), setError("");
                  }}
                />
              </div>
            </div>
            <hr />
            <DialogFooter className="flex space-x-2 mt-4">
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
                disabled={active}
                type="button"
                onClick={saveCode}
              >
                {active && <span className="loader" />}
                <span className="ml-1">
                  {edit ? "Save Change" : "Save Code"}
                </span>
              </Button>
            </DialogFooter>
            {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
