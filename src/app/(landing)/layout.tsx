import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Header } from "@/components/header";

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <>
      <Header session={session} />
      {children}
    </>
    );
}