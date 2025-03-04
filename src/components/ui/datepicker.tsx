"use client";
import { ComponentProps, FC } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";

const DatePicker: FC<
  Omit<ComponentProps<typeof DayPicker>, "onChange" | "selected"> & {
    value?: Date;
    onChange: (date: Date | void) => void;
  }
> = ({ onChange, value, className }) => {
  const DatePickerFooter = (
    <div className='w-full flex justify-center'>
      {value ? (
        <Button
          className='mx-auto mt-2'
          variant={"ghost"}
          size={"sm"}
          onClick={() => onChange(undefined)}>
          Clear selection
        </Button>
      ) : null}
    </div>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className,
          )}>
          <CalendarIcon className='mr-2 h-4 w-4' />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={value}
          onSelect={onChange}
          captionLayout='dropdown'
          footer={DatePickerFooter}
        />
      </PopoverContent>
    </Popover>
  );
};

DatePicker.displayName = "DatePicker";
export default DatePicker;
