import SignInForm from "@MEScreenComponents/signIn/signInForm";
import SignInFormHeader from "@MEScreenComponents/signIn/signInFormHeader";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md px-6 sm:px-8 md:max-w-lg lg:max-w-xl">
        <SignInFormHeader />
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
