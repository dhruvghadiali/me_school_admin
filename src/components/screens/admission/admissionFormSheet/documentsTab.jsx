import _ from "lodash";
import { useSelector } from "react-redux";
import { FileCheck, FileX } from "lucide-react";

const DocumentsTab = () => {
  const { selectedAdmissionApplication } = useSelector(
    (state) => state.admissionApplication,
  );

  // Mock data for now - replace with actual data from application
  const documents = _.get(selectedAdmissionApplication, "documents", []);

  if (!documents || documents.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No documents available
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc, index) => (
        <div
          key={doc.id || index}
          className="bg-secondary/10 rounded-lg p-4 border border-primary/50 shadow-lg shadow-primary/50 hover:shadow-md hover:cursor-pointer"
        >
          <div className="flex items-start gap-3">
            <div
              className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                doc.isVerified
                  ? "bg-success/20 "
                  : "bg-danger/20 "
              }`}
            >
              {doc.isVerified ? (
                <FileCheck className="w-5 h-5 text-success" />
              ) : (
                <FileX className="w-5 h-5 text-danger" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate">
                {_.toUpper(_.get(doc, "admissionDocument", "N/A"))}
              </h5>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    doc.isRequired
                      ? "bg-danger text-secondary"
                      : "bg-warning text-secondary"
                  }`}
                >
                  {doc.isRequired ? "Required" : "Optional"}
                </span>
              </div>
            </div>
          </div>
          {doc.notes && (
            <div className="mt-3 pt-2.5 border-t border-primary/20">
              <p className="text-xs sm:text-xs font-semibold text-primary/60 uppercase tracking-wide mb-1">
                Notes
              </p>
              <p className="text-xs sm:text-xs text-primary leading-relaxed">
                {_.truncate(doc.notes, { length: 80, omission: "..." })}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DocumentsTab;
