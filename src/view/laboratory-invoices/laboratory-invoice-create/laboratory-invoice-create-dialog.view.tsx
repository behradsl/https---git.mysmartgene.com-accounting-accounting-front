"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCreateLaboratoryInvoice } from "@/hooks/api/use-laboratory-invoice.hook";
import { useUpdateRegistry } from "@/hooks/api/use-registry.hook";
import { InvoiceCurrencyType } from "@/types/laboratory-invoice.type";
import DatePicker from "@/components/ui/datepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { removeEmptyObjectsByKeys } from "@/utilities/object";
import { toast } from "sonner";
import { RegistryEntity } from "@/types/registry-entity.type";

interface LaboratoryInvoiceCreateDialogViewProps {
  selectedRegistries: any[];
  onClose?: () => void;
}

const LaboratoryInvoiceCreateDialogView = ({
  selectedRegistries,
  onClose,
}: LaboratoryInvoiceCreateDialogViewProps) => {
  const [paymentDueDate, setPaymentDueDate] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [notes, setNotes] = useState("");
  const [editedPrices, setEditedPrices] = useState<Record<string, string>>({});

  const [open, setOpen] = useState(false);
  const [initialTrigger, setInitialTrigger] = useState<void | string>();
  useEffect(() => {
    open ? setInitialTrigger("first") : null;
    !open && initialTrigger ? onClose?.() : null;
  }, [open]);
  const [usdExchangeRate, setUsdExchangeRate] = useState(1);

  const { trigger: createInvoice } = useCreateLaboratoryInvoice();
  const { trigger: updateRegistry } = useUpdateRegistry();

  const handleSubmit = async () => {
    try {
      const updatedRegistries = selectedRegistries.map((registry) => ({
        ...registry,
        productPriceUsd: editedPrices[registry.id] || registry.productPriceUsd,
      }));

      for (const registry of updatedRegistries) {
        await updateRegistry({
          ids: [registry.id],
          productPriceUsd: registry.productPriceUsd,
        } as RegistryEntity);
      }
      // First update the registry records with new prices

      // Then create the invoice
      await createInvoice(
        removeEmptyObjectsByKeys({
          registryIds: updatedRegistries.map((registry) => registry.id),
          paymentDueDate,
          invoiceDate,
          usdExchangeRate: String(usdExchangeRate),
          notes,
        }) as Parameters<typeof createInvoice>[0],
      );

      toast.success("Invoice created successfully");
      onClose?.();
      setOpen(false);
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast.error("Failed to create invoice");
    }
  };

  const handlePriceChange = (registryId: string, value: string) => {
    setEditedPrices((prev) => ({
      ...prev,
      [registryId]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} disabled={selectedRegistries.length === 0}>
          Create Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Create Laboratory Invoice</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='invoiceDate'>Invoice Date</Label>
              <DatePicker
                value={invoiceDate ? new Date(invoiceDate) : undefined}
                onChange={(date) =>
                  date ? setInvoiceDate(date.toISOString()) : null
                }
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='paymentDueDate'>Payment Due Date</Label>
              <DatePicker
                value={paymentDueDate ? new Date(paymentDueDate) : undefined}
                onChange={(date) =>
                  date ? setPaymentDueDate(date.toISOString()) : null
                }
              />
            </div>
            {/* <div className='space-y-2'>
              <Label htmlFor='currency'>Currency</Label>
              <Select
                onValueChange={(value) =>
                  setCurrency(value as InvoiceCurrencyType)
                }
                value={currency || ""}
                dir='rtl'>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select a laboratory' />
                </SelectTrigger>

                <SelectContent
                  ref={(ref) =>
                    // Temporary workaround from https://github.com/shadcn-ui/ui/issues/1220
                    ref?.addEventListener("touchend", (e) => e.preventDefault())
                  }>
                  {Object.keys(InvoiceCurrencyType).map((curr) => (
                    <SelectItem key={`service-type-${curr}`} value={curr}>
                      {curr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
            <div className='space-y-2'>
              <Label htmlFor='usdExchangeRate'>USD Exchange Rate</Label>
              <Input
                id='usdExchangeRate'
                type='number'
                value={usdExchangeRate}
                onChange={(e) => setUsdExchangeRate(Number(e.target.value))}
                placeholder='Enter USD exchange rate'
              />
            </div>
            <div className='w-full space-y-2'>
              <Label htmlFor='notes'>Extra Notes</Label>
              <Textarea
                id='notes'
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder='Enter extra notes ...'
              />
            </div>
          </div>

          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Registry ID</TableHead>
                  <TableHead>Person Name</TableHead>
                  <TableHead>Kit Type</TableHead>
                  <TableHead>Product Price (USD)</TableHead>
                  <TableHead>Service Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedRegistries.map((registry) => (
                  <TableRow key={registry.id}>
                    <TableCell>{registry.id}</TableCell>
                    <TableCell>{registry.personName}</TableCell>
                    <TableCell>{registry.kitType}</TableCell>
                    <TableCell>
                      <Input
                        type='number'
                        value={
                          editedPrices[registry.id] ||
                          registry.productPriceUsd ||
                          ""
                        }
                        onChange={(e) =>
                          handlePriceChange(registry.id, e.target.value)
                        }
                        placeholder='Enter price'
                        className='w-32'
                      />
                    </TableCell>
                    <TableCell>{registry.serviceType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Create Invoice</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LaboratoryInvoiceCreateDialogView;
