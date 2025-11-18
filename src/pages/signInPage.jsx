import SignInForm from "@MEScreenComponents/signIn/signInForm";
import SignInFormHeader from "@MEScreenComponents/signIn/signInFormHeader";

const SignInPage = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-1/4">
          <SignInFormHeader />
          <SignInForm />
        </div>
      </div>
    </>
  );
};

export default SignInPage;
