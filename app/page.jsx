"use client"
// import Header from "@/components/header"
import HeroSection from "./components/hero-section"
import AboutSection from "./components/about-section"
import VenturesSection from "./components/ventures-section"
import ServicesSection from "./components/services-section"
import InnovationEcosystemSection from "./components/innovation-ecosystem-section"
import ContactSection from "./components/contact-section"
import Footer from "./components/footer"
import { getVentures, getServices, getCaseStudies, getTeamMembers } from "./lib/data"

export const dynamic = "force-dynamic"

export default async function Home() {
  // Fetch data for the homepage
  const ventures = (await getVentures()) || []
  const services = (await getServices()) || []
  const caseStudies = (await getCaseStudies()) || []
  const teamMembers = (await getTeamMembers()) || []

  // Select featured items
  const featuredVentures = ventures.slice(0, 3)

  // Hero section data
  const heroData = {
    title: "Building the Future of Technology",
    subtitle: "We create, invest in, and scale innovative ventures that solve meaningful problems.",
    stats: [
      { value: ventures.length > 0 ? `${ventures.length}+` : "50+", label: "Ventures Launched" },
      { value: "$100M+", label: "Capital Raised" },
      { value: "500+", label: "Jobs Created" },
      { value: "12", label: "Countries" },
    ],
  }

  // About section data
  const aboutData = {
    title: "About Connected",
    description:
      "Connected is a venture studio that builds, invests in, and scales technology companies. We combine capital, talent, and expertise to create ventures that solve meaningful problems and generate exceptional returns.",
    metrics: [
      { value: "2018", label: "Founded" },
      { value: teamMembers.length > 0 ? `${teamMembers.length}+` : "85+", label: "Team Members" },
      { value: "3", label: "Global Offices" },
    ],
  }

  return (
    <main className="min-h-screen">
      {/* <Header /> */}
      <HeroSection {...heroData} />
      <AboutSection {...aboutData} />
      <VenturesSection ventures={featuredVentures} />
      <ServicesSection services={services.slice(0, 4)} />
      <InnovationEcosystemSection caseStudies={caseStudies.slice(0, 2)} />
      <ContactSection />
      <Footer />
      {process.env.NODE_ENV === "development" && (
        <button
          onClick={() => {
            // Find the AdminLoginModal component and open it
            const event = new KeyboardEvent("keydown", {
              key: "a",
              ctrlKey: true,
              shiftKey: true,
              bubbles: true,
            })
            document.dispatchEvent(event)
          }}
          className="fixed bottom-4 right-4 bg-gray-200 p-2 text-xs rounded opacity-50 hover:opacity-100"
        >
          Admin Login (Dev Only)
        </button>
      )}
    </main>
  )
}
