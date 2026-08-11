"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { loginUser, type AuthState } from '../../checkout/services/authActions'
import { AuthLayout } from "./AuthLayout";

export function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/restaurants";
  const [state, formAction, pending] = useActionState(loginUser, { ok: false } as AuthState);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (state.ok) {
      toast.success("Welcome back!");
      router.push(callbackUrl);
      router.refresh();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, router, callbackUrl]);

  return (
    <AuthLayout>
      <h1 className="font-heading font-bold text-[34px] text-neutral-800">Sign in</h1>
      <p className="font-heading text-[15px] text-neutral-500 mt-2 mb-8">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-[#EF5B5B] font-medium hover:underline">Create one</Link>
      </p>

      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="w-full h-[52px] rounded-[50px] border border-neutral-200 flex items-center justify-center gap-3 font-heading font-medium text-[15px] text-neutral-700 hover:border-[#EF5B5B] hover:bg-neutral-50 transition-colors mb-5"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="" className="w-5 h-5" />
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-neutral-200" />
        <span className="font-heading text-[13px] text-neutral-400">or</span>
        <div className="flex-1 h-px bg-neutral-200" />
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        <Field icon={<Mail size={18} />} name="email" type="email" placeholder="Email" />
        <Field
          icon={<Lock size={18} />}
          name="password"
          type={showPass ? "text" : "password"}
          placeholder="Password"
          trailing={
            <button type="button" onClick={() => setShowPass((v) => !v)} className="text-neutral-400 hover:text-neutral-600">
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
        <button
          type="submit"
          disabled={pending}
          className="mt-2 h-[54px] rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium text-[16px] hover:bg-[#CD424E] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {pending ? (
            <>
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Signing in...
            </>
          ) : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
}

function Field({
  icon, name, type, placeholder, trailing,
}: {
  icon: React.ReactNode;
  name: string;
  type: string;
  placeholder: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 h-[54px] rounded-[16px] border border-neutral-200 px-4 focus-within:border-[#EF5B5B] transition-colors">
      <span className="text-neutral-400">{icon}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="flex-1 bg-transparent outline-none font-heading text-[15px] text-neutral-800 placeholder:text-neutral-400"
      />
      {trailing}
    </div>
  );
}