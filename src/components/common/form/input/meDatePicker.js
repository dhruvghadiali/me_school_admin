import { useMemo, useState } from "react";
import { format, isValid as isValidDate } from "date-fns";

import { CalendarIcon } from "lucide-react";
import { Label } from "@MEShadcnComponents/label";
import { Calendar } from "@MEShadcnComponents/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@MEShadcnComponents/popover";

import MEButton from "@MECommonComponents/form/button/meButton";

import "react-day-picker/style.css";

// MEDatePicker: single-date input with popover calendar
export default function MEDatePicker({
  required,
  disabled,
  label,
  selectedDate,
  defaultDate,
  displayDateFormate,
  fromDate,
  message,
  inputvariant,
  labelvariant,
  messagevariant,
  onSelect,
  placeholder = "DD/MM/YYYY",
  popoverModal = true,
  useDefaultAsSelected = true,
}) {
  const [open, setOpen] = useState(false);
  const [placeholderTextColor, setPlaceholderTextColor] = useState('text-muted-foreground');

  const normalizeFormat = (fmt) => {
    if (!fmt) return "dd MMM yyyy";
    return fmt.replaceAll("DD", "dd").replaceAll("YYYY", "yyyy");
  };

  const toDate = (val) => {
    if (!val) return undefined;
    if (val instanceof Date) return isValidDate(val) ? val : undefined;
    const d = new Date(val);
    return isValidDate(d) ? d : undefined;
  };

  const selected = useMemo(() => toDate(selectedDate), [selectedDate]);
  const defDate = useMemo(() => toDate(defaultDate), [defaultDate]);
  const minDate = useMemo(() => toDate(fromDate), [fromDate]);
  const disabledDays = useMemo(
    () => (minDate ? [{ before: minDate }] : undefined),
    [minDate]
  );

  const effectiveForDisplay = selected || defDate;
  const displayText = effectiveForDisplay
    ? format(effectiveForDisplay, normalizeFormat(displayDateFormate))
    : placeholder;

  return (
    <div className="space-y-2">
      {label && (
        <Label className={labelvariant}>
          {label} {required && <span className="text-danger">*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen} modal={popoverModal}>
        <PopoverTrigger asChild>
          <MEButton 
            disabled={disabled}
            className={`w-full border bg-transparent ${placeholderTextColor} font-normal shadow-xs transition-[color,box-shadow] hover:bg-transparent cursor-pointer`}>
            <span className="text-left truncate w-full">{displayText}</span>
            <CalendarIcon className="ml-2 h-4 w-4 text-dark" />
          </MEButton>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          sideOffset={8}
          className="z-50 w-auto p-0 bg-popover border border-border rounded-md shadow-lg"
        >
          <Calendar
            classNames={{
              today: "bg-danger/20 text-danger ring-1 ring-danger rounded-full",
              selected: "bg-dark text-danger-foreground rounded-full",
            }}
            mode="single"
            disabled={disabledDays}
            selected={selected || (useDefaultAsSelected ? defDate : undefined)}
            onSelect={(date) => {
              setPlaceholderTextColor(isValidDate(date) ? 'text-foreground' : 'text-muted-foreground');
              onSelect?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {message && (
        <p className={messagevariant} role="alert" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
}
