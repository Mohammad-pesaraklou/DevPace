import { Metadata } from "next";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import Provider from "@/providers/Provider";
import { Geist } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Kanban Pro",
  description: "A kanban tool for your projects",

  metadataBase: new URL("http://localhost:3000"),
  authors: [{ name: "Mr Robot" }],
  applicationName: "Kanban Pro",
  creator: "MR_ROBOT",
  icons: "/vercel.svg",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: "/",
    title: "Kanban Pro",
    description: "My Kanban Website Description",
    siteName: "Kanban smart Pro",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kanban Pro",
      },
    ],
  },
};
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      id="__next"
      className={geistSans.variable}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <Provider>{children}</Provider>
        <NextTopLoader
          color="#7BB5FF"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #062957,0 0 5px #7BB5FF"
        />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <SpeedInsights />
      </body>
    </html>
  );
}

export default RootLayout;
