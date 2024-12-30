import { Accordion } from "@MEShadcnComponents/accordion";
import { ScrollArea } from "@MEShadcnComponents/scroll-area";
import { formHistory } from "@MEScreenComponents/admission/formDetail/accordionList";

import AdmissionScreenFormDetailAccordionItem from "@MEScreenComponents/admission/formDetail/formDetailAccordionItem";

const AdmissionScreenFormDetailHistory = () => {
  return (
    <>
      <ScrollArea className="max-h-[70vh]">
        <div className="border-r border-secondary pr-5">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="0"
          >
            {formHistory.map((item) => (
              <AdmissionScreenFormDetailAccordionItem item={item} />
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </>
  );
};

AdmissionScreenFormDetailHistory.prototype = {};

export default AdmissionScreenFormDetailHistory;
