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
import { AppSidebar } from "@/components/app-sidebar.component";
import { SidebarProvider } from "@/components/ui/sidebar";

import { useParams, useRouter } from "next/navigation";
import { useCreateLaboratoryFormalPaymentInfo } from "@/hooks/api/use-laboratory.hook";

const formSchema = z.object({
  legalEntityName: z.string().nullable(),
  economicNumber: z.string().nullable(),
  nationalId: z.string().nullable(),
  fullAddress: z.string().nullable(),
  province: z.string().nullable(),
  city: z.string().nullable(),
  email: z.string().nullable(),
  registrationNumber: z.string().nullable(),
  postalCode: z.string().nullable(),
});

const CreateLaboratoryFormalPaymentInfoView = () => {
  const { laboratoryId } = useParams();
  // const { paymentInfo } = useLaboratoryFormalPaymentInfoFind(
  //   laboratoryId as string
  // );
  const router = useRouter();
  // const { trigger: findPaymentInfoCallback } =
  // useCreateLaboratoryFormalPaymentInfo();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      legalEntityName: "test",
      economicNumber: "123",
      nationalId: "123",
      fullAddress: "somewhere",
      province: "tehran",
      city: "tehran",
      email: "something@something.com",
      registrationNumber: "123",
      postalCode: "123",
    },
  });

  // useEffect(() => {
  //   (async () => {
  //     form.reset({ ...laboratory?.data });
  //   })();
  // }, [laboratory]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const createLaboratoryFormalPaymentInfo =
        useCreateLaboratoryFormalPaymentInfo();

      const newPaymentInfo = await createLaboratoryFormalPaymentInfo({
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
    <SidebarProvider>
      <AppSidebar />
      <main>
        <h2 className="mb-10 px-5 text-center text-lg font-semibold">
          New Laboratory
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-wrap justify-between gap-2.5 px-5"
          >
            <FormField
              control={form.control}
              name="legalEntityName"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>legal Entity Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      autoComplete="off"
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
              name="economicNumber"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      autoComplete="off"
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
              name="email"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      autoComplete="off"
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
              name="fullAddress"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      autoComplete="off"
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
              name="province"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>province</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      autoComplete="off"
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
              name="city"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>city</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      autoComplete="off"
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
              name="province"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      autoComplete="off"
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
              name="city"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Fax</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      autoComplete="off"
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
              name="nationalId"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>national Id</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      autoComplete="off"
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
              name="postalCode"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      autoComplete="off"
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
              name="registrationNumber"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>registration Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      autoComplete="off"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="mx-auto my-2 w-8/12 opacity-0" />

            <div className="flex w-full justify-end">
              <Button type="submit" className="mx-auto w-full max-w-2xs">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </SidebarProvider>
  );
};

export default CreateLaboratoryFormalPaymentInfoView;
