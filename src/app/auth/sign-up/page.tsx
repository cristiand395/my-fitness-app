"use client"
import { useActionState } from "react";
import { SignUp, SignUpResponse } from "@/lib/auth/sigh-up";
import { redirect } from "next/navigation";
export default function Page() {
  const [state, formAction, isPending] = useActionState(
    SignUp as (prevState: SignUpResponse | null, formData: FormData) => Promise<SignUpResponse>,
    null
  );
  if (state?.success) {
    redirect("/dashboard");
  }
  return (
    <div>
      <h1>Sign Up Page</h1>
      <form action={formAction}>
        <input type="text" name="name" defaultValue={state?.rawData?.name}/>
        <input type="email" name="email" defaultValue={state?.rawData?.email}/>
        <input type="password" name="password" defaultValue={state?.rawData?.password}/>
        <button type="submit">
          Submit
        </button>
        {isPending && <p>Sending...</p>}
      {state && !state.success && <p>Error: {state.message}</p>}
      </form> 
    </div>
  )
}