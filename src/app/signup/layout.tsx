import BackHeader from "@/components/layout/header/BackHeader";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="scrollbar-hide h-screen overflow-auto">
      <BackHeader />
      <div className="px-4">{children}</div>
    </div>
  );
}
