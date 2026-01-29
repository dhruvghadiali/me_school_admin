import _ from "lodash";
import { Calendar, Clock, MapPin } from "lucide-react";

const AppointmentsTab = ({ application }) => {
  // Mock data for now - replace with actual data from application
  const documentVerificationAppointment = _.get(
    application,
    "documentVerificationAppointment",
    null
  );
  const feePaymentAppointment = _.get(
    application,
    "feePaymentAppointment",
    null
  );

  return (
    <div className="space-y-6">
      {/* Document Verification Appointment */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Document Verification Appointment
        </h4>
        {documentVerificationAppointment ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    {documentVerificationAppointment.date || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    Time
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    {documentVerificationAppointment.time || "N/A"}
                  </p>
                </div>
              </div>
              {documentVerificationAppointment.location && (
                <div className="flex items-start gap-3 sm:col-span-2">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Location
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {documentVerificationAppointment.location}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {documentVerificationAppointment.status && (
              <div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    documentVerificationAppointment.status === "completed"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : documentVerificationAppointment.status === "scheduled"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {_.startCase(documentVerificationAppointment.status)}
                </span>
              </div>
            )}
            {documentVerificationAppointment.notes && (
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Notes
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {documentVerificationAppointment.notes}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No appointment scheduled
          </p>
        )}
      </div>

      {/* Fee Payment Appointment */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Fee Payment Appointment
        </h4>
        {feePaymentAppointment ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    {feePaymentAppointment.date || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    Time
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    {feePaymentAppointment.time || "N/A"}
                  </p>
                </div>
              </div>
              {feePaymentAppointment.location && (
                <div className="flex items-start gap-3 sm:col-span-2">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Location
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {feePaymentAppointment.location}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {feePaymentAppointment.status && (
              <div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    feePaymentAppointment.status === "completed"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : feePaymentAppointment.status === "scheduled"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {_.startCase(feePaymentAppointment.status)}
                </span>
              </div>
            )}
            {feePaymentAppointment.notes && (
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Notes
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {feePaymentAppointment.notes}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No appointment scheduled
          </p>
        )}
      </div>
    </div>
  );
};

export default AppointmentsTab;
