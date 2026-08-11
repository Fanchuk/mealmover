import { Suspense } from "react";
import { SignInForm } from "@/src/features/auth/components/SignInForm";

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}