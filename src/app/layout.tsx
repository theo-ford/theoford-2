import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./globals.css";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <p className="bg-red-800">Hello World</p>
        {children}
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
