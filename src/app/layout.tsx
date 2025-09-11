import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./globals.css";
import { Nav } from "./components/nav";
// import Logo from "./components/Logo";
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="">
          <Nav />
          {/* <Logo /> */}
          <div className="">
            {children}
          </div>
        </div>
        
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
