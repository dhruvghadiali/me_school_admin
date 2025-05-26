import AuthHoc from "@MECommonComponents/authHoc/authHoc";
import SignInForm from "@MEScreenComponents/signIn/signInForm";
import SignInFormHeader from "@MEScreenComponents/signIn/signInFormHeader";

const SignInScreen = () => {
  return (
    <>
      <AuthHoc>
        <div className="flex items-center justify-center h-screen">
          <div className="w-1/4">
            <SignInFormHeader/>
            <SignInForm/>
          </div>
        </div>
      </AuthHoc>
    </>
  );
};

export default SignInScreen;
