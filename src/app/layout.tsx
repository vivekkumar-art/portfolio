import type { Metadata } from "next";
import { Inter, Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "Vivek Kumar | Software Developer & AI/ML Enthusiast",
  description:
    "Explore the portfolio of Vivek Kumar, a software developer and AI/ML enthusiast pursuing B.Tech in Computer Science and Engineering at Uttaranchal University.",
  metadataBase: new URL("https://vivek-kumar.vercel.app"),
  openGraph: {
    title: "Vivek Kumar | Software Developer & AI/ML Enthusiast",
    description: "Software development, AI/ML and innovation.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${space.variable} ${instrument.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
