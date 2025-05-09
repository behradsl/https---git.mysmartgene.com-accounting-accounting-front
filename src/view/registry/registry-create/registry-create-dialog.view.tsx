import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RegistryCreateView from "./registry-create.view";
import { FC, useEffect, useState } from "react";

const RegistryPreviewCreateDialogView: FC<{ onClose?: () => void }> = ({
  onClose,
}) => {
  const [open, setOpen] = useState(false);
  const [initialTrigger, setInitialTrigger] = useState<void | string>();
  useEffect(() => {
    open ? setInitialTrigger("first") : null;
    !open && initialTrigger ? onClose?.() : null;
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>New Staged Registry</Button>
      </DialogTrigger>
      <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>Create a new Staged Registry:</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild className=''>
          <div className='max-h-[80dvh] overflow-y-auto'>
            <RegistryCreateView onSuccessfulSubmit={() => setOpen(false)} />
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default RegistryPreviewCreateDialogView;
