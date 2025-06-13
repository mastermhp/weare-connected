import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ServicesSection({ services = [] }) {
  // If no services are provided, use fallback data
  const servicesList =
    services.length > 0
      ? services
      : [
          {
            slug: "web-development",
            title: "Web Development",
            description: "Custom web applications built with modern technologies",
          },
          {
            slug: "mobile-app-development",
            title: "Mobile App Development",
            description: "Native and cross-platform mobile applications",
          },
          {
            slug: "product-strategy",
            title: "Product Strategy",
            description: "Strategic planning and roadmapping for digital products",
          },
          {
            slug: "venture-building",
            title: "Venture Building",
            description: "End-to-end support for launching new ventures",
          },
        ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of services to help businesses innovate, grow, and transform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug} className="group">
              <div className="bg-white rounded-lg p-8 shadow-md transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                <div className="flex items-center text-emerald-600 font-medium">
                  <span>Learn more</span>
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-medium rounded-md hover:bg-emerald-50 transition-colors"
          >
            View All Services
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
