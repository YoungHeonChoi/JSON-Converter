import Header from "./header";
import Footer from "@/app/home/footer";

export default  function JaonConverterLayout({children}: Readonly<{children: React.ReactNode;}>) {

  return (
      <>
          <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
              <Header/>
              {children}
              <Footer/>
          </div>
      </>
  )
}