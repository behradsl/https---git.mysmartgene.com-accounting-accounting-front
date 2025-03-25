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
import { useCreateRegistry, useUserFindMany } from "@/hooks/api";
import {
  RegistryKitType,
  RegistryServiceType,
  SampleStatus,
  SampleType,
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
  MotId: z.string().min(1),
  personName: z.string().min(1),
  laboratoryId: z.string().min(1),
  costumerRelationId: z.string().min(1).optional(),
  serviceType: z.nativeEnum(RegistryServiceType, {}),
  kitType: z.nativeEnum(RegistryKitType, {}),
  sampleType: z.nativeEnum(SampleType, {}),
  urgentStatus: z.boolean().optional(),
  description: z.string().min(1).optional(),
  productPriceUsd: z.string().min(1).optional(),

  dataSampleReceived: z.string(),
  sampleExtractionDate: z.string().optional(),
  dataSentToKorea: z.string().optional(),
  rawFileReceivedDate: z.string().optional(),
  analysisCompletionDate: z.string().optional(),
  resultReadyTime: z.string().optional(),
  sendSeries: z.number(),
});

const RegistryCreateView: FC<{ onSuccessfulSubmit?: () => void }> = ({
  onSuccessfulSubmit,
}) => {
  const { laboratories } = useLaboratoryFindMany();
  const { users } = useUserFindMany();

  const { trigger: createRegistryCallback } = useCreateRegistry();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      MotId: undefined,

      laboratoryId: undefined,
      serviceType: undefined,
      kitType: undefined,
      urgentStatus: false,
      productPriceUsd: undefined,
      description: undefined,
      costumerRelationId: undefined,

      resultReadyTime: undefined,
      analysisCompletionDate: undefined,
      rawFileReceivedDate: undefined,
      dataSentToKorea: undefined,
      dataSampleReceived: undefined,
      sendSeries: undefined,
      personName: undefined,
      sampleType: undefined,
      sampleExtractionDate: undefined,
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
      <main className="my-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex flex-wrap justify-between gap-2.5 px-5 pb-10"
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
              name="personName"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Person Name</FormLabel>
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
                          key={`laboratory-id-${laboratory?.id}`}
                          value={laboratory?.id ?? ""}
                        >
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
              name="costumerRelationId"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Costumer Relations Agent</FormLabel>
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
                      {(users?.data ?? []).map((user) => (
                        <SelectItem
                          key={`user-id-${user?.id}`}
                          value={user?.id ?? ""}
                        >
                          {user?.name}
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
              name="serviceType"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Service Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      dir="rtl"
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a service type" />
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
                        {Object.keys(RegistryServiceType).map((service) => (
                          <SelectItem
                            key={`service-type-${service}`}
                            value={service}
                          >
                            {service}
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
              name="kitType"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Kit Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      dir="rtl"
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a kit type" />
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
                        {Object.keys(RegistryKitType).map((kit) => (
                          <SelectItem key={`kit-type-${kit}`} value={kit}>
                            {kit}
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
              name="sampleType"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Sample Type</FormLabel>
                  <FormControl>
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
                        {Object.keys(SampleType).map((sample) => (
                          <SelectItem
                            key={`sample-type-${sample}`}
                            value={sample}
                          >
                            {sample}
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
              name="urgentStatus"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12 flex justify-between items-center">
                  <FormLabel>Urgent Status</FormLabel>
                  <FormControl>
                    <Switch
                      className="mx-2"
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
              name="productPriceUsd"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Product Price (USD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataSampleReceived"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Data Sample Received</FormLabel>
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
              name="sampleExtractionDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Sample Extraction Date</FormLabel>
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
              name="dataSentToKorea"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Data Sent To Korea</FormLabel>
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
              name="rawFileReceivedDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>RawFile Received Date</FormLabel>
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
              name="analysisCompletionDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Analysis Completion Date</FormLabel>
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
              name="resultReadyTime"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Result Ready Time</FormLabel>
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
              name="sendSeries"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Send Series</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      autoComplete="off"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="mt-5 opacity-0" />

            <div className="ms-auto w-full md:w-5/12 px-6 flex justify-end">
              <Button
                type="submit"
                className="w-full md:w-1/2 text-green-700 hover:text-green-700 outline-green-700 border-green-700 hover:bg-green-700/10"
                variant={"outline"}
              >
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
