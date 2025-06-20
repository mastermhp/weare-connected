"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Plus, Save, Loader2 } from "lucide-react"
import { useToast } from "@/app/hooks/use-toast"
// import { useToast } from "@/hooks/use-toast"

export default function ContentManagement() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content/site")
      if (response.ok) {
        const data = await response.json()
        setContent(data)
      }
    } catch (error) {
      console.error("Error fetching content:", error)
      toast({
        title: "Error",
        description: "Failed to fetch content",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Content saved successfully",
        })
      } else {
        throw new Error("Failed to save content")
      }
    } catch (error) {
      console.error("Error saving content:", error)
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (path, value) => {
    setContent((prev) => {
      const newContent = { ...prev }
      const keys = path.split(".")
      let current = newContent

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return newContent
    })
  }

  const addStat = () => {
    const newStat = { value: "", label: "" }
    const currentStats = content?.homepage?.hero?.stats || []
    updateContent("homepage.hero.stats", [...currentStats, newStat])
  }

  const removeStat = (index) => {
    const currentStats = content?.homepage?.hero?.stats || []
    const newStats = currentStats.filter((_, i) => i !== index)
    updateContent("homepage.hero.stats", newStats)
  }

  const updateStat = (index, field, value) => {
    const currentStats = content?.homepage?.hero?.stats || []
    const newStats = [...currentStats]
    newStats[index] = { ...newStats[index], [field]: value }
    updateContent("homepage.hero.stats", newStats)
  }

  const addValue = () => {
    const newValue = { number: "", title: "", description: "" }
    const currentValues = content?.homepage?.about?.values || []
    updateContent("homepage.about.values", [...currentValues, newValue])
  }

  const removeValue = (index) => {
    const currentValues = content?.homepage?.about?.values || []
    const newValues = currentValues.filter((_, i) => i !== index)
    updateContent("homepage.about.values", newValues)
  }

  const updateValue = (index, field, value) => {
    const currentValues = content?.homepage?.about?.values || []
    const newValues = [...currentValues]
    newValues[index] = { ...newValues[index], [field]: value }
    updateContent("homepage.about.values", newValues)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Manage your website content across all pages</p>
        </div>
        <Button onClick={saveContent} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="homepage" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
          <TabsTrigger value="offices">Offices</TabsTrigger>
          <TabsTrigger value="contact">Contact Page</TabsTrigger>
        </TabsList>

        {/* Homepage Content */}
        <TabsContent value="homepage" className="space-y-6">
          {/* Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Title</Label>
                <Input
                  id="hero-title"
                  value={content?.homepage?.hero?.title || ""}
                  onChange={(e) => updateContent("homepage.hero.title", e.target.value)}
                  placeholder="Enter hero title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Subtitle</Label>
                <Textarea
                  id="hero-subtitle"
                  value={content?.homepage?.hero?.subtitle || ""}
                  onChange={(e) => updateContent("homepage.hero.subtitle", e.target.value)}
                  placeholder="Enter hero subtitle"
                  rows={3}
                />
              </div>

              {/* Hero Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Hero Statistics</Label>
                  <Button onClick={addStat} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Stat
                  </Button>
                </div>
                {content?.homepage?.hero?.stats?.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-2 p-4 border rounded-lg">
                    <Input
                      placeholder="Value (e.g., 5+)"
                      value={stat.value}
                      onChange={(e) => updateStat(index, "value", e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Label (e.g., Ventures Built)"
                      value={stat.label}
                      onChange={(e) => updateStat(index, "label", e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={() => removeStat(index)} size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-title">Title</Label>
                <Input
                  id="about-title"
                  value={content?.homepage?.about?.title || ""}
                  onChange={(e) => updateContent("homepage.about.title", e.target.value)}
                  placeholder="Enter about title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-description">Description</Label>
                <Textarea
                  id="about-description"
                  value={content?.homepage?.about?.description || ""}
                  onChange={(e) => updateContent("homepage.about.description", e.target.value)}
                  placeholder="Enter about description"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-vision">Vision</Label>
                <Textarea
                  id="about-vision"
                  value={content?.homepage?.about?.vision || ""}
                  onChange={(e) => updateContent("homepage.about.vision", e.target.value)}
                  placeholder="Enter company vision"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-mission">Mission</Label>
                <Textarea
                  id="about-mission"
                  value={content?.homepage?.about?.mission || ""}
                  onChange={(e) => updateContent("homepage.about.mission", e.target.value)}
                  placeholder="Enter company mission"
                  rows={3}
                />
              </div>

              {/* Company Values */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Company Values</Label>
                  <Button onClick={addValue} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Value
                  </Button>
                </div>
                {content?.homepage?.about?.values?.map((value, index) => (
                  <div key={index} className="space-y-2 p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Number (e.g., 01)"
                        value={value.number}
                        onChange={(e) => updateValue(index, "number", e.target.value)}
                        className="w-20"
                      />
                      <Input
                        placeholder="Title (e.g., Innovation)"
                        value={value.title}
                        onChange={(e) => updateValue(index, "title", e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => removeValue(index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Description"
                      value={value.description}
                      onChange={(e) => updateValue(index, "description", e.target.value)}
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ventures Section */}
          <Card>
            <CardHeader>
              <CardTitle>Ventures Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ventures-title">Title</Label>
                <Input
                  id="ventures-title"
                  value={content?.homepage?.ventures?.title || ""}
                  onChange={(e) => updateContent("homepage.ventures.title", e.target.value)}
                  placeholder="Enter ventures title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ventures-subtitle">Subtitle</Label>
                <Textarea
                  id="ventures-subtitle"
                  value={content?.homepage?.ventures?.subtitle || ""}
                  onChange={(e) => updateContent("homepage.ventures.subtitle", e.target.value)}
                  placeholder="Enter ventures subtitle"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-title">Title</Label>
                <Input
                  id="contact-title"
                  value={content?.homepage?.contact?.title || ""}
                  onChange={(e) => updateContent("homepage.contact.title", e.target.value)}
                  placeholder="Enter contact title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-description">Description</Label>
                <Textarea
                  id="contact-description"
                  value={content?.homepage?.contact?.description || ""}
                  onChange={(e) => updateContent("homepage.contact.description", e.target.value)}
                  placeholder="Enter contact description"
                  rows={3}
                />
              </div>

              {/* Office Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="office-address">Office Address</Label>
                  <Input
                    id="office-address"
                    value={content?.homepage?.contact?.office?.address || ""}
                    onChange={(e) => updateContent("homepage.contact.office.address", e.target.value)}
                    placeholder="Enter office address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office-city">City</Label>
                  <Input
                    id="office-city"
                    value={content?.homepage?.contact?.office?.city || ""}
                    onChange={(e) => updateContent("homepage.contact.office.city", e.target.value)}
                    placeholder="Enter city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office-country">Country</Label>
                  <Input
                    id="office-country"
                    value={content?.homepage?.contact?.office?.country || ""}
                    onChange={(e) => updateContent("homepage.contact.office.country", e.target.value)}
                    placeholder="Enter country"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input
                    id="contact-phone"
                    value={content?.homepage?.contact?.phone || ""}
                    onChange={(e) => updateContent("homepage.contact.phone", e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {/* Email Addresses */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-general">General Email</Label>
                  <Input
                    id="email-general"
                    value={content?.homepage?.contact?.emails?.general || ""}
                    onChange={(e) => updateContent("homepage.contact.emails.general", e.target.value)}
                    placeholder="Enter general email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-business">Business Email</Label>
                  <Input
                    id="email-business"
                    value={content?.homepage?.contact?.emails?.business || ""}
                    onChange={(e) => updateContent("homepage.contact.emails.business", e.target.value)}
                    placeholder="Enter business email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-careers">Careers Email</Label>
                  <Input
                    id="email-careers"
                    value={content?.homepage?.contact?.emails?.careers || ""}
                    onChange={(e) => updateContent("homepage.contact.emails.careers", e.target.value)}
                    placeholder="Enter careers email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-hours">Business Hours</Label>
                <Input
                  id="contact-hours"
                  value={content?.homepage?.contact?.hours || ""}
                  onChange={(e) => updateContent("homepage.contact.hours", e.target.value)}
                  placeholder="Enter business hours"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Page Content */}
        <TabsContent value="about" className="space-y-6">
          {/* About Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>About Page Hero</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-hero-title">Title</Label>
                <Input
                  id="about-hero-title"
                  value={content?.about?.hero?.title || ""}
                  onChange={(e) => updateContent("about.hero.title", e.target.value)}
                  placeholder="Enter about page title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-hero-subtitle">Subtitle</Label>
                <Textarea
                  id="about-hero-subtitle"
                  value={content?.about?.hero?.subtitle || ""}
                  onChange={(e) => updateContent("about.hero.subtitle", e.target.value)}
                  placeholder="Enter about page subtitle"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* About Story Section */}
          <Card>
            <CardHeader>
              <CardTitle>Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="story-title">Story Title</Label>
                <Input
                  id="story-title"
                  value={content?.about?.story?.title || ""}
                  onChange={(e) => updateContent("about.story.title", e.target.value)}
                  placeholder="Enter story title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="story-content">Story Content</Label>
                <Textarea
                  id="story-content"
                  value={content?.about?.story?.content || ""}
                  onChange={(e) => updateContent("about.story.content", e.target.value)}
                  placeholder="Enter your company story"
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>

          {/* Team Section */}
          <Card>
            <CardHeader>
              <CardTitle>Team Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="team-title">Team Title</Label>
                <Input
                  id="team-title"
                  value={content?.about?.team?.title || ""}
                  onChange={(e) => updateContent("about.team.title", e.target.value)}
                  placeholder="Enter team section title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-subtitle">Team Subtitle</Label>
                <Input
                  id="team-subtitle"
                  value={content?.about?.team?.subtitle || ""}
                  onChange={(e) => updateContent("about.team.subtitle", e.target.value)}
                  placeholder="Enter team section subtitle"
                />
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Team members are managed separately in the Team Management section. This
                  section only controls the team section title and subtitle.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Offices Content */}
        <TabsContent value="offices" className="space-y-6">
          {/* Offices Section */}
          <Card>
            <CardHeader>
              <CardTitle>Offices Gallery Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="offices-title">Section Title</Label>
                <Input
                  id="offices-title"
                  value={content?.offices?.title || ""}
                  onChange={(e) => updateContent("offices.title", e.target.value)}
                  placeholder="Enter offices section title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="offices-subtitle">Section Subtitle</Label>
                <Textarea
                  id="offices-subtitle"
                  value={content?.offices?.subtitle || ""}
                  onChange={(e) => updateContent("offices.subtitle", e.target.value)}
                  placeholder="Enter offices section subtitle"
                  rows={2}
                />
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Individual office locations and galleries are managed in the Offices Management
                  section. This section only controls the main title and subtitle for the offices gallery section.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Page Content */}
        <TabsContent value="contact" className="space-y-6">
          {/* Contact Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Page Hero</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-hero-title">Title</Label>
                <Input
                  id="contact-hero-title"
                  value={content?.contact?.hero?.title || ""}
                  onChange={(e) => updateContent("contact.hero.title", e.target.value)}
                  placeholder="Enter contact page title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-hero-subtitle">Subtitle</Label>
                <Textarea
                  id="contact-hero-subtitle"
                  value={content?.contact?.hero?.subtitle || ""}
                  onChange={(e) => updateContent("contact.hero.subtitle", e.target.value)}
                  placeholder="Enter contact page subtitle"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
