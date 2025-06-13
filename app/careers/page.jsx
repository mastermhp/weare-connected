import { getJobs } from "../lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, MapPin, Briefcase } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

export const metadata = {
  title: "Careers | Connected",
  description:
    "Join our team and help build the future of technology. Explore current job openings and opportunities at Connected.",
}

export default async function CareersPage() {
  // Fetch jobs data
  const jobs = await getJobs()

  // Group jobs by department
  const jobsByDepartment = jobs.reduce((acc, job) => {
    const department = job.department || "Other"
    if (!acc[department]) {
      acc[department] = []
    }
    acc[department].push(job)
    return acc
  }, {})

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-cyan-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Join Our Team</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  We're building the future of technology and we need passionate, talented people to help us make it
                  happen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Jobs Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            {Object.keys(jobsByDepartment).length > 0 ? (
              Object.entries(jobsByDepartment).map(([department, departmentJobs]) => (
                <div key={department} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">{department}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departmentJobs.map((job) => (
                      <Card key={job.id} className="h-full hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{job.type}</Badge>
                            <span className="text-sm text-muted-foreground">{job.posted}</span>
                          </div>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription>{job.description.substring(0, 100)}...</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                                <span>{job.experience}</span>
                              </div>
                            </div>
                            <Button asChild variant="outline" className="w-full">
                              <Link href={`/careers/${job.id}`}>
                                View Job <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No open positions at the moment. Check back soon for updates!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
