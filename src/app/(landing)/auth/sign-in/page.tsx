"use client"
import { useActionState } from "react";
import { SignIn, SignInResponse } from "@/lib/auth/sign-in";
import { redirect } from "next/navigation";
export default function Page() {
  const [state, formAction, isPending] = useActionState(
    SignIn as (prevState: SignInResponse | null, formData: FormData) => Promise<SignInResponse>,
    null
  );
  if (state?.success) {
    redirect("/dashboard");
  }
  return (
    <div>
      <h1>Sign In Page</h1>
      <form action={formAction}>
        <input type="email" name="email" defaultValue={state?.rawData?.email}/>
        <input type="password" name="password" defaultValue={state?.rawData?.password}/>
        <input type="checkbox" name="rememberMe" defaultChecked={state?.rawData?.rememberMe}/>
        <button type="submit">
          Submit
        </button>
        {isPending && <p>Sending...</p>}
      {state && !state.success && <p>Error: {state.message}</p>}
      </form>
    </div>
  )
}