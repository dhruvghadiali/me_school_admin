import _ from "lodash";
import { FileCheck, FileX } from "lucide-react";

const DocumentsTab = ({ application }) => {
  // Mock data for now - replace with actual data from application
  const documents = _.get(application, "documents", []);

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
          className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-3">
            <div
              className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                doc.isVerified
                  ? "bg-green-100 dark:bg-green-900/30"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              {doc.isVerified ? (
                <FileCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <FileX className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate">
                {doc.documentName || "N/A"}
              </h5>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    doc.required
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}
                >
                  {doc.required ? "Required" : "Optional"}
                </span>
                {doc.isVerified && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Verified
                  </span>
                )}
              </div>
              {doc.verifiedBy && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Verified by: {doc.verifiedBy}
                </p>
              )}
              {doc.verifiedAt && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {doc.verifiedAt}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentsTab;
