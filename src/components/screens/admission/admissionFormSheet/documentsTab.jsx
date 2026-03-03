import { useSelector } from "react-redux";
import { FileCheck, FileX, Files } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@MEShadcnComponents/card";

import _ from "lodash";

import MEAlertCardComponent from "@MECommonComponents/card/alertCard";

const DocumentsTab = () => {
  const { selectedAdmissionApplication } = useSelector(
    (state) => state.admissionApplication,
  );

  // Mock data for now - replace with actual data from application
  const documents = _.get(selectedAdmissionApplication, "documents", []);

  if (!documents || documents.length === 0) {
    return (
      <MEAlertCardComponent
        icon={
          <Files className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary/50" />
        }
        alertText="No documents available"
        alertMessage="Documents will appear here once available"
      />
    );
  }

  return (
    <Card className="bg-secondary/50 shadow-lg shadow-primary/50">
      <CardHeader>
        <CardTitle>{_.upperCase("Document Verification List")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {_.map(documents, (document, index) => (
            <div
              key={index}
              className="space-y-1 border border-primary/30 rounded-md px-5 py-4 hover:cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    document.isVerified ? "bg-success/20 " : "bg-danger/20 "
                  }`}
                >
                  {document.isVerified ? (
                    <FileCheck className="w-5 h-5 text-success" />
                  ) : (
                    <FileX className="w-5 h-5 text-danger" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-semibold text-primary  mb-1 truncate">
                    {_.toUpper(_.get(document, "admissionDocument", "N/A"))}
                  </h5>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        document.isRequired
                          ? "bg-danger text-secondary"
                          : "bg-warning text-secondary"
                      }`}
                    >
                      {document.isRequired ? "Required" : "Optional"}
                    </span>
                  </div>
                </div>
              </div>
              {document.notes && (
                <div className="mt-3 pt-2.5 border-t border-primary/20">
                  <p className="text-xs font-semibold text-primary/60 uppercase tracking-wide mb-1">
                    Notes
                  </p>
                  <p className="text-sm text-primary leading-relaxed">
                    {_.truncate(document.notes, { length: 80, omission: "..." })}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsTab;
