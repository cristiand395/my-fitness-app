"use server"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignInResponse {
  success: boolean;
  message: string;
  rawData?: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
}

export async function SignIn(
  prevState: SignInResponse | null,
  formData: FormData
): Promise<SignInResponse> {

  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    rememberMe: formData.get("rememberMe") !== null,
  };
  
  try {
    await auth.api.signInEmail({
      body: {
        email: rawFormData.email,
        password: rawFormData.password,
        rememberMe: rawFormData.rememberMe,
      },
      headers: await headers(),
    });
    return { 
      success: true, 
      message: "Signed in successfully",
      rawData: {
        email: rawFormData.email,
        rememberMe: rawFormData.rememberMe,
        password: "",
      },
    };
  } catch (error: any) {
    console.error("Error signing in:", error);
    let errorMessage = "Error desconocido al iniciar sesión";
    
    if (error.body) {
      if (Array.isArray(error.body) && error.body.length > 0) {
        errorMessage = error.body[0]?.message || errorMessage;
      } else if (typeof error.body === "object" && error.body.message) {
        errorMessage = error.body.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { 
      success: false, 
      message: errorMessage, 
      rawData: rawFormData 
    };
  }
}