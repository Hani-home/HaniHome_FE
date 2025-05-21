import BackHeader from "@/components/layout/header/BackHeader";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackHeader />
      <div className="px-4">{children}</div>
    </>
  );
}
