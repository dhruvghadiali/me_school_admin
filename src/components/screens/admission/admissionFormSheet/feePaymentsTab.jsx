import _ from "lodash";
import { CreditCard, CheckCircle, XCircle } from "lucide-react";

const FeePaymentsTab = ({ application }) => {
  // Mock data for now - replace with actual data from application
  const feePayments = _.get(application, "feePayments", []);

  if (!feePayments || feePayments.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No fee payments available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feePayments.map((payment, index) => (
        <div
          key={payment.id || index}
          className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  payment.status === "success"
                    ? "bg-green-100 dark:bg-green-900/30"
                    : payment.status === "pending"
                    ? "bg-yellow-100 dark:bg-yellow-900/30"
                    : "bg-red-100 dark:bg-red-900/30"
                }`}
              >
                {payment.status === "success" ? (
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                ) : payment.status === "pending" ? (
                  <CreditCard className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h5 className="text-base font-semibold text-gray-900 dark:text-white">
                    {payment.feeName || "Fee Payment"}
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Transaction ID: {payment.transactionId || "N/A"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    ₹{payment.amount?.toLocaleString() || "0"}
                  </p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      payment.status === "success"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : payment.status === "pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {_.startCase(payment.status)}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Payment Method
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {_.startCase(payment.paymentMethod) || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Payment Date
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {payment.paymentDate || "N/A"}
                  </p>
                </div>
                {payment.receiptNumber && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Receipt Number
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {payment.receiptNumber}
                    </p>
                  </div>
                )}
                {payment.paymentGateway && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Payment Gateway
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {payment.paymentGateway}
                    </p>
                  </div>
                )}
              </div>
              {payment.remarks && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Remarks
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {payment.remarks}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeePaymentsTab;
