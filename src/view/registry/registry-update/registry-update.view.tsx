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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toaster";
import { AppSidebar } from "@/components/app-sidebar.component";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useRegistryFindOne, useUpdateRegistry } from "@/hooks/api";

import { useParams, useRouter } from "next/navigation";
import {
  InvoiceStatus,
  RegistryEntity,
  RegistryEntityWithFieldAccess,
  SampleStatus,
  SettlementStatus,
} from "@/types/registry-entity.type";
import { useLaboratoryFindMany } from "@/hooks/api/use-laboratory.hook";
import { Switch } from "@/components/ui/switch";
import { useCallback, useEffect } from "react";

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

const RegistryUpdateView = () => {
  const { laboratories } = useLaboratoryFindMany();
  const { RegistryId } = useParams();
  const registryIdString = Array.isArray(RegistryId)
    ? RegistryId[0]
    : RegistryId || "";

  const { registry } = useRegistryFindOne(registryIdString);
  const router = useRouter();
  const { trigger: updateRegistryCallback } = useUpdateRegistry();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // MotId: "",
      // name: "Test 1",
      // laboratoryId: "e0c44e6d-c01d-4aae-a15e-0792d54d29f7",
      // serviceType: "Service Type 1",
      // kitType: "Kit Type 1",
      // urgentStatus: true,
      // price: "100000",
      // description: "This is a registry",
      // costumerRelationInfo: "09391115840",
      // KoreaSendDate: "2025-02-01T00:00:00.000Z",
      // resultReady: false,
      // resultReadyTime: "2025-02-01T00:00:00.000Z",
      // settlementStatus: SettlementStatus.OVERDUE,
      // invoiceStatus: InvoiceStatus.ISSUED,
      // proformaSent: false,
      // proformaSentDate: "2025-02-01T00:00:00.000Z",
      // totalInvoiceAmount: "100000",
      // installmentOne: "100000",
      // installmentOneDate: "2025-02-01T00:00:00.000Z",
      // installmentTwo: "100000",
      // installmentTwoDate: "2025-02-01T00:00:00.000Z",
      // installmentThree: "100000",
      // installmentThreeDate: "2025-02-01T00:00:00.000Z",
      // totalPaid: "50000",
      // settlementDate: "2025-02-01T00:00:00.000Z",
      // officialInvoiceSent: false,
      // officialInvoiceSentDate: "2025-02-01T00:00:00.000Z",
      // sampleStatus: SampleStatus.DELIVERED,
      // sendSeries: "Series 123",
    },
  });
  const formattedRegistries = useCallback(() => {
    const formattedRegistriesObject: Record<string, any> = {};
    Object.entries(registry?.data || {}).forEach(
      ([registryKey, registryValue]) => {
        formattedRegistriesObject[
          registryKey as keyof RegistryEntityWithFieldAccess
        ] = registryValue.value;
      }
    );
    console.log({ formattedRegistriesObject });

    form.reset(formattedRegistriesObject);
    return formattedRegistriesObject as RegistryEntity;
  }, [registry?.data]);

  useEffect(() => {
    formattedRegistries();
  }, [registry?.data]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newRegistry = await updateRegistryCallback({
        id: RegistryId as string,
        ...values,
      });

      router.push("/panel/registries");
      form.reset();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <h2 className="mb-10 px-5 text-center text-lg font-semibold">
          Update Registry
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex flex-wrap justify-between gap-2.5 px-5"
          >
            <FormField
              control={form.control}
              name="MotId"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>MOT ID</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Service Type</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kitType"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Kit Type</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="laboratoryId"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Laboratory</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a laboratory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        // Temporary workaround from https://github.com/shadcn-ui/ui/issues/1220
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {(laboratories?.data ?? []).map((laboratory) => (
                        <SelectItem
                          key={`laboratory-id-${laboratory.id}`}
                          value={laboratory.id}
                        >
                          {laboratory.name}
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
              name="price"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="urgentStatus"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Urgent Status</FormLabel>
                  <FormControl>
                    <Switch
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
              name="description"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="costumerRelationInfo"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Customer Relation Info</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="KoreaSendDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Korea Send Date</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resultReady"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Result Ready</FormLabel>
                  <FormControl>
                    <Switch
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
              name="resultReadyTime"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Result Ready Time</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="settlementStatus"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Settlement Status</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="invoiceStatus"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Invoice Status</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="proformaSent"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Proforma Sent</FormLabel>
                  <FormControl>
                    <Switch
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
              name="proformaSentDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Proforma Sent Date</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalInvoiceAmount"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Total Invoice Amount</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="installmentOne"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Installment One</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="installmentOneDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Installment One Date</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="installmentTwo"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Installment Two</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="installmentTwoDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Installment Two Date</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="installmentThree"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Installment Three</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="installmentThreeDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Installment Three Date</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalPaid"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Total Paid</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="settlementDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Settlement Date</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="officialInvoiceSent"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Official Invoice Sent</FormLabel>
                  <FormControl>
                    <Switch
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
              name="officialInvoiceSentDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Official Invoice Sent Date</FormLabel>
                  <FormControl>
                    <Input type="string" autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sampleStatus"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Sample Status</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sendSeries"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Send Series</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-10" />

            <Button type="submit" className="w-full md:w-2/12">
              Submit
            </Button>
          </form>
        </Form>
      </main>
    </SidebarProvider>
  );
};

export default RegistryUpdateView;
