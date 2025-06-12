import Header from "../components/header";
import Footer from "../components/footer";
import ContactSection from "../components/contact-section";

export const metadata = {
  title: "Contact Us | Connected",
  description: "Get in touch with Connected. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
