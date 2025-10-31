"use client"
import { useActionState } from "react";
import { SignUp } from "@/lib/auth/sigh-up";

export default function Page() {
  const [state, formAction, isPending] = useActionState<{ success: boolean; message: string }>(SignUp, null);
  return (
    <div>
      <h1>Sign Up Page</h1>
      <form action={formAction}>
        <input type="text" name="name"/>
        <input type="email" name="email"/>
        <input type="password" name="password"/>
        <button type="submit">
          Enviar
        </button>
        {isPending && <p>Enviando...</p>}
        {state && state.success && <p>{state.message}</p>}
        {state && !state.success && <p>Error: {state.message}</p>}
      </form>
    </div>
  )
}