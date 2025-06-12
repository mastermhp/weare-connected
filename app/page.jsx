import Header from "./components/header"
import HeroSection from "./components/hero-section"
import AboutSection from "./components/about-section"
import VenturesSection from "./components/ventures-section"
import InnovationEcosystemSection from "./components/innovation-ecosystem-section"
import ContactSection from "./components/contact-section"
import Footer from "./components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <VenturesSection />
      <InnovationEcosystemSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
