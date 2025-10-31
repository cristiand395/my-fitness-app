"use server"
import { auth } from "@/lib/auth";

export async function SignUp(previousState, formData) {
  console.log("formulario enviado")
  await new Promise((resolve) => setTimeout(resolve, 4000));
  try {
    const data = await auth.api.signUpEmail({
      body: {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      },
    });
    console.log("User signed up:", data);
  } catch (error: any) {
    console.error("Error al crear usuario:", error);
    return { success: false, message: error.body?.[0]?.message || "An error occurred during sign up" };
  }
  // return { success: true, message: "User signed up successfully" };
}