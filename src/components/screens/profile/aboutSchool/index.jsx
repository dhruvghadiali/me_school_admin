import _ from "lodash";

import AboutSchoolCardComponent from "@MEScreenComponents/profile/aboutSchool/aboutSchoolCard";
import AboutSchoolSheetComponet from "@MEScreenComponents/profile/aboutSchool/aboutSchoolSheet";

const AboutSchoolSection = () => {
  return (
    <div className="mt-5">
      <AboutSchoolCardComponent />
      <AboutSchoolSheetComponet />
    </div>
  );
};

export default AboutSchoolSection;
