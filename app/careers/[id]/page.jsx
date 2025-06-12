import { notFound } from "next/navigation"

// import { getJob } from "@/lib/data"
import { getJobs } from "@/app/lib/data"
import { getJob } from "@/app/lib/data"
import JobContent from "@/app/components/jobs/job-content"

export async function generateStaticParams() {
  const jobs = await getJobs()

  return jobs.map((job) => ({
    id: job.id.toString(),
  }))
}

export async function generateMetadata({ params }) {
  const job = await getJob(params.id)
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
  const job = await getJob(params.id)

  if (!job) {
    notFound()
  }

  return <JobContent job={job} />
}

export default JobPage
