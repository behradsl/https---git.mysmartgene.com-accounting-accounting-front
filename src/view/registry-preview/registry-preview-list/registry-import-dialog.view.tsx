import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegistryImportXlsx, useRegistryExportEmpty } from "@/hooks/api";
import { DownloadIcon, UploadIcon } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const RegistryReviewImportDialogView: FC<{ onClose?: () => void }> = ({
  onClose,
}) => {
  const [open, setOpen] = useState(false);
  const [uploadBinary, setUploadBinary] = useState<File | void>();
  const [initialTrigger, setInitialTrigger] = useState<void | string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadFile } = useRegistryImportXlsx();
  const { downloadData } = useRegistryExportEmpty();
  useEffect(() => {
    open ? setInitialTrigger("first") : null;
    !open && initialTrigger ? onClose?.() : null;
  }, [open]);

  const onSubmit = async () => {
    if (uploadBinary)
      toast.promise(uploadFile(uploadBinary), {
        error: (err) => {
          fileInputRef.current?.setAttribute("type", "text");
          fileInputRef.current?.setAttribute("type", "file");

          return ["Error uploading file", err.message].map((errorMessage) => (
            <p key={`error-${errorMessage}`}>{errorMessage}</p>
          ));
        },
        success: () => {
          fileInputRef.current?.setAttribute("type", "text");
          fileInputRef.current?.setAttribute("type", "file");
          onClose?.();
          setOpen(false);
          return "File uploaded successfully";
        },
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>New Bulk Import</Button>
      </DialogTrigger>
      <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>Upload a new Staged Registry list:</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild className=''>
          <div className='max-h-[80dvh] overflow-y-auto'>
            <div>
              <Button
                variant='outline'
                className=''
                onClick={() => downloadData()}>
                Export Template <DownloadIcon />
              </Button>
            </div>
            <div className='flex justify-end items-center gap-3 my-3'>
              <Label className='text-nowrap'>Import Data:</Label>
              <Input
                ref={fileInputRef}
                type='file'
                className=''
                placeholder='Import Registries'
                onChange={(e) => {
                  if (e.currentTarget.files)
                    setUploadBinary(e.currentTarget?.files[0]);
                  else setUploadBinary();
                }}
              />
            </div>
            <div className='flex justify-end items-center gap-3 my-3'>
              <Button
                variant='outline'
                onClick={() => onSubmit()}
                disabled={!uploadBinary}>
                Upload
                <UploadIcon />
              </Button>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default RegistryReviewImportDialogView;
