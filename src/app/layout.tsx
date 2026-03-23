import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jordan Freddy – Portfolio",
    template: "%s | Jordan Freddy",
  },
  description:
    "Portfolio von Jordan Freddy – Informatikstudent an der THM Gießen, spezialisiert auf Softwareentwicklung.",
  authors: [{ name: "Jordan Freddy" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${poppins.variable} w-full overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body
        className="min-h-dvh w-full overflow-x-hidden flex flex-col font-[family-name:var(--font-inter)] antialiased"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1 w-full overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
