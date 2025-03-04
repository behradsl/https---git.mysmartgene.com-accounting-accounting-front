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
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toaster";
import { useCreateRegistry } from "@/hooks/api";
import {
  InvoiceStatus,
  SampleStatus,
  SettlementStatus,
} from "@/types/registry-entity.type";
import { Switch } from "@/components/ui/switch";
import { useLaboratoryFindMany } from "@/hooks/api/use-laboratory.hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/ui/datepicker";
import { FC } from "react";

const formSchema = z.object({
  MotId: z.string().min(1, "Required"),
  name: z.string().min(2, "Required"),
  serviceType: z.string().min(1, "Required"),
  kitType: z.string().min(1, "Required"),
  urgentStatus: z.boolean().optional(),
  price: z.string(),
  description: z.string().optional(),
  costumerRelationInfo: z.string().optional(),
  KoreaSendDate: z.string().optional(),
  resultReady: z.boolean().optional(),
  resultReadyTime: z.string().optional(),
  settlementStatus: z.nativeEnum(SettlementStatus, {}),
  invoiceStatus: z.nativeEnum(InvoiceStatus, {}),
  proformaSent: z.boolean().optional(),
  proformaSentDate: z.string().optional(),
  totalInvoiceAmount: z.string(),
  installmentOne: z.string().optional(),
  installmentOneDate: z.string().optional(),
  installmentTwo: z.string().optional(),
  installmentTwoDate: z.string().optional(),
  installmentThree: z.string().optional(),
  installmentThreeDate: z.string().optional(),
  totalPaid: z.string(),
  settlementDate: z.string().optional(),
  officialInvoiceSent: z.boolean().optional(),
  officialInvoiceSentDate: z.string().optional(),
  sampleStatus: z.nativeEnum(SampleStatus, {}),
  sendSeries: z.string(),
  laboratoryId: z.string().min(1, "Required"),
});

const RegistryCreateView: FC<{ onSuccessfulSubmit?: () => void }> = ({
  onSuccessfulSubmit,
}) => {
  const { laboratories } = useLaboratoryFindMany();

  const { trigger: createRegistryCallback } = useCreateRegistry();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      MotId: undefined,
      name: undefined,
      laboratoryId: undefined,
      serviceType: undefined,
      kitType: undefined,
      urgentStatus: true,
      price: undefined,
      description: undefined,
      costumerRelationInfo: undefined,
      KoreaSendDate: undefined,
      resultReady: false,
      resultReadyTime: undefined,
      settlementStatus: SettlementStatus.PENDING,
      invoiceStatus: InvoiceStatus.NOT_ISSUED,
      proformaSent: false,
      proformaSentDate: undefined,
      totalInvoiceAmount: undefined,
      installmentOne: undefined,
      installmentOneDate: undefined,
      installmentTwo: undefined,
      installmentTwoDate: undefined,
      installmentThree: undefined,
      installmentThreeDate: undefined,
      totalPaid: undefined,
      settlementDate: undefined,
      officialInvoiceSent: false,
      officialInvoiceSentDate: undefined,
      sampleStatus: undefined,
      sendSeries: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newRegistry = await createRegistryCallback({
        ...values,
      });

      toast.success("registry saved as [STAGED].");
      if (onSuccessfulSubmit) onSuccessfulSubmit();
      form.reset();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <>
      <main className='my-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 flex flex-wrap justify-between gap-2.5 px-5 pb-10'>
            <FormField
              control={form.control}
              name='MotId'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>MOT ID</FormLabel>
                  <FormControl>
                    <Input autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='serviceType'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Service Type</FormLabel>
                  <FormControl>
                    <Input autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='kitType'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Kit Type</FormLabel>
                  <FormControl>
                    <Input autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='laboratoryId'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Laboratory</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir='rtl'>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a laboratory' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        // Temporary workaround from https://github.com/shadcn-ui/ui/issues/1220
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {(laboratories?.data ?? []).map((laboratory) => (
                        <SelectItem
                          key={`laboratory-id-${laboratory?.id}`}
                          value={laboratory?.id ?? ""}>
                          {laboratory?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      inputMode='numeric'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='urgentStatus'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12 flex justify-between items-center'>
                  <FormLabel>Urgent Status</FormLabel>
                  <FormControl>
                    <Switch
                      className='mx-2'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input type='string' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='costumerRelationInfo'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Customer Relation Info</FormLabel>
                  <FormControl>
                    <Input autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='KoreaSendDate'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Korea Send Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      onChange={(date) => field.onChange(date?.toISOString())}
                      value={field.value ? new Date(field.value) : undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='resultReady'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12 flex justify-between items-center'>
                  <FormLabel>Result Ready</FormLabel>
                  <FormControl>
                    <Switch
                      className='mx-2'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='resultReadyTime'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Result Ready Time</FormLabel>
                  <FormControl>
                    <div className='flex items-center justify-around gap-2'>
                      <DatePicker
                        onChange={(date) => field.onChange(date?.toISOString())}
                        value={field.value ? new Date(field.value) : undefined}
                        className='w-2/3'
                      />
                      <Input
                        className='justify-center gap-6 w-1/3'
                        autoComplete='off'
                        type='time'
                        value={new Date(
                          field.value as string,
                        ).toLocaleTimeString()}
                        onChange={(e) => {
                          const time = e.target.value.split(":");
                          const date = new Date(field.value as string);
                          date.setHours(parseInt(time[0]));
                          date.setMinutes(parseInt(time[1]));
                          field.onChange(date.toISOString());
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='settlementStatus'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Settlement Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select Settlement Status' />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(SettlementStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.replace(/_/g, " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='invoiceStatus'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Invoice Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select Invoice Status' />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(InvoiceStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.replace(/_/g, " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='proformaSent'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12 flex justify-between items-center'>
                  <FormLabel>Proforma Sent</FormLabel>
                  <FormControl>
                    <Switch
                      className='mx-2'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='proformaSentDate'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Proforma Sent Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      onChange={(date) => field.onChange(date?.toISOString())}
                      value={field.value ? new Date(field.value) : undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='totalInvoiceAmount'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Total Invoice Amount</FormLabel>
                  <FormControl>
                    <Input type='string' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='installmentOne'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Installment One</FormLabel>
                  <FormControl>
                    <Input type='string' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='installmentOneDate'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Installment One Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      onChange={(date) => field.onChange(date?.toISOString())}
                      value={field.value ? new Date(field.value) : undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='installmentTwo'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Installment Two</FormLabel>
                  <FormControl>
                    <Input type='string' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='installmentTwoDate'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Installment Two Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      onChange={(date) => field.onChange(date?.toISOString())}
                      value={field.value ? new Date(field.value) : undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='installmentThree'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Installment Three</FormLabel>
                  <FormControl>
                    <Input type='string' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='installmentThreeDate'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Installment Three Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      onChange={(date) => field.onChange(date?.toISOString())}
                      value={field.value ? new Date(field.value) : undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='totalPaid'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Total Paid</FormLabel>
                  <FormControl>
                    <Input type='string' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='settlementDate'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Settlement Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      onChange={(date) => field.onChange(date?.toISOString())}
                      value={field.value ? new Date(field.value) : undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='officialInvoiceSent'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12 flex justify-between items-center'>
                  <FormLabel>Official Invoice Sent</FormLabel>
                  <FormControl>
                    <Switch
                      className='mx-2'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='officialInvoiceSentDate'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Official Invoice Sent Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      onChange={(date) => field.onChange(date?.toISOString())}
                      value={field.value ? new Date(field.value) : undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='sampleStatus'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Sample Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select Sample Status' />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(SampleStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.replace(/_/g, " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='sendSeries'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Send Series</FormLabel>
                  <FormControl>
                    <Input autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className='mt-5 opacity-0' />

            <div className='ms-auto w-full md:w-5/12 px-6 flex justify-end'>
              <Button
                type='submit'
                className='w-full md:w-1/2 text-green-700 hover:text-green-700 outline-green-700 border-green-700 hover:bg-green-700/10'
                variant={"outline"}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
};

export default RegistryCreateView;
