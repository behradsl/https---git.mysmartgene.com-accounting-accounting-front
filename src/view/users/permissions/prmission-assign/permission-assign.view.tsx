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
import { useCreateUser, useRegistryUpsertFieldAccess } from "@/hooks/api";
import { useRouter } from "next/navigation";
import { AccessType } from "@/types/registry-entity.type";

const formSchema = z.object({
 
   position: z.string().min(2, {}),
    MotId: z.nativeEnum(AccessType, {}),
    name: z.nativeEnum(AccessType, {}),
    Laboratory: z.nativeEnum(AccessType, {}),
    serviceType: z.nativeEnum(AccessType, {}),
    kitType: z.nativeEnum(AccessType, {}),
    urgentStatus: z.nativeEnum(AccessType, {}),
    price: z.nativeEnum(AccessType, {}),
    description: z.nativeEnum(AccessType, {}),
    costumerRelationInfo: z.nativeEnum(AccessType, {}),
    KoreaSendDate: z.nativeEnum(AccessType, {}),
    resultReady: z.nativeEnum(AccessType, {}),
    resultReadyTime: z.nativeEnum(AccessType, {}),
    settlementStatus: z.nativeEnum(AccessType, {}),
    invoiceStatus: z.nativeEnum(AccessType, {}),
    proformaSent: z.nativeEnum(AccessType, {}),
    proformaSentDate: z.nativeEnum(AccessType, {}),
    totalInvoiceAmount: z.nativeEnum(AccessType, {}),
    installmentOne: z.nativeEnum(AccessType, {}),
    installmentOneDate: z.nativeEnum(AccessType, {}),
    installmentTwo: z.nativeEnum(AccessType, {}),
    installmentTwoDate: z.nativeEnum(AccessType, {}),
    installmentThree: z.nativeEnum(AccessType, {}),
    installmentThreeDate: z.nativeEnum(AccessType, {}),
    totalPaid: z.nativeEnum(AccessType, {}),
    settlementDate: z.nativeEnum(AccessType, {}),
    officialInvoiceSent: z.nativeEnum(AccessType, {}),
    officialInvoiceSentDate: z.nativeEnum(AccessType, {}),
    sampleStatus: z.nativeEnum(AccessType, {}),
    sendSeries: z.nativeEnum(AccessType, {}),
    createdAt: z.nativeEnum(AccessType, {}),
    updatedAt: z.nativeEnum(AccessType, {}),
    registryCreatedBy: z.nativeEnum(AccessType, {}),
    registryUpdatedBy: z.nativeEnum(AccessType, {}),
});

const UserCreateView = (props: {}) => {
  const {} = useRegistryUpsertFieldAccess();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newPermission = await createUserCallback({
        ...values,
      });

      toast.success("User saved.");
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
        <h2 className='mb-10 px-5 text-center text-lg font-semibold'>
          New Permission
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='spsace-y-8 flex flex-wrap justify-between gap-2.5 px-5'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input placeholder='' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>phoneNumber</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=''
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
              name='email'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder='' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input autoComplete='off' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='position'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Position</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir='rtl'>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        // temporary workaround from https://github.com/shadcn-ui/ui/issues/1220
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(UserPosition).map((position) => (
                        <SelectItem
                          key={`user-create-position-${position}`}
                          value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className='mx-auto my-2 w-8/12 opacity-0' />

            <div className='flex w-full justify-end'>
              <Button type='submit' className='mx-auto w-full max-w-2xs'>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </SidebarProvider>
  );
};

export default UserCreateView;
