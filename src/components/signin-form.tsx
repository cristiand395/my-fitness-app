"use client"

import { useActionState } from "react";
import { SignIn, SignInResponse } from "@/lib/auth/sign-in";
import { redirect } from "next/navigation";
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

export function SigninForm() {
  const [state, formAction, isPending] = useActionState(
    SignIn as (prevState: SignInResponse | null, formData: FormData) => Promise<SignInResponse>,
    null
  );
  const [showPassword, setShowPassword] = useState(false)
  if (state?.success) {
    redirect("/dashboard");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-balance">Sign In</CardTitle>
        <CardDescription className="text-pretty">Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={formAction} className="space-y-4">
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">
                    Email
                  </FieldLabel>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    defaultValue={state?.rawData?.email}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    defaultValue={state?.rawData?.password}
                    required
                  />
                </Field>
                <Field orientation="horizontal">
                  <Checkbox
                    onClick={() => setShowPassword(!showPassword)}
                    checked={showPassword}
                  />
                  <FieldLabel
                    className="font-normal"
                  >
                    Show password
                  </FieldLabel>
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign in"}
              </Button>
              {state && !state.success && (
                <p className="text-sm text-red-600">
                  {state.message}
                </p>
              )}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 mt-4">
        <p className="text-sm text-center text-muted-foreground">
          {"Don't have an account? "}
          <Link
            href="/signup"
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
