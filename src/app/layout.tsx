import "./globals.css";
import Navbar from "@/components/layout/NavBar";

export const metadata = {
  title: "DiGi Trend | Branding & Digital Growth Agency",
  description: "We build brands that grow with strategy, design and technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}