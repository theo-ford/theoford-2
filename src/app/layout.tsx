import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./globals.css";
import { Nav } from "./components/nav";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="m-[15px]">
        <Nav /> <p>Hello World</p>
        <div className="mt-[100px]">
        {children}
        </div>
        </div>
        
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
