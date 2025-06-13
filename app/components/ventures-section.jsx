import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function VenturesSection({ ventures = [] }) {
  // If no ventures are provided, use fallback data
  const venturesList =
    ventures.length > 0
      ? ventures
      : [
          {
            slug: "techflow",
            name: "TechFlow",
            tagline: "Workflow automation reimagined",
            description:
              "A comprehensive SaaS platform that revolutionizes how teams manage workflows and automate repetitive tasks.",
            image: "/placeholder.svg?height=600&width=1200&text=TechFlow+Dashboard",
            logo: "/placeholder.svg?height=120&width=120&text=TF",
          },
          {
            slug: "designhub",
            name: "DesignHub",
            tagline: "Creative solutions for modern brands",
            description:
              "A full-service design agency specializing in brand identity, digital experiences, and creative campaigns.",
            image: "/placeholder.svg?height=600&width=1200&text=DesignHub+Portfolio",
            logo: "/placeholder.svg?height=120&width=120&text=DH",
          },
          {
            slug: "healthhub",
            name: "HealthHub",
            tagline: "Transforming patient care",
            description:
              "A digital health platform that connects patients, providers, and caregivers to improve healthcare outcomes.",
            image: "/placeholder.svg?height=600&width=1200&text=HealthHub+Platform",
            logo: "/placeholder.svg?height=120&width=120&text=HH",
          },
        ]

  return (
    <section id="ventures" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Ventures</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We build and invest in innovative companies that are transforming industries and creating meaningful impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venturesList.map((venture) => (
            <Link href={`/ventures/${venture.slug}`} key={venture.slug} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={venture.image || "/placeholder.svg?height=600&width=1200&text=Venture"}
                    alt={venture.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {venture.logo && (
                    <div className="absolute bottom-4 left-4 h-12 w-12 rounded-full bg-white shadow-md overflow-hidden">
                      <Image
                        src={venture.logo || "/placeholder.svg"}
                        alt={`${venture.name} logo`}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-1">{venture.name}</h3>
                  <p className="text-sm text-emerald-600 font-medium mb-3">{venture.tagline}</p>
                  <p className="text-gray-600 mb-4 flex-grow">{venture.description}</p>
                  <div className="flex items-center text-emerald-600 font-medium">
                    <span>Learn more</span>
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/ventures"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors"
          >
            View All Ventures
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
