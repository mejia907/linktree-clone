export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center items-center">
        {children}
      </div>
      <div className="bg-[url('/login.webp')] bg-cover bg-no-repeat h-full w-full hidden md:block"></div>
    </section>
  );
}