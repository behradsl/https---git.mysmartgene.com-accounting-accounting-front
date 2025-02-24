import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


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
import { UserPosition } from "@/types/user-entity.type";
import { useUpdateRegistry, useUpdateUser, useUserFindOne } from "@/hooks/api";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {}),
  position: z.nativeEnum(UserPosition, {}),
  phoneNumber: z.coerce.string({}).min(6, {}).max(17, {}).optional(),
  email: z.string({}).min(8, {}),
  password: z.string({}).min(5, {}),
});

const UserUpdateView = () => {
  const { userId } = useParams();
  const router = useRouter();
  const { trigger: updateUserCallback } = useUpdateRegistry();
  const { user } = useUserFindOne(userId as string);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      position: UserPosition.FINANCE_MANAGER,
      email: "",
      password: undefined,
      phoneNumber: "",
    },
  });

  useEffect(() => {
    (async () => {
      form.reset({ ...user?.data, password: undefined });
    })();
  }, [user]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newUser = await updateUserCallback({
        id: userId as string,
        ...values,
      });

      router.push("/panel/users");
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
          New Registry
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
  );}