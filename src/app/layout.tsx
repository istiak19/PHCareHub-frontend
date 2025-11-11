import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginSuccessToast from "@/components/shared/LoginSuccessToast";
import LogoutSuccessToast from "@/components/shared/LogoutSuccessToast";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PHCareHub",
  description: "Your personal healthcare management platform",
  metadataBase: new URL("https://www.phcarehub.com"),
  openGraph: {
    title: "PHCareHub",
    description: "Your personal healthcare management platform",
    url: "/",
    siteName: "PHCareHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PHCareHub Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PHCareHub",
    description: "Your personal healthcare management platform",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" richColors />
          <ToastContainer />
          <LoginSuccessToast />
          <LogoutSuccessToast />
        </ThemeProvider>
      </body>
    </html>
  );
}