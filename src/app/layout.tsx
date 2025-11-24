import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./globals.css";
import { Nav } from "./components/nav";
import ClientRouteTransition from "@/app/components/ClientRouteTransition";
import { NavigationProvider } from "@/app/context/navigation-context";
import { HomepageProvider } from "@/app/context/homepage-context";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
