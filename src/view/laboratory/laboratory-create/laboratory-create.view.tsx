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

import { useRouter } from "next/navigation";
import { LaboratoriesType, PaymentType } from "@/types/laboratory-entity.type";
import { useCreateLaboratory } from "@/hooks/api/use-laboratory.hook";
import { useUserFindMany } from "@/hooks/api";
import { FC } from "react";

const formSchema = z.object({
  name: z.string().min(2, {}),
  type: z.nativeEnum(LaboratoriesType, {}),
  code: z.string().nullable(),
  address: z.string().nullable(),
  contactName: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  email: z.string().nullable(),
  paymentType: z.nativeEnum(PaymentType, {}),
  fax: z.string().nullable(),

  accountManagerId: z.string().min(1, "Required"),
});

const LaboratoryCreateView: FC<{
  onSuccessfulSubmit?: () => void;
}> = ({ onSuccessfulSubmit }) => {
  const { users } = useUserFindMany();
  const { trigger: createLaboratoryCallback } = useCreateLaboratory();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: LaboratoriesType.LABORATORY,
      code: "",
      address: "",
      contactName: "",
      phoneNumber: "",
      email: "",
      paymentType: PaymentType.INFORMAL,
      fax: "",

      accountManagerId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newLaboratory = await createLaboratoryCallback({
        ...values,
      });

      toast.success("Laboratory saved.");
      form.reset();
      onSuccessfulSubmit?.();
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
            className='space-y-8 flex flex-wrap justify-between gap-2.5 px-5'>
            {/* Name Field */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Code Field */}
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=''
                      autoComplete='off'
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Field */}
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=''
                      autoComplete='off'
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Name Field */}
            <FormField
              control={form.control}
              name='contactName'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=''
                      autoComplete='off'
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number Field */}
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=''
                      autoComplete='off'
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=''
                      autoComplete='off'
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fax Field */}
            <FormField
              control={form.control}
              name='fax'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Fax</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=''
                      autoComplete='off'
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Account Manager ID Field */}
            <FormField
              control={form.control}
              name='accountManagerId'
              render={({ field }) => {
                return (
                  <FormItem className='w-full md:w-5/12'>
                    <FormLabel>Account Manager</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      dir='rtl'>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select Account Manager' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        ref={(ref) =>
                          ref?.addEventListener("touchend", (e) =>
                            e.preventDefault(),
                          )
                        }>
                        {(users?.data ?? []).map((user) => (
                          <SelectItem
                            key={`user-id-${user.id}`}
                            value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Type (Enum) Field */}
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => {
                return (
                  <FormItem className='w-full md:w-5/12'>
                    <FormLabel>Laboratory Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Laboratory Type' />
                        </SelectTrigger>
                        <SelectContent
                          ref={(ref) =>
                            ref?.addEventListener("touchend", (e) =>
                              e.preventDefault(),
                            )
                          }>
                          {Object.values(LaboratoriesType).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.replace(/_/g, " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Payment Type (Enum) Field */}
            <FormField
              control={form.control}
              name='paymentType'
              render={({ field }) => {
                return (
                  <FormItem className='w-full md:w-5/12'>
                    <FormLabel>payment Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Laboratory Payment Type' />
                        </SelectTrigger>
                        <SelectContent
                          ref={(ref) =>
                            ref?.addEventListener("touchend", (e) =>
                              e.preventDefault(),
                            )
                          }>
                          {Object.values(PaymentType).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.replace(/_/g, " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Separator className='mt-5 opacity-0' />

            <div className='ms-auto w-full md:w-5/12 px-6 flex justify-end'>
              <Button
                type='submit'
                className='w-full md:w-1/2 text-green-700 hover:text-green-700 outline-green-700 border-green-700 hover:bg-green-700/10'
                variant={"outline"}>
                Create Laboratory
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
};

export default LaboratoryCreateView;
