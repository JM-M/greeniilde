import { isAuthenticated } from "@/app/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  if (!authed) {
    // Redirect to login page with return URL
    redirect("/login?redirect=/editor");
  }

  return <>{children}</>;
}
