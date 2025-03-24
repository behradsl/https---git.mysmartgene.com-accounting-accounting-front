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
import {
  useRegistryFieldAccessFindByPosition,
  useRegistryUpsertFieldAccess,
} from "@/hooks/api";
import { useParams, useRouter } from "next/navigation";
import { AccessType } from "@/types/registry-entity.type";
import { useEffect } from "react";
import {
  PermissionsDataTableRow,
  registryFields,
} from "../permissions-list/permissions-table-columns.data";
import { SidebarTrigger } from "@/components/ui/sidebar";

const formSchema = z.object({
  position: z.nativeEnum(UserPosition, {}),
  MotId: z.nativeEnum(AccessType, {}),

  Laboratory: z.nativeEnum(AccessType, {}),
  serviceType: z.nativeEnum(AccessType, {}),
  kitType: z.nativeEnum(AccessType, {}),
  urgentStatus: z.nativeEnum(AccessType, {}),
  description: z.nativeEnum(AccessType, {}),
  resultReadyTime: z.nativeEnum(AccessType, {}),
  sendSeries: z.nativeEnum(AccessType, {}),
  createdAt: z.nativeEnum(AccessType, {}),
  updatedAt: z.nativeEnum(AccessType, {}),
  registryCreatedBy: z.nativeEnum(AccessType, {}),
  registryUpdatedBy: z.nativeEnum(AccessType, {}),
  sampleType: z.nativeEnum(AccessType, {}),

  personName: z.nativeEnum(AccessType, {}),
  laboratoryId: z.nativeEnum(AccessType, {}),
  costumerRelationId: z.nativeEnum(AccessType, {}),
  productPriceUsd: z.nativeEnum(AccessType, {}),
  invoiceStatus: z.nativeEnum(AccessType, {}),
  sampleStatus: z.nativeEnum(AccessType, {}),

  dataSampleReceived: z.nativeEnum(AccessType, {}),
  sampleExtractionDate: z.nativeEnum(AccessType, {}),
  dataSentToKorea: z.nativeEnum(AccessType, {}),
  rawFileReceivedDate: z.nativeEnum(AccessType, {}),
  analysisCompletionDate: z.nativeEnum(AccessType, {}),
});

const PermissionAssignView = () => {
  const { positionName } = useParams();
  const { trigger: assignPermissionCallBack } = useRegistryUpsertFieldAccess();
  const { fieldAccesses } = useRegistryFieldAccessFindByPosition(
    positionName as string,
  );
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  useEffect(() => {
    (async () => {
      const fieldAccessMap = fieldAccesses?.data.reduce((acc, field) => {
        acc[field.registryField as keyof PermissionsDataTableRow] =
          field.access ?? AccessType.HIDDEN;
        return acc;
      }, {} as Record<keyof PermissionsDataTableRow, AccessType>);

      const formattedFieldAccesses = fieldAccessMap
        ? {
            position: UserPosition[positionName as keyof typeof UserPosition],

            MotId: fieldAccessMap.MotId || AccessType.HIDDEN,

            personName: fieldAccessMap.personName || AccessType.HIDDEN,
            invoiceStatus: fieldAccessMap.invoiceStatus || AccessType.HIDDEN,
            laboratoryId: fieldAccessMap.laboratoryId || AccessType.HIDDEN,
            Laboratory: fieldAccessMap.Laboratory || AccessType.HIDDEN,
            costumerRelationId:
              fieldAccessMap.costumerRelationId || AccessType.HIDDEN,
            serviceType: fieldAccessMap.serviceType || AccessType.HIDDEN,
            kitType: fieldAccessMap.kitType || AccessType.HIDDEN,
            sampleType: fieldAccessMap.sampleType || AccessType.HIDDEN,
            urgentStatus: fieldAccessMap.urgentStatus || AccessType.HIDDEN,
            description: fieldAccessMap.description || AccessType.HIDDEN,
            productPriceUsd:
              fieldAccessMap.productPriceUsd || AccessType.HIDDEN,
            dataSampleReceived:
              fieldAccessMap.dataSampleReceived || AccessType.HIDDEN,
            sampleExtractionDate:
              fieldAccessMap.sampleExtractionDate || AccessType.HIDDEN,
            dataSentToKorea:
              fieldAccessMap.dataSentToKorea || AccessType.HIDDEN,
            rawFileReceivedDate:
              fieldAccessMap.rawFileReceivedDate || AccessType.HIDDEN,
            analysisCompletionDate:
              fieldAccessMap.analysisCompletionDate || AccessType.HIDDEN,
            resultReadyTime:
              fieldAccessMap.resultReadyTime || AccessType.HIDDEN,
            sendSeries: fieldAccessMap.sendSeries || AccessType.HIDDEN,

            createdAt: fieldAccessMap.createdAt || AccessType.HIDDEN,
            updatedAt: fieldAccessMap.updatedAt || AccessType.HIDDEN,
            updatedBy: fieldAccessMap.updatedBy || AccessType.HIDDEN,
            registryCreatedBy:
              fieldAccessMap.registryCreatedBy || AccessType.HIDDEN,
            registryUpdatedBy:
              fieldAccessMap.registryUpdatedBy || AccessType.HIDDEN,
          }
        : undefined;
      form.reset(formattedFieldAccesses);
    })();
  }, [fieldAccesses]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const fields = Object.keys(values).filter(
        (value) => value !== "position",
      );
      console.log({ values, fields });
      const permissions = fields.map((field) => {
        const permissionToAssign = {
          position: values.position,
          registryField: field,
          access: values[field as keyof Omit<typeof values, "position">],
        };
        return permissionToAssign;
      });

      const newPermission = await assignPermissionCallBack({
        registryFieldAccesses: permissions,
      });

      toast.success("access assigned.");
      router.push("/panel/users/permissions");
      form.reset();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <>
      <main className='my-6'>
        <header className='mb-8 flex items-center'>
          <SidebarTrigger className='mr-4' />
          <h1 className='text-2xl font-bold'>
            User Access Permissions ({form.getValues().position})
          </h1>
        </header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (data) =>
              console.warn({ data }),
            )}
            className='space-y-6 flex flex-wrap justify-between gap-2.5 px-5 pb-10'>
            {/* <FormField
              control={form.control}
              name='position'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='off'
                      defaultValue={positionName}
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name='sampleStatus'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Sample Status</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='MotId'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>MOT ID</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='personName'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Person Name</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='costumerRelationId'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>costumer Relation Agent</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='serviceType'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Service Type</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='kitType'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Kit Type</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='urgentStatus'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Urgent Status</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='sampleType'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Sample Type</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='invoiceStatus'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Invoice Status</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='description'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Description</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='productPriceUsd'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Product Price (USD)</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='dataSampleReceived'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Data Sample Received</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='sampleExtractionDate'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Sample Extraction Date</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='dataSentToKorea'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Data Sent To Korea</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='rawFileReceivedDate'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Raw File Received Date</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='analysisCompletionDate'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Analysis Completion Date</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='resultReadyTime'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Result Ready Time</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='sendSeries'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Send Series</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='registryCreatedBy'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Registry Created By</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name='registryUpdatedBy'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Registry Updated By</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='createdAt'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>created At</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
              name='updatedAt'
              render={({ field }) => (
                <FormItem className='w-full md:w-5/12'>
                  <FormLabel>Updated At</FormLabel>
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
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault(),
                        )
                      }>
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}>
                          {access}
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
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
};

export default PermissionAssignView;
