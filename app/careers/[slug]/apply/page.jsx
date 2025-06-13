import { getJobBySlug } from "@/app/lib/data"
import { notFound } from "next/navigation"
import JobApplicationClient from "./JobApplicationClient"

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const job = await getJobBySlug(resolvedParams.slug)
  if (!job) {
    return {
      title: "Job Not Found",
    }
  }
  return {
    title: `Apply for ${job.title}`,
    description: `Submit your application for ${job.title} position`,
  }
}

async function JobApplicationPage({ params }) {
  const resolvedParams = await params
  const job = await getJobBySlug(resolvedParams.slug)

  if (!job) {
    notFound()
  }

  // Serialize the job data to remove MongoDB-specific objects
  const serializedJob = {
    id: job.id || job._id?.toString(),
    title: job.title || "",
    slug: job.slug || "",
    description: job.description || "",
    shortDescription: job.shortDescription || "",
    department: job.department || "",
    location: job.location || "",
    type: job.type || "",
    salary: job.salary || "",
    experienceLevel: job.experienceLevel || "",
    technologies: job.technologies || [],
    responsibilities: job.responsibilities || [],
    requirements: job.requirements || [],
    benefits: job.benefits || [],
    status: job.status || "open",
    createdAt: job.createdAt ? new Date(job.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: job.updatedAt ? new Date(job.updatedAt).toISOString() : new Date().toISOString(),
    postedDate: job.postedDate ? new Date(job.postedDate).toISOString() : new Date().toISOString(),
  }

  return <JobApplicationClient job={serializedJob} />
}

export default JobApplicationPage
