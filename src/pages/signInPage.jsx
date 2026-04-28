import SignInForm from "@MEScreenComponents/signIn/signInForm";
import SignInFormHeader from "@MEScreenComponents/signIn/signInFormHeader";

const SignInPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left panel — branding (hidden on mobile/tablet) */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-primary p-10">
        <SignInFormHeader variant="branding" />
      </div>

      {/* Right panel — sign in form */}
      <div className="flex items-center justify-center bg-background px-4 py-8 sm:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile/Tablet header */}
          <div className="lg:hidden">
            <SignInFormHeader variant="compact" />
          </div>

          {/* Desktop header text */}
          <div className="hidden lg:block">
            <SignInFormHeader variant="form" />
          </div>

          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
