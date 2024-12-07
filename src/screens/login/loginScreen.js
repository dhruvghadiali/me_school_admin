import AuthHoc from "../../components/common/authHoc/authHoc";
import LoginForm from "../../components/screens/login/loginForm";
import LoginFormHeader from "../../components/screens/login/loginFormHeader";

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
