"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const FormSchema = z.object({
  motId: z.string().min(2, "Mot ID must be at least 2 characters"),
  name: z.string().min(1, "Name is required"),
  laboratoryId: z.string().min(1, "Laboratory ID is required"),
  serviceType: z.string().min(1, "Service Type is required"),
  kitType: z.string().min(1, "Kit Type is required"),
  urgentStatus: z.boolean().optional(),
  price: z.string().min(1, "Price is required"),
  description: z.string().optional(),
  costumerRelationInfo: z.string().optional(),
  koreaSendDate: z.string().optional(),
  installmentOne: z.string().optional(),
  installmentOneDate: z.string().optional(),
  installmentTwo: z.string().optional(),
  installmentTwoDate: z.string().optional(),
  resultReady: z.boolean().optional(),
  resultReadyTime: z.string().optional(),
  settlementStatus: z.string().min(1, "Settlement Status is required"),
  invoiceStatus: z.string().min(1, "Invoice Status is required"),
  proformaSent: z.boolean().optional(),
  proformaSentDate: z.string().optional(),
  totalInvoiceAmount: z.string().min(1, "Total Invoice Amount is required"),
  totalPaid: z.string().min(1, "Total Paid is required"),
  paymentPercentage: z.string().min(1, "Payment Percentage is required"),
  sampleStatus: z.string().min(1, "Sample Status is required"),
  sendSeries: z.string().min(1, "Send Series is required"),
  final: z.boolean().default(false),
});

export default function RegistryForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      motId: "",
      name: "",
      laboratoryId: "",
      serviceType: "",
      kitType: "",
      urgentStatus: false,
      price: "",
      description: "",
      costumerRelationInfo: "",
      koreaSendDate: "",
      installmentOne: "",
      resultReady: false,
      resultReadyTime: "",
      settlementStatus: "",
      invoiceStatus: "",
      proformaSent: false,
      proformaSentDate: "",
      totalInvoiceAmount: "",
      totalPaid: "",
      paymentPercentage: "",
      sampleStatus: "",
      sendSeries: "",
      final: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Registry submitted successfully!", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {Object.keys(FormSchema.shape).map((key) => (
          <FormField
            key={key}
            control={form.control}
            name={key as keyof z.infer<typeof FormSchema>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{key}</FormLabel>
                <FormControl>
                  {typeof field.value === "boolean" ? (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  ) : (
                    <Input placeholder={key} {...field} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
