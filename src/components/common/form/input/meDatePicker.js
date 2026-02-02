import { useMemo, useState } from "react";
import { format, isValid as isValidDate, setHours, setMinutes } from "date-fns";

import { CalendarIcon, Clock } from "lucide-react";
import { Label } from "@MEShadcnComponents/label";
import { Calendar } from "@MEShadcnComponents/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@MEShadcnComponents/popover";
import {
  inputMessageClassNameByVariant,
} from "@MECommonComponents/form/input/meInputClassNameWrapper";

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
  popoverTriggerClassName = "",
  showTime = false,
  enableTime = false,
}) {
  const [open, setOpen] = useState(false);
  const [placeholderTextColor, setPlaceholderTextColor] = useState(
    "text-muted-foreground",
  );
  const [selectedTime, setSelectedTime] = useState(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      const hours24 = date.getHours();
      return {
        hours: hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24,
        minutes: date.getMinutes(),
        period: hours24 >= 12 ? "PM" : "AM",
      };
    }
    return { hours: 12, minutes: 0, period: "AM" };
  });

  const normalizeFormat = (fmt) => {
    if (!fmt) return showTime ? "dd MMM yyyy hh:mm a" : "dd MMM yyyy";
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
    [minDate],
  );

  const effectiveForDisplay = selected || defDate;
  const displayText = effectiveForDisplay
    ? format(effectiveForDisplay, normalizeFormat(displayDateFormate))
    : placeholder;

  const handleTimeChange = (type, value) => {
    setSelectedTime((prev) => ({
      ...prev,
      [type]: type === "hours" || type === "minutes" ? parseInt(value) : value,
    }));
  };

  const convertTo24Hour = (hours12, period) => {
    if (period === "AM") {
      return hours12 === 12 ? 0 : hours12;
    } else {
      return hours12 === 12 ? 12 : hours12 + 12;
    }
  };

  const handleDateSelect = (date) => {
    if (!date) return;
    
    let finalDate = date;
    if (showTime || enableTime) {
      const hours24 = convertTo24Hour(selectedTime.hours, selectedTime.period);
      finalDate = setHours(setMinutes(date, selectedTime.minutes), hours24);
    }
    
    setPlaceholderTextColor(
      isValidDate(finalDate) ? "text-foreground" : "text-muted-foreground",
    );
    
    if (!showTime && !enableTime) {
      onSelect?.(finalDate);
      setOpen(false);
    } else {
      onSelect?.(finalDate);
    }
  };

  const handleApplyTime = () => {
    if (selected) {
      const hours24 = convertTo24Hour(selectedTime.hours, selectedTime.period);
      const finalDate = setHours(setMinutes(selected, selectedTime.minutes), hours24);
      onSelect?.(finalDate);
    }
    setOpen(false);
  };

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
            className={`w-full border bg-transparent ${placeholderTextColor} font-normal shadow-xs transition-[color,box-shadow] hover:bg-transparent cursor-pointer ${popoverTriggerClassName}`}
          >
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
            onSelect={handleDateSelect}
          />
          
          {(showTime || enableTime) && (
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Select Time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Hours</label>
                  <select
                    value={selectedTime.hours}
                    onChange={(e) => handleTimeChange("hours", e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                      <option key={hour} value={hour}>
                        {hour.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="text-lg font-bold mt-5">:</span>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Minutes</label>
                  <select
                    value={selectedTime.minutes}
                    onChange={(e) => handleTimeChange("minutes", e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i}>
                        {i.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Period</label>
                  <select
                    value={selectedTime.period}
                    onChange={(e) => handleTimeChange("period", e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
              <MEButton
                onClick={handleApplyTime}
                className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Apply
              </MEButton>
            </div>
          )}
        </PopoverContent>
      </Popover>
      {message && (
        <p
          className={`mb-5 text-xs ${inputMessageClassNameByVariant(
            messagevariant,
          )}`}
          role="alert"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </div>
  );
}
