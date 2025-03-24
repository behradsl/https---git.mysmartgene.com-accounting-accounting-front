"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useLaboratoryFormalPaymentInfoFind } from "@/hooks/api/use-laboratory.hook";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Loader2, Edit, Plus } from "lucide-react";
import PaymentInfoForm from "./payment-info-form";

type FormalPaymentInfoProps = {
  laboratoryId: string;
  laboratoryName: string;
  triggerLabel: string;
  triggerVariant?: "default" | "outline" | "secondary" | "ghost";
};

const FormalPaymentInfoModal = ({
  laboratoryId,
  laboratoryName,
  triggerLabel,
  triggerVariant = "default",
}: FormalPaymentInfoProps) => {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { paymentInfo, isLoading, error } = useLaboratoryFormalPaymentInfoFind(
    open ? laboratoryId : "",
  );

  // Since the hook doesn't provide mutate, we'll handle refresh by toggling open state
  const handleRefresh = () => {
    if (open) {
      setOpen(false);
      setTimeout(() => setOpen(true), 10); // Briefly close and reopen to force refetch
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditMode(false);
  };

  const handleFormSuccess = () => {
    setIsEditMode(false);
    handleRefresh(); // Refresh the payment info data
  };

  const InfoItem = ({
    label,
    value,
  }: {
    label: string;
    value: string | null | undefined;
  }) => (
    <div className='mb-4'>
      <Label className='text-sm font-medium text-gray-500'>{label}</Label>
      <p className='mt-1 text-base font-medium'>{value || "-"}</p>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size='sm'>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>
            {laboratoryName} - Formal Payment Information
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Edit the formal payment details for this laboratory"
              : "View the formal payment details for this laboratory"}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className='flex items-center justify-center p-10'>
            <Loader2 className='h-8 w-8 animate-spin text-primary' />
          </div>
        ) : isEditMode ? (
          <PaymentInfoForm
            laboratoryId={laboratoryId}
            existingData={paymentInfo?.data?.LaboratoryFormalPaymentInfo}
            onSuccess={handleFormSuccess}
          />
        ) : !paymentInfo?.data?.LaboratoryFormalPaymentInfo ? (
          <div className='py-10'>
            <p className='text-muted-foreground mb-6'>
              No payment information available
            </p>
            <PaymentInfoForm
              laboratoryId={laboratoryId}
              onSuccess={handleFormSuccess}
            />
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='pt-6'>
              <h3 className='font-medium text-lg mb-4'>Legal Information</h3>
              <InfoItem
                label='Legal Entity Name'
                value={
                  paymentInfo.data.LaboratoryFormalPaymentInfo.legalEntityName
                }
              />
              <InfoItem
                label='Registration Number'
                value={
                  paymentInfo.data.LaboratoryFormalPaymentInfo
                    .registrationNumber
                }
              />
              <InfoItem
                label='National ID'
                value={paymentInfo.data.LaboratoryFormalPaymentInfo.nationalId}
              />
              <InfoItem
                label='Economic Number'
                value={
                  paymentInfo.data.LaboratoryFormalPaymentInfo.economicNumber
                }
              />
            </div>
            <div className='pt-6'>
              <h3 className='font-medium text-lg mb-4'>Address Information</h3>
              <InfoItem
                label='Full Address'
                value={paymentInfo.data.LaboratoryFormalPaymentInfo.fullAddress}
              />
              <InfoItem
                label='Province'
                value={paymentInfo.data.LaboratoryFormalPaymentInfo.province}
              />
              <InfoItem
                label='City'
                value={paymentInfo.data.LaboratoryFormalPaymentInfo.city}
              />
              <InfoItem
                label='Postal Code'
                value={paymentInfo.data.LaboratoryFormalPaymentInfo.postalCode}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          {paymentInfo?.data?.LaboratoryFormalPaymentInfo && !isEditMode && (
            <Button
              variant='outline'
              onClick={() => setIsEditMode(true)}
              className='gap-2'>
              <Edit className='h-4 w-4' /> Edit
            </Button>
          )}
          {isEditMode && (
            <Button variant='outline' onClick={() => setIsEditMode(false)}>
              Cancel
            </Button>
          )}
          <Button variant='ghost' onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormalPaymentInfoModal;
