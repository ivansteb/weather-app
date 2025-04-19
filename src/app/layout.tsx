'use client';
// import type { Metadata } from "next";
import "./globals.css";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'


// export const metadata: Metadata = {
//   title: "Weather App",
//   description: "A simple weather app with Next.js and Tailwind CSS",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="es">
      <QueryClientProvider client={queryClient}>
        <body>
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
