import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formateStringWithLodash } from "@MEUtils/utilityFunctions";
import { AccordionContent, AccordionItem } from "@MEShadcnComponents/accordion";
import { admissionHub } from "@MELocalizationEn/admission/admissionTranslationEn";

import _ from "lodash";
import PropTypes from "prop-types";

import * as AccordionPrimitive from "@radix-ui/react-accordion";

const AdmissionScreenFormDetailAccordionItem = ({ item }) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <AccordionItem value={item.id} key={item.id} className="py-2">
        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
            <span className="flex items-center gap-3 ">
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-dark"
                aria-hidden="true"
              >
                <item.icon
                  size={16}
                  strokeWidth={2}
                  className="opacity-60 text-secondary"
                />
              </span>
              <span className="flex flex-col space-y-1">
                <span>
                  {i18n.exists(item.title)
                    ? formateStringWithLodash(t(item.title), _.startCase)
                    : formateStringWithLodash(
                        admissionHub.admissionFromDetailAccordionItemTitle,
                        _.toUpper
                      )}
                </span>
                {item.sub && (
                  <span className="text-sm font-normal">
                    {i18n.exists(item.sub)
                    ? formateStringWithLodash(t(item.sub), _.startCase)
                    : formateStringWithLodash(
                        admissionHub.admissionFromDetailAccordionItemSubtitle,
                        _.toUpper
                      )}
                  </span>
                )}
              </span>
            </span>
            <Plus
              size={16}
              strokeWidth={2}
              className="shrink-0 opacity-60 transition-transform duration-200"
              aria-hidden="true"
            />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionContent className="ms-3 pb-2 ps-10 text-muted-foreground">
          {item.content}
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

AdmissionScreenFormDetailAccordionItem.prototype = {
  item: PropTypes.any,
};

export default AdmissionScreenFormDetailAccordionItem;
