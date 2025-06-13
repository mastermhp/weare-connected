import { notFound } from "next/navigation"

// import { getJob } from "@/lib/data"
import { getJobs } from "@/app/lib/data"
import { getJobBySlug } from "@/app/lib/data"
import JobContent from "@/app/components/jobs/job-content"

export async function generateStaticParams() {
  const jobs = await getJobs()

  return jobs.map((job) => ({
    id: job.slug.toString(),
  }))
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const job = await getJobBySlug(resolvedParams.id)
  if (!job) {
    return {
      title: "Job Not Found",
    }
  }
  return {
    title: job.title,
  }
}

async function JobPage({ params }) {
  const resolvedParams = await params
  const job = await getJobBySlug(resolvedParams.id)

  if (!job) {
    notFound()
  }

  return <JobContent job={job} />
}

export default JobPage
