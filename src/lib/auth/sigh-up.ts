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
}

export async function SignUp(formData: SignUpFormData): Promise<SignUpResponse> {
  console.log("formulario enviado")
  await new Promise((resolve) => setTimeout(resolve, 4000));
  try {
    const data = await auth.api.signUpEmail({
      body: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        callbackURL: "/dashboard",
      },
    });
    console.log("Usuario creado correctamente:", data);
    return { success: true, message: "Usuario creado correctamente" };
  } catch (error: any) {
    console.error("Error al crear usuario:", error);
    return { success: false, message: error.body?.[0]?.message || "Ha ocurrido un error" };
  }
}