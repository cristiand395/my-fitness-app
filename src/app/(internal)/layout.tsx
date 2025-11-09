import { getServerSession } from "@/lib/auth/getServerSession";
import { redirect } from 'next/navigation'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { cookies } from "next/headers"
import { AppSidebar } from "@/components/app-sidebar"

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession()
    if (!session) {
        redirect("/")
    }
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
    
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
