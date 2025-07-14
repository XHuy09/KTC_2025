import Link from "next/link";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link> |
          <Link href="/blog">Blog</Link> |
          <Link href="/contact">Contact</Link> |
          <Link href="/product">Product</Link> |
          <Link href="/login">Login</Link> |
        </nav>
        {children}
      </body>
    </html>
  );
}
