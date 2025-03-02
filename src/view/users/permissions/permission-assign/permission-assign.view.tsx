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

const formSchema = z.object({
  position: z.nativeEnum(UserPosition, {}),
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

const PermissionAssignView = () => {
  const { positionName } = useParams();
  const { trigger: assignPermissionCallBack } = useRegistryUpsertFieldAccess();
  const { fieldAccesses } = useRegistryFieldAccessFindByPosition(
    positionName as string
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
            position:UserPosition[positionName as keyof typeof UserPosition],
            MotId: fieldAccessMap.MotId || AccessType.HIDDEN,
            name: fieldAccessMap.name || AccessType.HIDDEN,
            Laboratory: fieldAccessMap.Laboratory || AccessType.HIDDEN,
            serviceType: fieldAccessMap.serviceType || AccessType.HIDDEN,
            kitType: fieldAccessMap.kitType || AccessType.HIDDEN,
            urgentStatus: fieldAccessMap.urgentStatus || AccessType.HIDDEN,
            price: fieldAccessMap.price || AccessType.HIDDEN,
            description: fieldAccessMap.description || AccessType.HIDDEN,
            costumerRelationInfo:
              fieldAccessMap.costumerRelationInfo || AccessType.HIDDEN,
            KoreaSendDate: fieldAccessMap.KoreaSendDate || AccessType.HIDDEN,
            resultReady: fieldAccessMap.resultReady || AccessType.HIDDEN,
            resultReadyTime:
              fieldAccessMap.resultReadyTime || AccessType.HIDDEN,
            settlementStatus:
              fieldAccessMap.settlementStatus || AccessType.HIDDEN,
            invoiceStatus: fieldAccessMap.invoiceStatus || AccessType.HIDDEN,
            proformaSent: fieldAccessMap.proformaSent || AccessType.HIDDEN,
            proformaSentDate:
              fieldAccessMap.proformaSentDate || AccessType.HIDDEN,
            totalInvoiceAmount:
              fieldAccessMap.totalInvoiceAmount || AccessType.HIDDEN,
            installmentOne: fieldAccessMap.installmentOne || AccessType.HIDDEN,
            installmentOneDate:
              fieldAccessMap.installmentOneDate || AccessType.HIDDEN,
            installmentTwo: fieldAccessMap.installmentTwo || AccessType.HIDDEN,
            installmentTwoDate:
              fieldAccessMap.installmentTwoDate || AccessType.HIDDEN,
            installmentThree:
              fieldAccessMap.installmentThree || AccessType.HIDDEN,
            installmentThreeDate:
              fieldAccessMap.installmentThreeDate || AccessType.HIDDEN,
            totalPaid: fieldAccessMap.totalPaid || AccessType.HIDDEN,
            settlementDate: fieldAccessMap.settlementDate || AccessType.HIDDEN,
            officialInvoiceSent:
              fieldAccessMap.officialInvoiceSent || AccessType.HIDDEN,
            officialInvoiceSentDate:
              fieldAccessMap.officialInvoiceSentDate || AccessType.HIDDEN,
            sampleStatus: fieldAccessMap.sampleStatus || AccessType.HIDDEN,
            sendSeries: fieldAccessMap.sendSeries || AccessType.HIDDEN,
            createdAt: fieldAccessMap.createdAt || AccessType.HIDDEN,
            updatedAt: fieldAccessMap.updatedAt || AccessType.HIDDEN,
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
        (value) => value !== "position"
      );
      const permissions = fields.map((field) => {
        const permissionToAssign = {
          position: values.position,
          registryField: field,
          access: values[field as keyof Omit<typeof values, "position">],
        };
        return permissionToAssign;
      });

      const newPermission = await assignPermissionCallBack(permissions);
      console.log(newPermission);

      toast.success("access assigned.");
      router.push("/panel/users/permissions");
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
          New Permission
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex flex-wrap justify-between gap-2.5 px-5"
          >
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      defaultValue={positionName}
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="MotId"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>MOT ID</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="name"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="serviceType"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Service Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="kitType"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Kit Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="Laboratory"
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
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="price"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Price</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="urgentStatus"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Urgent Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="description"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Description</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="costumerRelationInfo"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Customer Relation Info</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="KoreaSendDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Korea Send Date</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="resultReady"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Result Ready</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="resultReadyTime"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Result Ready Time</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="settlementStatus"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Settlement Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="invoiceStatus"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Invoice Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="proformaSent"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Proforma Sent</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="proformaSentDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Proforma Sent Date</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="totalInvoiceAmount"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Total Invoice Amount</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="installmentOne"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Installment One</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="installmentOneDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Installment One Date</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="installmentTwo"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Installment Two</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="installmentTwoDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Installment Two Date</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="installmentThree"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Installment Three</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="installmentThreeDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Installment Three Date</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="totalPaid"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Total Paid</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="settlementDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Settlement Date</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="officialInvoiceSent"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Official Invoice Sent</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="officialInvoiceSentDate"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Official Invoice Sent Date</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="sampleStatus"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Sample Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
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
              name="sendSeries"
              render={({ field }) => (
                <FormItem className="w-full md:w-5/12">
                  <FormLabel>Send Series</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) =>
                        ref?.addEventListener("touchend", (e) =>
                          e.preventDefault()
                        )
                      }
                    >
                      {Object.keys(AccessType).map((access) => (
                        <SelectItem
                          key={`user-update-position-${access}`}
                          value={access}
                        >
                          {access}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default PermissionAssignView;
