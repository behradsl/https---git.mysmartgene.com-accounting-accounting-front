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
import { UserPosition } from "@/types/user-entity.type";
import { useCreateUser } from "@/hooks/api";
import { useRouter } from "next/navigation";
import { FC } from "react";

const formSchema = z.object({
  name: z.string().min(2, {}),
  position: z.nativeEnum(UserPosition, {}),
  phoneNumber: z.coerce.string({}).min(6, {}).max(17, {}),
  email: z.string({}).min(8, {}),
  password: z.string({}).min(5, {}),
});

const UserCreateView: FC<{ onSuccessfulSubmit?: () => void }> = ({
  onSuccessfulSubmit,
}) => {
  const { trigger: createUserCallback } = useCreateUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      position: UserPosition.FINANCE_MANAGER,
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newUser = await createUserCallback({
        ...values,
      });

      toast.success("User saved.");
      router.push("/panel/users/profiles");
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
            className='space-y-6 flex flex-wrap justify-between gap-2.5 px-5 pb-10'>
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

            <Separator className='mt-5 opacity-0' />

            <div className='ms-auto w-full md:w-5/12 px-6 flex justify-end'>
              <Button
                type='submit'
                className='w-full md:w-1/2 text-green-700 hover:text-green-700 outline-green-700 border-green-700 hover:bg-green-700/10'
                variant={"outline"}>
                Create User
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
};

export default UserCreateView;
