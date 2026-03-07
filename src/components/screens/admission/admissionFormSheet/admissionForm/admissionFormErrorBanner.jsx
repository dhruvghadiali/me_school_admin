import { CircleAlertIcon } from "lucide-react";
import PropTypes from "prop-types";

const AdmissionFormErrorBanner = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-danger/90 backdrop-blur-sm mb-5 flex items-center gap-3 rounded-xl p-3 border border-danger/90 shadow-md">
      <CircleAlertIcon className="text-accent shrink-0 w-5 h-5 animate-pulse" />
      <p className="text-accent text-sm md:text-base font-medium">{error}</p>
    </div>
  );
};

AdmissionFormErrorBanner.propTypes = {
  error: PropTypes.string,
};

export default AdmissionFormErrorBanner;
