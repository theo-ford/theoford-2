import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./globals.css";
import { Nav } from "./components/nav";
import ClientRouteTransition from "@/app/components/ClientRouteTransition";
import { NavigationProvider } from "@/app/context/navigation-context";
import { HomepageProvider } from "@/app/context/homepage-context";
import localFont from "next/font/local";

// Helvetica Now Display fonts
const helveticaNowDisplay = localFont({
  src: [
    {
      path: "./fonts/HelveticaNowDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNowDisplay-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNowDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNowDisplay-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-now-display",
  display: "swap",
});

// Helvetica Now Text fonts
const helveticaNowText = localFont({
  src: [
    {
      path: "./fonts/HelveticaNowText-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNowText-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNowText-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNowText-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-now-text",
  display: "swap",
});

// Helvetica Now Variable font
const helveticaNowVar = localFont({
  src: [
    {
      path: "./fonts/HelveticaNowVarW05Regular.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-now-var",
  display: "swap",
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helveticaNowDisplay.variable} ${helveticaNowText.variable} ${helveticaNowVar.variable}`}
      >
        <NavigationProvider>
          <HomepageProvider>
            <div className="">
              <Nav />
              <ClientRouteTransition>
                {children}
              </ClientRouteTransition>
            </div>
          </HomepageProvider>
        </NavigationProvider>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
