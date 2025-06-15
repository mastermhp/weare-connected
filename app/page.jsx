"use client"
import { useState, useEffect } from "react"
import HeroSection from "./components/hero-section"
import AboutSection from "./components/about-section"
import VenturesSection from "./components/ventures-section"
import ServicesSection from "./components/services-section"
import InnovationEcosystemSection from "./components/innovation-ecosystem-section"
import ContactSection from "./components/contact-section"
import Footer from "./components/footer"
import Header from "./components/header"

export default function Home() {
  const [data, setData] = useState({
    heroData: {
      title: "Building the Future of Technology",
      subtitle: "We create, invest in, and scale innovative ventures that solve meaningful problems.",
      stats: [
        { value: "50+", label: "Ventures Launched" },
        { value: "$100M+", label: "Capital Raised" },
        { value: "500+", label: "Jobs Created" },
        { value: "12", label: "Countries" },
      ],
    },
    aboutData: {
      title: "About Connected",
      description:
        "Connected is a venture studio that builds, invests in, and scales technology companies. We combine capital, talent, and expertise to create ventures that solve meaningful problems and generate exceptional returns.",
      metrics: [
        { value: "2018", label: "Founded" },
        { value: "85+", label: "Team Members" },
        { value: "3", label: "Global Offices" },
      ],
    },
    featuredVentures: [],
    services: [],
    caseStudies: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/homepage")
        if (!response.ok) {
          throw new Error("Failed to fetch homepage data")
        }
        const homepageData = await response.json()
        setData(homepageData)
      } catch (error) {
        console.error("Error fetching homepage data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="relative min-h-screen">
      <Header/>
      <HeroSection {...data.heroData} />
      <AboutSection {...data.aboutData} />
      <VenturesSection ventures={data.featuredVentures} />
      <ServicesSection services={data.services} />
      <InnovationEcosystemSection caseStudies={data.caseStudies} />
      <ContactSection />
      <Footer />
      {/* {process.env.NODE_ENV === "development" && (
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
      )} */}
    </main>
  )
}
