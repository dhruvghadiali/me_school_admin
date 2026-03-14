import {Building2} from "lucide-react";

import MEAlertCardComponent from "@MECommonComponents/card/alertCard";

const OrganizationInformationNotFoundCardComponent = () => {
    return (
        <MEAlertCardComponent
        icon={
          <Building2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary/50" />
        }
        alertText="No organization information available"
        alertMessage="Organization information will appear here once available"
      />
    )
}

export default OrganizationInformationNotFoundCardComponent;