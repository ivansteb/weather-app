import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./QueryProvider";

export const metadata: Metadata = {
  title: "Weather App",
  description: "A simple weather app with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <QueryProvider>
        <body>
          {children}
        </body>
      </QueryProvider>
    </html>
  );
}
