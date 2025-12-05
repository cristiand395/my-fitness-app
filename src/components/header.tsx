import Link from "next/link";
import { Button } from "./ui/button";
import { AvatarMenu } from "@/components/avatar-menu";

export function Header({ session }: { session: any }) {
  return (
    <header className="p-4 border-b flex justify-between items-center">
      <div>Icon</div>
      <div>Menu</div>
      <div>
        {session
          ? <AvatarMenu session={session} />
          : <Link href="/auth/sign-in"><Button>Sign In</Button></Link>}
      </div>
    </header>
  );
}

