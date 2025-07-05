import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Amit Kumar Sharma - Portfolio",
  description:
    "Software Engineering Student at Shahjalal University of Science and Technology, Sylhet. Passionate about full-stack development, problem-solving, and creating innovative solutions.",
  keywords: [
    "Amit Kumar Sharma",
    "Software Engineer",
    "Full Stack Developer",
    "SUST",
    "Shahjalal University",
    "Portfolio",
    "Web Developer",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
  ],
  authors: [{ name: "Amit Kumar Sharma", url: "mailto:amit09@student.sust.edu" }],
  creator: "Amit Kumar Sharma",
  publisher: "Amit Kumar Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio-domain.com",
    title: "Amit Kumar Sharma - Software Engineering Student",
    description:
      "Explore my journey as a Software Engineering student, showcasing projects, skills, and achievements in web development and programming.",
    siteName: "Amit Kumar Sharma Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Amit Kumar Sharma - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amit Kumar Sharma - Software Engineering Student",
    description: "Passionate about creating innovative software solutions. Check out my projects and skills!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme Color */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Additional meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Amit Portfolio" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Amit Kumar Sharma",
              jobTitle: "Software Engineering Student",
              description: "Software Engineering Student at Shahjalal University of Science and Technology, Sylhet",
              url: "https://your-portfolio-domain.com",
              email: "amit09@student.sust.edu",
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Shahjalal University of Science and Technology",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Sylhet",
                  addressCountry: "Bangladesh",
                },
              },
              knowsAbout: [
                "Software Engineering",
                "Web Development",
                "Full Stack Development",
                "JavaScript",
                "React",
                "Node.js",
                "MongoDB",
                "C++",
                "Java",
                "Python",
              ],
              sameAs: ["https://github.com/your-github-username", "https://linkedin.com/in/your-linkedin-username"],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="relative min-h-screen bg-background">
            {/* Skip to main content for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
            >
              Skip to main content
            </a>

            {/* Main content */}
            <main id="main-content" className="relative">
              {children}
            </main>

            {/* Toast notifications */}
            <Toaster />
          </div>
        </ThemeProvider>

        {/* Analytics (add your analytics code here) */}
        {process.env.NODE_ENV === "production" && (
          <>
            {/* Google Analytics */}
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}
