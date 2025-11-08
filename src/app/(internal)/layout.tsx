import { getServerSession } from "@/lib/auth/getServerSession";
import { redirect } from 'next/navigation'

export default async function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await getServerSession()
    if (!session) {
        redirect("/")
    }
    return (
        <>
        {children}
        </>
    );
  }
  