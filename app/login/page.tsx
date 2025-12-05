export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) {
  const redirectUrl = searchParams.redirect || "/";

  // Admin runs on port 3001 in development
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";
  const storefrontUrl =
    process.env.NEXT_PUBLIC_STOREFRONT_URL || "http://localhost:3002";

  const returnUrl = `${storefrontUrl}${redirectUrl}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Authentication Required
          </h1>
          <p className="mb-8 text-gray-600">
            Please login via the admin portal to access the content editor.
          </p>
        </div>

        <div className="space-y-4">
          <a
            href={`${adminUrl}/login`}
            className="block w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700"
          >
            Go to Admin Login
          </a>

          <div className="text-center text-sm text-gray-500">
            <p>After logging in to the admin portal,</p>
            <p>you can return here to edit content.</p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="mb-2 text-sm font-semibold text-gray-700">
            Why do I need to login via admin?
          </h3>
          <p className="text-sm text-gray-600">
            The content editor requires admin privileges to save changes. By
            logging in through the admin portal, we ensure only authorized users
            can modify your website content.
          </p>
        </div>
      </div>
    </div>
  );
}
