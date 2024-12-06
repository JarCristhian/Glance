import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../../components/ui/button";

interface Confirm {
  show: boolean;
  onClose: () => void;
  setConfirm: (confirm: boolean) => void;
}

export function DialogConfirm({ show, onClose, setConfirm }: Confirm) {
  const [active, setActive] = useState<boolean>(false);

  const activeAnimation = () => {
    setActive(!active);
    setTimeout(() => {
      setActive(false);
    }, 500);
  };

  const setConfirmDelete = async (confirm: boolean) => {
    if (confirm) {
      activeAnimation();
    }
    setConfirm(confirm);
    onClose();
  };
  return (
    <>
      <Dialog open={show} onOpenChange={onClose}>
        <DialogContent
          className="sm:max-w-[450px]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="opacity-70 w-11 h-11 p-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  >
                    <path d="M9.713 3.64c.581-.495.872-.743 1.176-.888a2.58 2.58 0 0 1 2.222 0c.304.145.595.393 1.176.888c.599.51 1.207.768 2.007.831c.761.061 1.142.092 1.46.204c.734.26 1.312.837 1.571 1.572c.112.317.143.698.204 1.46c.063.8.32 1.407.83 2.006c.496.581.744.872.889 1.176c.336.703.336 1.52 0 2.222c-.145.304-.393.595-.888 1.176a3.3 3.3 0 0 0-.831 2.007c-.061.761-.092 1.142-.204 1.46a2.58 2.58 0 0 1-1.572 1.571c-.317.112-.698.143-1.46.204c-.8.063-1.407.32-2.006.83c-.581.496-.872.744-1.176.889a2.58 2.58 0 0 1-2.222 0c-.304-.145-.595-.393-1.176-.888a3.3 3.3 0 0 0-2.007-.831c-.761-.061-1.142-.092-1.46-.204a2.58 2.58 0 0 1-1.571-1.572c-.112-.317-.143-.698-.204-1.46a3.3 3.3 0 0 0-.83-2.006c-.496-.581-.744-.872-.89-1.176a2.58 2.58 0 0 1 .001-2.222c.145-.304.393-.595.888-1.176c.52-.611.769-1.223.831-2.007c.061-.761.092-1.142.204-1.46a2.58 2.58 0 0 1 1.572-1.571c.317-.112.698-.143 1.46-.204a3.3 3.3 0 0 0 2.006-.83"></path>
                    <path d="M12 16v-5h-.5m0 5h1M12 8.5V8"></path>
                  </g>
                </svg>
              </div>
              <div className="grid">
                <DialogTitle className="text-[17px]">
                  Are you absolutely sure?
                </DialogTitle>
                <DialogDescription className="text-[13.5px]">
                  This action cannot be undone. This will permanently delete
                  your code from servers.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="-mt-1">
            <Button
              size={"sm"}
              variant="ghost"
              className="shadow-sm select-none mr-1"
              type="button"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </Button>
            <Button
              size={"sm"}
              className="select-none active:scale-95"
              disabled={active}
              type="button"
              onClick={() => setConfirmDelete(true)}
            >
              {active && <span className="loader" />}
              <span className="ml-1">Delete</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
