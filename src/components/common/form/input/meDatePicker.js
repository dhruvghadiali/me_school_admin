import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Label } from "@MEShadcnComponents/label";
import { Button } from "@MEShadcnComponents/button";
import { Calendar } from "@MEShadcnComponents/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@MEShadcnComponents/popover";
import {
  datePickerInputClassNameByVariant,
  inputMessageClassNameByVariant,
} from "@MECommonComponents/form/input/meInputClassNameWrapper";

import PropTypes from "prop-types";
import moment from "moment";

const MEDatePicker = (props) => {
  const {
    required,
    disabled,
    label,
    selectedDate,
    displayDateFormate,
    fromDate,
    message,
    inputvariant,
    labelvariant,
    messagevariant,
    onSelect,
  } = props;

  const [open, setOpen] = useState(false);

  const toValidDate = (d) => {
    if (!d) return undefined;
    const m = moment(d);
    if (!m.isValid()) return undefined;
    return m.toDate();
  };

  return (
    <div className="space-y-2">
      <Label className={inputMessageClassNameByVariant(labelvariant)}>
        {label} {required && <span className="text-danger">*</span>}
      </Label>
      <div className="relative">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              disabled={disabled}
              onClick={() => setOpen(true)}
              className={`${datePickerInputClassNameByVariant(inputvariant)}`}
            >
              <div className="w-full ">
                {(() => {
                  const m = moment(selectedDate);
                  return m.isValid()
                    ? m.format(displayDateFormate ? displayDateFormate : "DD MMM YYYY")
                    : "DD/MM/YYYY";
                })()}
              </div>
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0" align="start">
            <Calendar
              initialFocus
              mode="single"
              fromDate={toValidDate(fromDate)}
              classNames={{
                day: "hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "text-muted-foreground opacity-50",
                head_cell: "text-muted-foreground font-normal",
                nav_button: "hover:bg-muted",
                caption_label: "text-sm font-medium",
              }}
              selected={toValidDate(selectedDate)}
              onSelect={(date) => {
                onSelect(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
        <p
          className={`mt-2 text-xs ${inputMessageClassNameByVariant(
            messagevariant
          )}`}
          role="alert"
          aria-live="polite"
        >
          {message}
        </p>
      </div>
    </div>
  );
};

MEDatePicker.propTypes = {
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  selectedDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  displayDateFormate: PropTypes.string,
  fromDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  message: PropTypes.string,
  inputvariant: PropTypes.string,
  labelvariant: PropTypes.string,
  messagevariant: PropTypes.string,
  onSelect: PropTypes.func,
};

export default MEDatePicker;
