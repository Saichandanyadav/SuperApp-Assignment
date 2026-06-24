import { Single_Day } from "next/font/google";
import "./globals.css";

const singleDay = Single_Day({
  weight: "400",
  variable: "--font-single-day",
});

export const metadata = {
  title: "Super app",
  description: "The Super App Discovery Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${singleDay.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}