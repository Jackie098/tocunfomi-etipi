import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider /* session={pageProps?.session} */>
      <ThemeProvider
        attribute="class"
        // defaultTheme="dark"
        enableSystem
        // disableTransitionOnChange
      >
        <Component {...pageProps} />;
      </ThemeProvider>
    </SessionProvider>
  );
}
