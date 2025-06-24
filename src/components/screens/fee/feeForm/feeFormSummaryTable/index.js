import { useTranslation } from "react-i18next";

import {
  Table,
  TableRow,
  TableBody,
  TableHeader,
} from "@MEShadcnComponents/table";
import {
  summaryTableRow1Title,
  summaryTableRow2Title,
  summaryTableRow3Title,
  summaryTableRow4Title,
  addFeeSummaryTableTitle,
  summaryTableColumn1Title,
  summaryTableColumn2Title,
  summaryTableColumn3Title,
  summaryTableColumn4Title,
  summaryTableColumn3Subtitle,
} from "@MELocalization/en";

import _ from "lodash";

import TableRowData from "@MEScreenComponents/fee/feeForm/feeFormSummaryTable/tableRowData";
import TableHeaderInfo from "@MEScreenComponents/fee/feeForm/feeFormSummaryTable/tableHeaderInfo";

const FeeFormSummaryTable = ({ formData }) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <p className="mt-5 mb-2 text-xl font-semibold">
        {i18n.exists("addFeeSummaryTableTitle")
          ? _.upperFirst(t("addFeeSummaryTableTitle"))
          : _.upperFirst(addFeeSummaryTableTitle)}
      </p>
      <div className="bg-background flex-1 overflow-hidden rounded-md border mb-32">
        <Table>
          <TableHeader>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableHeaderInfo
                title={
                  i18n.exists("summaryTableColumn1Title")
                    ? _.upperFirst(t("summaryTableColumn1Title"))
                    : _.upperFirst(summaryTableColumn1Title)
                }
              />
              <TableHeaderInfo
                title={
                  i18n.exists("summaryTableColumn2Title")
                    ? _.upperFirst(t("summaryTableColumn2Title"))
                    : _.upperFirst(summaryTableColumn2Title)
                }
              />
              <TableHeaderInfo
                title={
                  i18n.exists("summaryTableColumn3Title")
                    ? _.upperFirst(t("summaryTableColumn3Title"))
                    : _.upperFirst(summaryTableColumn3Title)
                }
                subtitle={
                  i18n.exists("summaryTableColumn3Subtitle")
                    ? _.upperFirst(t("summaryTableColumn3Subtitle"))
                    : _.upperFirst(summaryTableColumn3Subtitle)
                }
              />
              <TableHeaderInfo
                title={
                  i18n.exists("summaryTableColumn4Title")
                    ? _.upperFirst(t("summaryTableColumn4Title"))
                    : _.upperFirst(summaryTableColumn4Title)
                }
              />
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRowData
              data={{
                timePeriod: i18n.exists("summaryTableRow1Title")
                  ? _.upperFirst(t("summaryTableRow1Title"))
                  : _.upperFirst(summaryTableRow1Title),
                actualFee: formData.monthlyFee,
                calculatedFee: formData.monthlyFee * 1,
                difference: 0,
              }}
            />
            <TableRowData
              data={{
                timePeriod: i18n.exists("summaryTableRow2Title")
                  ? _.upperFirst(t("summaryTableRow2Title"))
                  : _.upperFirst(summaryTableRow2Title),
                actualFee: formData.quarterlyFee,
                calculatedFee: formData.monthlyFee * 3,
                difference: formData.quarterlyFee - formData.monthlyFee * 3,
              }}
            />
            <TableRowData
              data={{
                timePeriod: i18n.exists("summaryTableRow3Title")
                  ? _.upperFirst(t("summaryTableRow3Title"))
                  : _.upperFirst(summaryTableRow3Title),
                actualFee: formData.halfYearlyFee,
                calculatedFee: formData.monthlyFee * 6,
                difference: formData.halfYearlyFee - formData.monthlyFee * 6,
              }}
            />
            <TableRowData
              data={{
                timePeriod: i18n.exists("summaryTableRow4Title")
                  ? _.upperFirst(t("summaryTableRow4Title"))
                  : _.upperFirst(summaryTableRow4Title),
                actualFee: formData.yearlyFee,
                calculatedFee: formData.monthlyFee * 12,
                difference: formData.yearlyFee - formData.monthlyFee * 12,
              }}
            />
          </TableBody>
        </Table>
      </div>
    </>
  );
};

FeeFormSummaryTable.propTypes = {};

export default FeeFormSummaryTable;
