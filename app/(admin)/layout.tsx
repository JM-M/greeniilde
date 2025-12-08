import { getUser } from "@/app/(admin)/lib/api/auth";
import { Work_Sans } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AdminFontProvider } from "./components/admin-font-provider";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

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

  return (
    <div className={workSans.className}>
      <AdminFontProvider className={workSans.className} />
      {children}
    </div>
  );
}
