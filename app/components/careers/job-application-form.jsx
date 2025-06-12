"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Loader2 } from "lucide-react"

export default function JobApplicationForm({ jobTitle }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    coverLetter: "",
    agreeToTerms: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Application submitted:", formData)
    setIsSubmitting(false)
    alert("Your application has been submitted! We'll be in touch soon.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="apply">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name *</Label>
        <Input id="fullName" name="fullName" required value={formData.fullName} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn Profile</Label>
        <Input
          id="linkedin"
          name="linkedin"
          placeholder="https://linkedin.com/in/yourprofile"
          value={formData.linkedin}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="resume">Resume/CV *</Label>
        <div className="border border-input rounded-md p-2">
          <label
            htmlFor="resume-upload"
            className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <Upload className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Upload PDF, DOCX (Max 5MB)</span>
            <input id="resume-upload" type="file" accept=".pdf,.docx" className="hidden" required />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverLetter">Cover Letter</Label>
        <Textarea
          id="coverLetter"
          name="coverLetter"
          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
          className="min-h-[120px]"
          value={formData.coverLetter}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="terms" checked={formData.agreeToTerms} onCheckedChange={handleCheckboxChange} required />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the privacy policy and terms of service
          </label>
          <p className="text-sm text-muted-foreground">Your data will be processed according to our privacy policy.</p>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          `Apply for ${jobTitle}`
        )}
      </Button>
    </form>
  )
}
