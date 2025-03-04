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

import { useParams, useRouter } from "next/navigation";
import {
  useLaboratoryFormalPaymentInfoFind,
  useUpdateLaboratoryFormalPaymentInfo,
} from "@/hooks/api/use-laboratory.hook";
import { useEffect } from "react";

const formSchema = z.object({
  legalEntityName: z.string().nullable(),
  economicNumber: z.string().nullable(),
  nationalId: z.string().nullable(),
  fullAddress: z.string().nullable(),
  province: z.string().nullable(),
  city: z.string().nullable(),
  registrationNumber: z.string().nullable(),
  postalCode: z.string().nullable(),
});

const UpdateLaboratoryFormalPaymentInfoView = () => {
  const { laboratoryId } = useParams();
  const { paymentInfo } = useLaboratoryFormalPaymentInfoFind(
    laboratoryId as string,
  );

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  useEffect(() => {
    (async () => {
      form.reset({ ...paymentInfo?.data.LaboratoryFormalPaymentInfo });
    })();
  }, [paymentInfo]);

  const updateLaboratoryFormalPaymentInfo =
    useUpdateLaboratoryFormalPaymentInfo();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newPaymentInfo = await updateLaboratoryFormalPaymentInfo({
        laboratoryId: laboratoryId as string,
        ...values,
      });

      router.push("/panel/laboratories");
      form.reset();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <>
      <main>
        <h2 className='mb-10 px-5 text-center text-lg font-semibold'>
          New Payment Info
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 flex flex-wrap justify-between gap-2.5 px-5'>
            <FormField
              control={form.control}
              name='legalEntityName'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>legal Entity Name</FormLabel>
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

            <FormField
              control={form.control}
              name='economicNumber'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>economic Number</FormLabel>
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

            <FormField
              control={form.control}
              name='fullAddress'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>full Address</FormLabel>
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
            <FormField
              control={form.control}
              name='province'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>province</FormLabel>
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
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>city</FormLabel>
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

            <FormField
              control={form.control}
              name='nationalId'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>national Id</FormLabel>
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
            <FormField
              control={form.control}
              name='postalCode'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Postal Code</FormLabel>
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

            <FormField
              control={form.control}
              name='registrationNumber'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>registration Number</FormLabel>
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

            <Separator className='mx-auto my-2 w-8/12 opacity-0' />

            <div className='flex w-full justify-end'>
              <Button type='submit' className='mx-auto w-full max-w-2xs'>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
};

export default UpdateLaboratoryFormalPaymentInfoView;
