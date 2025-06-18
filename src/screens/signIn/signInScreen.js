import MEHoc from "@MECommonComponents/hoc/meHoc";
import SignInForm from "@MEScreenComponents/signIn/signInForm";
import SignInFormHeader from "@MEScreenComponents/signIn/signInFormHeader";

const SignInScreen = () => {
  return (
    <>
      <MEHoc>
        <div className="flex items-center justify-center h-screen">
          <div className="w-1/4">
            <SignInFormHeader/>
            <SignInForm/>
          </div>
        </div>
      </MEHoc>
    </>
  );
};

export default SignInScreen;
