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
import {
  useCreateLaboratoryInvoicePayment,
  useLaboratoryInvoicePaymentFindMany,
} from "@/hooks/api/use-laboratory-invoice.hook";
import {
  InvoiceCurrencyType,
  LaboratoryInvoicePaymentEntity,
} from "@/types/laboratory-invoice.type";
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

interface LaboratoryInvoicePaymentsDialogViewProps {
  invoiceId: string;
  invoiceNumber: number;
  totalUsdPrice: string;
  outstandingAmount: string;
  onClose?: () => void;
}

const LaboratoryInvoicePaymentsDialogView = ({
  invoiceId,
  invoiceNumber,
  totalUsdPrice,
  outstandingAmount,
  onClose,
}: LaboratoryInvoicePaymentsDialogViewProps) => {
  const [paymentDate, setPaymentDate] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [currency, setCurrency] = useState<InvoiceCurrencyType>(
    InvoiceCurrencyType.USD,
  );
  const [usdExchangeRate, setUsdExchangeRate] = useState(1);
  const [notes, setNotes] = useState("");

  const [open, setOpen] = useState(false);
  const [initialTrigger, setInitialTrigger] = useState<void | string>();

  useEffect(() => {
    open ? setInitialTrigger("first") : null;
    !open && initialTrigger ? onClose?.() : null;
  }, [open]);

  const { trigger: createPayment } = useCreateLaboratoryInvoicePayment();
  const { laboratoryInvoicePayments, mutate: reloadPayments } =
    useLaboratoryInvoicePaymentFindMany();

  const handleSubmit = async () => {
    try {
      await createPayment(
        removeEmptyObjectsByKeys({
          LaboratoryInvoiceId: invoiceId,
          amountPaid,
          paymentDate,
          currency,
          //   usdExchangeRate: String(usdExchangeRate),
          notes,
        }) as LaboratoryInvoicePaymentEntity,
      );
      toast.success("Payment added successfully");
      reloadPayments();
      setOpen(false);
      onClose?.();
    } catch (error) {
      toast.error("Failed to add payment");
      console.error("Error adding payment:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className='text-primary border-1 border-transparent hover:border-primary/20 hover:text-primary'>
          Payments
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Invoice #{invoiceNumber} Payments</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label>Total Price (USD)</Label>
              <div className='text-lg font-semibold'>${totalUsdPrice}</div>
            </div>
            <div className='space-y-2'>
              <Label>Outstanding Amount</Label>
              <div className='text-lg font-semibold'>${outstandingAmount}</div>
            </div>
          </div>

          {Number(outstandingAmount) > 0 ? (
            <>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='paymentDate'>Payment Date</Label>
                  <DatePicker
                    value={paymentDate ? new Date(paymentDate) : undefined}
                    onChange={(date) =>
                      date ? setPaymentDate(date.toISOString()) : null
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='amountPaid'>Amount Paid</Label>
                  <Input
                    id='amountPaid'
                    type='number'
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                    placeholder='Enter amount'
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='currency'>Currency</Label>
                  <Select
                    value={currency}
                    onValueChange={(value) =>
                      setCurrency(value as InvoiceCurrencyType)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder='Select currency' />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(InvoiceCurrencyType).map(
                        ([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {key}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className='space-y-2'>
              <Label htmlFor='usdExchangeRate'>USD Exchange Rate</Label>
              <Input
                id='usdExchangeRate'
                type='number'
                value={usdExchangeRate}
                onChange={(e) => setUsdExchangeRate(Number(e.target.value))}
                placeholder='Enter exchange rate'
              />
            </div> */}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='notes'>Notes</Label>
                <Textarea
                  id='notes'
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder='Enter notes'
                />
              </div>
            </>
          ) : null}

          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {laboratoryInvoicePayments?.payments
                  ?.filter(
                    (payment) => payment.LaboratoryInvoiceId === invoiceId,
                  )
                  .map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        {payment.paymentDate
                          ? new Date(payment.paymentDate).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>{Number(payment.amountPaid||0).toLocaleString()}</TableCell>
                      <TableCell>{payment.currency}</TableCell>

                      <TableCell>{payment.notes}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={handleSubmit}>Add Payment</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LaboratoryInvoicePaymentsDialogView;
