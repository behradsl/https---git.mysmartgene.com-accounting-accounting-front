"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  useCreateLaboratoryFormalPaymentInfo,
  useUpdateLaboratoryFormalPaymentInfo,
} from "@/hooks/api/use-laboratory.hook";
import { useEffect } from "react";
import { LaboratoryFormalPaymentInfoType } from "@/types/laboratory-entity.type";

const formSchema = z.object({
  laboratoryId: z.string(),
  legalEntityName: z
    .string()
    .min(2, { message: "Legal entity name must be at least 2 characters." }),
  economicNumber: z
    .string()
    .min(2, { message: "Economic number is required." }),
  nationalId: z.string().min(2, { message: "National ID is required." }),
  fullAddress: z.string().min(2, { message: "Full address is required." }),
  province: z.string().min(2, { message: "Province is required." }),
  city: z.string().min(2, { message: "City is required." }),
  registrationNumber: z
    .string()
    .min(2, { message: "Registration number is required." }),
  postalCode: z.string().min(2, { message: "Postal code is required." }),
});

type PaymentInfoFormProps = {
  laboratoryId: string;
  existingData?: LaboratoryFormalPaymentInfoType["LaboratoryFormalPaymentInfo"];
  onSuccess?: () => void;
};

const PaymentInfoForm = ({
  laboratoryId,
  existingData,
  onSuccess,
}: PaymentInfoFormProps) => {
  const createLaboratoryPaymentInfo = useCreateLaboratoryFormalPaymentInfo();
  const updateLaboratoryPaymentInfo = useUpdateLaboratoryFormalPaymentInfo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      laboratoryId: laboratoryId,
      legalEntityName: "",
      economicNumber: "",
      nationalId: "",
      fullAddress: "",
      province: "",
      city: "",
      registrationNumber: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    if (existingData) {
      form.reset({
        laboratoryId: laboratoryId,
        legalEntityName: existingData.legalEntityName || "",
        economicNumber: existingData.economicNumber || "",
        nationalId: existingData.nationalId || "",
        fullAddress: existingData.fullAddress || "",
        province: existingData.province || "",
        city: existingData.city || "",
        registrationNumber: existingData.registrationNumber || "",
        postalCode: existingData.postalCode || "",
      });
    }
  }, [existingData, form, laboratoryId]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (existingData) {
        await updateLaboratoryPaymentInfo(values);
        toast.success("Payment information updated successfully");
      } else {
        await createLaboratoryPaymentInfo(values);
        toast.success("Payment information added successfully");
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Failed to save payment information");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 py-2'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-4'>
            <h3 className='font-medium text-lg'>Legal Information</h3>

            <FormField
              control={form.control}
              name='legalEntityName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Legal Entity Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter legal entity name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='registrationNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter registration number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='nationalId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter national ID' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='economicNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Economic Number</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter economic number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-4'>
            <h3 className='font-medium text-lg'>Address Information</h3>

            <FormField
              control={form.control}
              name='fullAddress'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Address</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter full address' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='province'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter province' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter city' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='postalCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter postal code' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='flex justify-end pt-4'>
          <Button type='submit'>
            {existingData ? "Update Payment Info" : "Add Payment Info"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentInfoForm;
