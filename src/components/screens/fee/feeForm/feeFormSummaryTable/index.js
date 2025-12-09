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
  const { t } = useTranslation();

  return (
    <>
      <p className="mt-5 mb-2 text-xl font-semibold">
        {_.upperFirst(
          t("addFeeSummaryTableTitle", {
            defaultValue: addFeeSummaryTableTitle,
          })
        )}
      </p>
      <div className="bg-background flex-1 overflow-hidden rounded-md border mb-32">
        <Table>
          <TableHeader>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableHeaderInfo
                title={_.upperFirst(
                  t("summaryTableColumn1Title", {
                    defaultValue: summaryTableColumn1Title,
                  })
                )}
              />
              <TableHeaderInfo
                title={_.upperFirst(
                  t("summaryTableColumn2Title", {
                    defaultValue: summaryTableColumn2Title,
                  })
                )}
              />
              <TableHeaderInfo
                title={_.upperFirst(
                  t("summaryTableColumn3Title", {
                    defaultValue: summaryTableColumn3Title,
                  })
                )}
                subtitle={_.upperFirst(
                  t("summaryTableColumn3Subtitle", {
                    defaultValue: summaryTableColumn3Subtitle,
                  })
                )}
              />
              <TableHeaderInfo
                title={_.upperFirst(
                  t("summaryTableColumn4Title", {
                    defaultValue: summaryTableColumn4Title,
                  })
                )}
              />
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRowData
              data={{
                timePeriod: _.upperFirst(
                  t("summaryTableRow1Title", {
                    defaultValue: summaryTableRow1Title,
                  })
                ),
                actualFee: formData.monthlyFee,
                calculatedFee: formData.monthlyFee * 1,
                difference: 0,
              }}
            />
            <TableRowData
              data={{
                timePeriod: _.upperFirst(
                  t("summaryTableRow2Title", {
                    defaultValue: summaryTableRow2Title,
                  })
                ),
                actualFee: formData.quarterlyFee,
                calculatedFee: formData.monthlyFee * 3,
                difference: formData.quarterlyFee - formData.monthlyFee * 3,
              }}
            />
            <TableRowData
              data={{
                timePeriod: _.upperFirst(
                  t("summaryTableRow3Title", {
                    defaultValue: summaryTableRow3Title,
                  })
                ),
                actualFee: formData.halfYearlyFee,
                calculatedFee: formData.monthlyFee * 6,
                difference: formData.halfYearlyFee - formData.monthlyFee * 6,
              }}
            />
            <TableRowData
              data={{
                timePeriod: _.upperFirst(
                  t("summaryTableRow4Title", {
                    defaultValue: summaryTableRow4Title,
                  })
                ),
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
