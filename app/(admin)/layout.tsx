import { getUser } from "@/app/(admin)/lib/api/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // Skip auth check if already on login page
  const isLoginPage = pathname === "/editor/login";

  if (!isLoginPage) {
    const user = await getUser();

    if (!user) {
      // Redirect to editor login page
      redirect("/editor/login");
    }
  }

  return <div>{children}</div>;
}
