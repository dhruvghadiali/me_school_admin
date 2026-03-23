import ChangeUsernameForm from "@MEScreenComponents/setting/changeUsernameForm";
import ChangePasswordForm from "@MEScreenComponents/setting/changePasswordForm";

const SettingScreenComponent = () => {
  return (
    <div className="space-y-4 mt-5">
      <ChangePasswordForm />
      <ChangeUsernameForm />
    </div>
  );
};

export default SettingScreenComponent;
