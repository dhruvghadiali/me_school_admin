import SignInForm from "@MEScreenComponents/signIn/signInForm";
import SignInFormHeader from "@MEScreenComponents/signIn/signInFormHeader";

import { Card, CardHeader, CardContent } from "@MEShadcnComponents/card";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative shadow-lg sm:shadow-xl md:shadow-2xl border-dark/30 shadow-dark backdrop-blur-sm bg-white">
        <CardHeader className="space-y-3 sm:space-y-4 pb-3 sm:pb-4 md:pb-6 px-4 sm:px-6 md:px-8 lg:px-10 pt-4 sm:pt-6 md:pt-8">
          <SignInFormHeader />
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6 md:px-8 lg:px-10 pb-4 sm:pb-6 md:pb-8">
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
