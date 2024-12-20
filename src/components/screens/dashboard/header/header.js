
import { useTranslation } from 'react-i18next';

const DashboardScreenHeader = () => {
  const { t } = useTranslation(); 
  
  return (
    <div>
      {/* <p className="text-3xl font-semibold"> {t('Welcome to React')} </p>
      <p className="text-sm mt-1"> {dashboardScreenStaticValue.subtitle} </p> */}
    </div>
  );
};

export default DashboardScreenHeader;
