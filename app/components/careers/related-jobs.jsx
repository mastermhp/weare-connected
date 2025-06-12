import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function RelatedJobs({ jobs }) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="border-b pb-4 last:border-0">
          <h4 className="font-bold mb-1">{job.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">
            {job.location} • {job.type}
          </p>
          <Button asChild variant="link" className="p-0 h-auto">
            <Link href={`/careers/${job.id}`}>
              View Position <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      ))}
    </div>
  )
}
