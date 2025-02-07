import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="h-full">
      <Head />
      <body className="antialiased h-full bg-background">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
