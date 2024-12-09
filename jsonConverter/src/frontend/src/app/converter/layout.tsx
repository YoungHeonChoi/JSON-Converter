import Header from "../../components/header";
import Footer from "../../components/footer";

export default function ConverterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <Header />
        {children}
      <Footer />
    </div>
  );
}
