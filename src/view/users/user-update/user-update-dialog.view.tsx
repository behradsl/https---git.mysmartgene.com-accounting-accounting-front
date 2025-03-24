import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserUpdateView from "./user-update.view";
import { FC, useEffect, useState } from "react";

const UserUpdateDialogView: FC<{ onClose?: () => void; userId: string }> = ({
  onClose,
  userId,
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
        <Button size={"sm"} variant={"outline"}>
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>Update User:</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild className=''>
          <div className='max-h-[80dvh] overflow-y-auto'>
            <UserUpdateView
              userId={userId}
              onSuccessfulSubmit={() => setOpen(false)}
            />
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default UserUpdateDialogView;
