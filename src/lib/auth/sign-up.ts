"use server"
import { auth } from "@/lib/auth";

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  rawData?: {
    name: string;
    email: string;
    password: string;
  };
}

export async function SignUp(
  prevState: SignUpResponse | null,
  formData: FormData
): Promise<SignUpResponse> {
  
  // Extraer los valores del FormData
  const rawFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  
  try {
    await auth.api.signUpEmail({
      body: {
        name: rawFormData.name,
        email: rawFormData.email,
        password: rawFormData.password,
      },
    });
    return { success: true, message: "User created successfully" };
  } catch (error: any) {
    console.error("Error creating user:", error);
    console.error("Error details:", error.body);
    let errorMessage = "An unknown error occurred";
    if (error.body) {
      if (Array.isArray(error.body) && error.body.length > 0) {
        errorMessage = error.body[0]?.message || errorMessage;
      } else if (typeof error.body === "object" && error.body.message) {
        errorMessage = error.body.message;
      }
    }
    return { success: false, message: errorMessage, rawData: rawFormData };
  }
}