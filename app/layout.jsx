import Footer from "./components/footer"
import Header from "./components/header"
import { ThemeProvider } from "./components/theme-provider"
import "./globals.css"
import { AuthProvider } from "./lib/auth-context"
// import { AuthProvider } from "@/lib/auth-context"
// import { ThemeProvider } from "@/components/theme-provider"
// import Header from "@/components/header"
// import Footer from "@/components/footer"

export const metadata = {
  title: "Connected",
  description: "Connected - Innovation & Ventures",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
