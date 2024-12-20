import AuthHoc from "@MECommonComponents/authHoc/authHoc";
import LoginForm from "@MEScreenComponents/login/loginForm";
import LoginFormHeader from "@MEScreenComponents/login/loginFormHeader";

const LoginScreen = () => {
  return (
    <>
      <AuthHoc>
        <div className="flex items-center justify-center h-screen">
          <div className="w-1/4">
            <LoginFormHeader/>
            <LoginForm/>
          </div>
        </div>
      </AuthHoc>
    </>
  );
};

export default LoginScreen;
