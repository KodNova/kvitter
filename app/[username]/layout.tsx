import ProfilePage from "./page";

export default function ProfilePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">{children}</div>
    </div>
  );
}
