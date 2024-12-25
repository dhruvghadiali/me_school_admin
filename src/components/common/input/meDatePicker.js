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
} from "@MECommonComponents/input/meInputClassNameWrapper";

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
    inputVariant,
    labelVariant,
    messageVariant,
    onSelect,
  } = props;

  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label className={inputMessageClassNameByVariant(labelVariant)}>
        {label} {required && <span className="text-danger">*</span>}
      </Label>
      <div className="relative">
        <Popover open={open}>
          <PopoverTrigger asChild>
            <Button
              disabled={disabled}
              onClick={() => setOpen(true)}
              className={`${datePickerInputClassNameByVariant(inputVariant)} }`}
            >
              <div className="w-full ">
                {selectedDate && moment(selectedDate).isValid()
                  ? moment(selectedDate).format(
                      displayDateFormate ? displayDateFormate : "DD MMM YYYY"
                    )
                  : "DD/MM/YYYY"}
              </div>
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0" align="start">
            <Calendar
              initialFocus
              mode="single"
              fromDate={
                fromDate && moment(fromDate).isValid()
                  ? moment(fromDate).toDate()
                  : moment().toDate()
              }
              classNames={{
                day_today: "bg-dark text-secondary",
                day_selected: "bg-primary text-secondary",
              }}
              selected={
                selectedDate && moment(selectedDate).isValid()
                  ? moment(selectedDate).toDate()
                  : ""
              }
              onSelect={(date) => {
                onSelect(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
        <p
          className={`mt-2 text-xs ${inputMessageClassNameByVariant(
            messageVariant
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
  selectedDate: PropTypes.string,
  displayDateFormate: PropTypes.string,
  fromDate: PropTypes.string,
  message: PropTypes.string,
  inputVariant: PropTypes.string,
  labelVariant: PropTypes.string,
  messageVariant: PropTypes.string,
  onSelect: PropTypes.func,
};

export default MEDatePicker;
