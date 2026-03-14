
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";

import { PROFILE_TABS_ID } from "@MEHelpers/enums";
import {
  profileSchoolTab,
  profileOrganizationTab,
  profileAddressTab,
} from "@MELocalization/en";

import AddressComponent from "@MEScreenComponents/profile/address";
import ProfileScreenLoader from "@MEScreenComponents/profile/loader";
import AboutSchoolSection from "@MEScreenComponents/profile/aboutSchool";
import SchoolInformationComponent from "@MEScreenComponents/profile/schoolInformation";
import OrganizationMemberComponent from "@MEScreenComponents/profile/organizationMember";
import OrganizationInformationComponent from "@MEScreenComponents/profile/organizationInformation";

const ProfileScreenComponent = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { profileLoader, activeTab } = useSelector((state) => state.profile);

  const tabs = [
    {
      id: PROFILE_TABS_ID.SCHOOL,
      label: _.startCase(
        t("profileSchoolTab", { defaultValue: profileSchoolTab }),
      ),
    },
    {
      id: PROFILE_TABS_ID.ORGANIZATION,
      label: _.startCase(
        t("profileOrganizationTab", { defaultValue: profileOrganizationTab }),
      ),
    },
    {
      id: PROFILE_TABS_ID.ADDRESS,
      label: _.startCase(
        t("profileAddressTab", { defaultValue: profileAddressTab }),
      ),
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case PROFILE_TABS_ID.SCHOOL:
        return (
          <>
            <SchoolInformationComponent />
            <AboutSchoolSection />
          </>
        );
      case PROFILE_TABS_ID.ORGANIZATION:
        return (
          <>
            <OrganizationInformationComponent />
            <OrganizationMemberComponent />
          </>
        );
      case PROFILE_TABS_ID.ADDRESS:
        return (
          <>
            <AddressComponent />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 mt-5">
      {profileLoader ? (
        <ProfileScreenLoader />
      ) : (
        <div>
          <div className="sticky top-0 z-10 bg-primary shadow-lg shadow-primary/50 mt-2 rounded">
            <div className="overflow-x-auto px-2 sm:px-4 md:px-6">
              <nav className="flex min-w-max sm:min-w-0" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => dispatch(setActiveTab(tab.id))}
                    className={`flex-1 sm:flex-none whitespace-nowrap px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-white text-white bg-white/10"
                        : "border-transparent text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
            {renderTabContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreenComponent;
