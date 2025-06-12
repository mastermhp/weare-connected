import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import JobCategoryFilter from "../components/careers/job-category-filter"
import JobLocationFilter from "../components/careers/job-location-filter"
import JobTypeFilter from "../components/careers/job-type-filter"
import Header from "../components/header"
import Footer from "../components/footer"
import JobCard from "../components/careers/job-card"

// Mock job data
const jobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    location: "Remote",
    type: "Full-time",
    experience: "3-5 years",
    posted: "2 days ago",
    department: "Engineering",
  },
  {
    id: "2",
    title: "UX/UI Designer",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "2-4 years",
    posted: "1 week ago",
    department: "Design",
  },
  {
    id: "3",
    title: "Product Manager",
    location: "New York, NY",
    type: "Full-time",
    experience: "4-6 years",
    posted: "3 days ago",
    department: "Product",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    location: "Remote",
    type: "Contract",
    experience: "3+ years",
    posted: "Just now",
    department: "Engineering",
  },
  {
    id: "5",
    title: "Marketing Specialist",
    location: "Austin, TX",
    type: "Part-time",
    experience: "1-3 years",
    posted: "5 days ago",
    department: "Marketing",
  },
]

export const metadata = {
  title: "Careers | Connected",
  description: "Join our team and be part of something extraordinary.",
}

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 font-syne">Let's Connected</h1>
              <p className="text-xl text-muted-foreground mb-8">
                We're looking for passionate individuals to help us build the future of technology and innovation.
              </p>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input placeholder="Search for positions..." className="pl-10 bg-background border-input" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        {/* <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-syne">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do and define our company culture.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We embrace new ideas and technologies to solve complex problems and create meaningful impact.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                <p className="text-muted-foreground">
                  We believe in the power of diverse perspectives and working together to achieve extraordinary results.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                    <path d="M10 9H8"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in everything we do, setting high standards and continuously improving.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Open Positions Section */}
        <section className="py-20 bg-lynx-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-syne">Open Positions</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Find your perfect role and join us in building the future.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <JobCategoryFilter />
              <JobLocationFilter />
              <JobTypeFilter />
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-syne">Why Work With Us</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We offer competitive benefits and a supportive work environment to help you thrive.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-lynx-white p-6 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary mb-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <h3 className="text-lg font-bold mb-2">Flexible Work</h3>
                <p className="text-muted-foreground">
                  Remote-first culture with flexible hours to help you maintain work-life balance.
                </p>
              </div>

              <div className="bg-lynx-white p-6 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary mb-4"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <h3 className="text-lg font-bold mb-2">Continuous Learning</h3>
                <p className="text-muted-foreground">
                  Professional development budget and regular learning opportunities.
                </p>
              </div>

              <div className="bg-lynx-white p-6 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary mb-4"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                <h3 className="text-lg font-bold mb-2">Health & Wellness</h3>
                <p className="text-muted-foreground">
                  Comprehensive health insurance and wellness programs for you and your family.
                </p>
              </div>

              <div className="bg-lynx-white p-6 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary mb-4"
                >
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <h3 className="text-lg font-bold mb-2">Competitive Compensation</h3>
                <p className="text-muted-foreground">
                  Attractive salary packages, equity options, and performance bonuses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 font-syne">Don't See the Right Fit?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in
              mind for future opportunities.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">Submit Your Resume</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
