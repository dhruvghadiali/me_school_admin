import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Clock } from "lucide-react";

import { Label } from "@MEShadcnComponents/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@MEShadcnComponents/popover";
import {
  inputClassNameByVariant,
  inputMessageClassNameByVariant,
} from "@MECommonComponents/form/input/meInputClassNameWrapper";
import { useIsMobile } from "@/hooks/use-mobile";

import _ from "lodash";
import PropTypes from "prop-types";

// --- Constants ---
const ITEM_HEIGHT = 36;
const VISIBLE_ITEMS = 5;
const REPEAT_COUNT = 100;
const CENTER_PAD = Math.floor(VISIBLE_ITEMS / 2);

const HOURS = _.range(1, 13);
const MINUTES = _.range(0, 60);
const PERIODS = ["AM", "PM"];

const pad = (n) => String(n).padStart(2, "0");

// --- Time helpers ---
const parse24hTime = (value) => {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) {
    return { hour12: 12, minute: 0, period: "AM" };
  }
  const [hStr, mStr] = value.split(":");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  const period = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return { hour12: h, minute: m, period };
};

const to24hTime = (hour12, minute, period) => {
  let h = hour12;
  if (period === "AM" && h === 12) h = 0;
  else if (period === "PM" && h !== 12) h += 12;
  return `${pad(h)}:${pad(minute)}`;
};

const formatDisplay = (value) => {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) return "";
  const { hour12, minute, period } = parse24hTime(value);
  return `${pad(hour12)}:${pad(minute)} ${period}`;
};

// --- Scroll helpers ---
const getScrollCenter = (el, itemHeight) =>
  el.scrollTop + CENTER_PAD * itemHeight;

const getCenterIndex = (el, itemHeight, totalLen) =>
  Math.max(0, Math.min(Math.round(getScrollCenter(el, itemHeight) / itemHeight), totalLen - 1));

const scrollToIndex = (el, idx, itemHeight, smooth = false) => {
  const top = idx * itemHeight - CENTER_PAD * itemHeight;
  if (smooth) {
    el.scrollTo({ top, behavior: "smooth" });
  } else {
    el.scrollTop = top;
  }
};

// --- ScrollColumn ---
const ScrollColumn = ({ items, selected, onSelect, formatItem, itemHeight }) => {
  const containerRef = useRef(null);
  const isAdjusting = useRef(false);
  const scrollTimer = useRef(null);
  const [centerIdx, setCenterIdx] = useState(-1);

  const repeatedItems = useMemo(() => {
    const result = [];
    for (let i = 0; i < REPEAT_COUNT; i++) {
      for (const item of items) result.push(item);
    }
    return result;
  }, [items]);

  const middleBatchStart = Math.floor(REPEAT_COUNT / 2) * items.length;
  const selectedIdx = items.indexOf(selected);
  const targetIndex = middleBatchStart + (selectedIdx >= 0 ? selectedIdx : 0);

  // Scroll to selected on mount / external change
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    isAdjusting.current = true;
    scrollToIndex(el, targetIndex, itemHeight);
    setCenterIdx(targetIndex);
    requestAnimationFrame(() => {
      isAdjusting.current = false;
    });
  }, [selected, targetIndex, itemHeight]);

  const recenterIfNeeded = useCallback(() => {
    const el = containerRef.current;
    if (!el || isAdjusting.current) return;
    const totalHeight = repeatedItems.length * itemHeight;
    const threshold = items.length * itemHeight * 5;
    if (
      el.scrollTop < threshold ||
      el.scrollTop > totalHeight - threshold - el.clientHeight
    ) {
      isAdjusting.current = true;
      const cur = Math.round(getScrollCenter(el, itemHeight) / itemHeight);
      const posInBatch = ((cur % items.length) + items.length) % items.length;
      scrollToIndex(el, middleBatchStart + posInBatch, itemHeight);
      requestAnimationFrame(() => {
        isAdjusting.current = false;
      });
    }
  }, [repeatedItems.length, items.length, middleBatchStart, itemHeight]);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    // Update center highlight in real-time
    const idx = getCenterIndex(el, itemHeight, repeatedItems.length);
    setCenterIdx(idx);

    if (isAdjusting.current) return;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      if (!el || isAdjusting.current) return;
      const clamped = getCenterIndex(el, itemHeight, repeatedItems.length);
      const actualItem = repeatedItems[clamped];
      if (actualItem !== selected) onSelect(actualItem);
      isAdjusting.current = true;
      scrollToIndex(el, clamped, itemHeight, true);
      setTimeout(() => {
        isAdjusting.current = false;
        recenterIfNeeded();
      }, 150);
    }, 80);
  }, [repeatedItems, selected, onSelect, recenterIfNeeded, itemHeight]);

  const handleItemClick = (item, idx) => {
    isAdjusting.current = true;
    onSelect(item);
    const el = containerRef.current;
    if (!el) return;
    scrollToIndex(el, idx, itemHeight, true);
    setTimeout(() => {
      isAdjusting.current = false;
    }, 300);
  };

  return (
    <div className="relative">
      {/* Center highlight bar */}
      <div
        className="pointer-events-none absolute left-0 right-0 z-10 rounded-sm bg-primary"
        style={{ top: CENTER_PAD * itemHeight, height: itemHeight }}
      />
      <div
        ref={containerRef}
        className="relative overflow-y-auto scrollbar-none"
        style={{
          height: VISIBLE_ITEMS * itemHeight,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onScroll={handleScroll}
      >
        <div style={{ height: repeatedItems.length * itemHeight }}>
          {repeatedItems.map((item, i) => (
            <div
              key={i}
              onClick={() => handleItemClick(item, i)}
              className={`relative z-20 flex items-center justify-center cursor-pointer transition-colors duration-100 select-none ${
                i === centerIdx
                  ? "text-secondary font-semibold text-sm"
                  : "text-primary/40 text-xs hover:text-primary/60"
              }`}
              style={{ height: itemHeight }}
            >
              {formatItem ? formatItem(item) : item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- METimePicker ---
const METimePicker = ({
  required,
  label,
  value,
  message,
  disabled,
  inputvariant,
  labelvariant,
  messagevariant,
  onValueChange,
}) => {
  const { hour12, minute, period } = useMemo(() => parse24hTime(value), [value]);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const itemHeight = isMobile ? 44 : ITEM_HEIGHT;

  const handleChange = (h, m, p) => onValueChange(to24hTime(h, m, p));

  return (
    <div className="space-y-1 sm:space-y-2">
      {label && (
        <Label className={`text-xs sm:text-sm ${inputMessageClassNameByVariant(labelvariant)}`}>
          {label} {required && <span className="text-danger">*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={`flex h-9 w-full items-center rounded-md border bg-transparent px-2 sm:px-3 py-1 text-xs sm:text-sm shadow-xs transition-[color,box-shadow] outline-none ${inputClassNameByVariant(inputvariant)} ${
              disabled ? "pointer-events-none opacity-50" : "cursor-pointer"
            }`}
          >
            <Clock className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 opacity-50" />
            <span className={value ? "" : "text-muted-foreground"}>
              {value ? formatDisplay(value) : "-- : -- --"}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex py-1 sm:py-2">
            <div className="relative w-14 sm:w-20 px-1 sm:px-2">
              <ScrollColumn
                items={HOURS}
                selected={hour12}
                onSelect={(h) => handleChange(h, minute, period)}
                formatItem={pad}
                itemHeight={itemHeight}
              />
            </div>
            <div className="relative w-14 sm:w-20 px-1 sm:px-2">
              <ScrollColumn
                items={MINUTES}
                selected={minute}
                onSelect={(m) => handleChange(hour12, m, period)}
                formatItem={pad}
                itemHeight={itemHeight}
              />
            </div>
            <div className="flex flex-col items-start justify-start w-11 sm:w-14 gap-0.5 sm:gap-1 px-0.5 sm:px-1">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleChange(hour12, minute, p)}
                  className={`w-full rounded-sm text-xs sm:text-sm py-1.5 sm:py-2 font-medium transition-all duration-150 cursor-pointer ${
                    period === p
                      ? "bg-primary text-secondary"
                      : "text-primary/50 hover:text-primary/70 hover:bg-primary/5"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <p
        className={`mt-1 sm:mt-2 mb-3 sm:mb-5 text-xs ${inputMessageClassNameByVariant(messagevariant)}`}
        role="alert"
        aria-live="polite"
      >
        {message}
      </p>
    </div>
  );
};

METimePicker.displayName = "METimePicker";

METimePicker.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  message: PropTypes.string,
  disabled: PropTypes.bool,
  inputvariant: PropTypes.string,
  labelvariant: PropTypes.string,
  messagevariant: PropTypes.string,
  onValueChange: PropTypes.func,
};

export default METimePicker;
