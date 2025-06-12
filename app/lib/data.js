export async function getService(slug) {
  const services = {
    "web-development": {
      slug: "web-development",
      title: "Web Development",
      description: "Custom web applications built with modern technologies",
      longDescription:
        "We create powerful, scalable web applications using cutting-edge technologies like React, Next.js, and Node.js. Our team delivers responsive, user-friendly websites that drive business growth.",
      features: [
        "Responsive Design",
        "Modern Framework Integration",
        "SEO Optimization",
        "Performance Optimization",
        "Cross-browser Compatibility",
        "API Integration",
        "Content Management Systems",
        "E-commerce Solutions",
        "Progressive Web Apps",
        "Database Design",
        "Security Implementation",
        "Testing & Quality Assurance",
      ],
      benefits: [
        "Increased Online Presence",
        "Better User Experience",
        "Higher Conversion Rates",
        "Improved Search Rankings",
      ],
      process: [
        { step: "Discovery", description: "Understanding your requirements and goals" },
        { step: "Design", description: "Creating wireframes and visual designs" },
        { step: "Development", description: "Building your application with best practices" },
        { step: "Launch", description: "Deploying and monitoring your website" },
      ],
      pricing: [
        {
          plan: "Starter",
          price: "$2,999",
          features: ["5 Pages", "Responsive Design", "Basic SEO", "3 Months Support"],
        },
        {
          plan: "Professional",
          price: "$5,999",
          features: ["10 Pages", "Custom Design", "Advanced SEO", "CMS Integration", "6 Months Support"],
        },
        {
          plan: "Enterprise",
          price: "$12,999",
          features: ["Unlimited Pages", "Custom Features", "E-commerce", "API Integration", "12 Months Support"],
        },
      ],
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "CEO",
          company: "TechStart Inc",
          content:
            "Connected delivered an amazing website that exceeded our expectations. The team was professional and responsive throughout the project.",
          rating: 5,
        },
        {
          name: "Mike Chen",
          role: "Marketing Director",
          company: "GrowthCorp",
          content:
            "Our new website has significantly improved our online presence and lead generation. Highly recommended!",
          rating: 5,
        },
      ],
      caseStudies: [
        {
          title: "E-commerce Platform for Fashion Brand",
          description: "Built a complete e-commerce solution with inventory management and payment processing.",
          image: "/ecommerce-fashion-website.png",
          results: [
            "300% increase in online sales",
            "50% reduction in cart abandonment",
            "Mobile-first responsive design",
          ],
        },
        {
          title: "SaaS Dashboard for Analytics Company",
          description: "Developed a comprehensive dashboard with real-time data visualization and reporting.",
          image: "/placeholder-xftac.png",
          results: ["Real-time data processing", "Interactive charts and graphs", "User role management"],
        },
      ],
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Vercel", "Tailwind CSS"],
      timeline: "4-8 weeks",
      teamSize: "3-5 developers",
    },
    "mobile-app-development": {
      slug: "mobile-app-development",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications",
      longDescription:
        "We develop high-performance mobile applications for iOS and Android platforms using React Native, Flutter, and native technologies. Our apps are designed for optimal user experience and performance.",
      features: [
        "Cross-platform Development",
        "Native Performance",
        "Push Notifications",
        "Offline Functionality",
        "App Store Optimization",
        "In-app Purchases",
        "Social Media Integration",
        "Analytics Integration",
        "Cloud Synchronization",
        "Biometric Authentication",
        "Real-time Features",
        "Custom UI/UX Design",
      ],
      benefits: ["Reach Mobile Users", "Increase Engagement", "Generate Revenue", "Build Brand Loyalty"],
      process: [
        { step: "Strategy", description: "Defining app concept and user journey" },
        { step: "Design", description: "Creating intuitive mobile interfaces" },
        { step: "Development", description: "Building native or cross-platform apps" },
        { step: "Testing", description: "Quality assurance and app store submission" },
      ],
      pricing: [
        {
          plan: "Basic App",
          price: "$8,999",
          features: ["Single Platform", "Basic Features", "App Store Submission", "3 Months Support"],
        },
        {
          plan: "Cross-Platform",
          price: "$15,999",
          features: ["iOS & Android", "Advanced Features", "Push Notifications", "6 Months Support"],
        },
        {
          plan: "Enterprise App",
          price: "$25,999",
          features: ["Custom Features", "Backend Integration", "Analytics", "Ongoing Maintenance"],
        },
      ],
      testimonials: [
        {
          name: "David Wilson",
          role: "Founder",
          company: "FitTrack",
          content: "Our fitness app has gained over 100k downloads thanks to Connected's excellent development work.",
          rating: 5,
        },
      ],
      caseStudies: [
        {
          title: "Fitness Tracking App",
          description: "Comprehensive fitness app with workout tracking, nutrition logging, and social features.",
          image: "/fitness-tracking-app.png",
          results: ["100k+ downloads", "4.8 app store rating", "Featured in App Store"],
        },
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "AWS Amplify"],
      timeline: "8-16 weeks",
      teamSize: "4-6 developers",
    },
    "ui-ux-design": {
      slug: "ui-ux-design",
      title: "UI/UX Design",
      description: "User-centered design for digital products",
      longDescription:
        "We create intuitive, beautiful user interfaces and experiences that delight users and drive business results. Our design process is research-driven and user-centered.",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Visual Design",
        "Interaction Design",
        "Usability Testing",
        "Design Systems",
        "Accessibility Design",
        "Mobile-first Design",
        "Brand Integration",
        "Animation Design",
        "Design Documentation",
      ],
      benefits: [
        "Better User Experience",
        "Higher Conversion Rates",
        "Reduced Development Costs",
        "Stronger Brand Identity",
      ],
      process: [
        { step: "Research", description: "Understanding users and business goals" },
        { step: "Ideation", description: "Brainstorming and concept development" },
        { step: "Design", description: "Creating high-fidelity designs and prototypes" },
        { step: "Testing", description: "Validating designs with real users" },
      ],
      pricing: [
        {
          plan: "Design Audit",
          price: "$1,999",
          features: ["UX Analysis", "Recommendations", "Action Plan", "Presentation"],
        },
        {
          plan: "Complete Redesign",
          price: "$4,999",
          features: ["User Research", "Wireframes", "Visual Design", "Prototype", "Design System"],
        },
        {
          plan: "Ongoing Design",
          price: "$8,999/month",
          features: ["Dedicated Designer", "Unlimited Revisions", "Design System", "Monthly Reviews"],
        },
      ],
      testimonials: [
        {
          name: "Lisa Park",
          role: "Product Manager",
          company: "InnovateTech",
          content: "The new design increased our conversion rate by 40%. The team really understood our users.",
          rating: 5,
        },
      ],
      caseStudies: [
        {
          title: "SaaS Platform Redesign",
          description: "Complete redesign of a B2B SaaS platform focusing on user onboarding and feature discovery.",
          image: "/saas-platform-ui.png",
          results: ["40% increase in conversion", "60% reduction in support tickets", "Improved user satisfaction"],
        },
      ],
      technologies: ["Figma", "Adobe Creative Suite", "Principle", "InVision", "Miro", "Hotjar"],
      timeline: "4-8 weeks",
      teamSize: "2-3 designers",
    },
    "digital-marketing": {
      slug: "digital-marketing",
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies",
      longDescription:
        "We help businesses grow their online presence through strategic digital marketing campaigns, SEO optimization, social media management, and paid advertising.",
      features: [
        "SEO Optimization",
        "Social Media Marketing",
        "Pay-Per-Click Advertising",
        "Content Marketing",
        "Email Marketing",
        "Analytics & Reporting",
        "Conversion Optimization",
        "Brand Strategy",
        "Influencer Marketing",
        "Marketing Automation",
        "Competitor Analysis",
        "Performance Tracking",
      ],
      benefits: ["Increased Brand Awareness", "Higher Website Traffic", "Better Lead Generation", "Improved ROI"],
      process: [
        { step: "Audit", description: "Analyzing current marketing performance" },
        { step: "Strategy", description: "Developing comprehensive marketing plan" },
        { step: "Execution", description: "Implementing campaigns across channels" },
        { step: "Optimization", description: "Continuous improvement and reporting" },
      ],
      pricing: [
        {
          plan: "Starter",
          price: "$2,999/month",
          features: ["SEO Optimization", "Social Media Management", "Monthly Reports", "Email Support"],
        },
        {
          plan: "Growth",
          price: "$5,999/month",
          features: ["All Starter Features", "PPC Campaigns", "Content Creation", "Weekly Reports"],
        },
        {
          plan: "Enterprise",
          price: "$9,999/month",
          features: ["All Growth Features", "Dedicated Manager", "Custom Strategy", "Daily Monitoring"],
        },
      ],
      testimonials: [
        {
          name: "Tom Rodriguez",
          role: "Marketing Director",
          company: "ScaleUp Co",
          content: "Our organic traffic increased by 200% in just 6 months. The ROI has been incredible.",
          rating: 5,
        },
      ],
      caseStudies: [
        {
          title: "E-commerce SEO Campaign",
          description: "Comprehensive SEO strategy for an online retailer resulting in significant organic growth.",
          image: "/seo-ecommerce-marketing.png",
          results: [
            "200% increase in organic traffic",
            "150% increase in online sales",
            "Top 3 rankings for key terms",
          ],
        },
      ],
      technologies: ["Google Analytics", "Google Ads", "Facebook Ads", "SEMrush", "Mailchimp", "HubSpot"],
      timeline: "3-6 months",
      teamSize: "3-4 specialists",
    },
  }

  return services[slug] || null
}

// Blog posts data
export const blogPosts = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2024",
    slug: "future-web-development-2024",
    excerpt: "Explore the latest trends shaping the future of web development, from AI integration to new frameworks.",
    content: "Web development is evolving rapidly, with new technologies and methodologies emerging every year...",
    author: "Sarah Johnson",
    authorRole: "Lead Developer",
    authorImage: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Web Development", "Technology", "Trends"],
    category: "Technology",
  },
  {
    id: "2",
    title: "Building Scalable Mobile Apps: Best Practices",
    slug: "scalable-mobile-apps-best-practices",
    excerpt: "Learn the essential practices for building mobile applications that can scale with your business growth.",
    content: "Building scalable mobile applications requires careful planning and implementation of best practices...",
    author: "Mike Chen",
    authorRole: "Mobile Developer",
    authorImage: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-10",
    readTime: "7 min read",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Mobile Development", "Scalability", "Best Practices"],
    category: "Development",
  },
  {
    id: "3",
    title: "UI/UX Design Principles for Better User Experience",
    slug: "ui-ux-design-principles",
    excerpt: "Discover the fundamental design principles that create exceptional user experiences.",
    content: "Great user experience is the foundation of successful digital products...",
    author: "Lisa Park",
    authorRole: "UX Designer",
    authorImage: "/placeholder.svg?height=40&width=40",
    publishedAt: "2024-01-05",
    readTime: "6 min read",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["UI/UX", "Design", "User Experience"],
    category: "Design",
  },
]

export async function getBlogPost(slug) {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return blogPosts.find((post) => post.slug === slug) || null
}

export async function getBlogPosts() {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return blogPosts
}

// Mock job data - in a real app, this would come from a database or API
const jobs = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    experience: "5+ years",
    posted: "2 days ago",
    description:
      "We're looking for a Senior Full Stack Developer to join our growing engineering team. You'll be responsible for building and maintaining our core platform, working with modern technologies, and mentoring junior developers.",
    responsibilities: [
      "Design and develop scalable web applications using React, Node.js, and TypeScript",
      "Collaborate with product managers and designers to implement new features",
      "Write clean, maintainable, and well-tested code",
      "Mentor junior developers and conduct code reviews",
      "Participate in architectural decisions and technical planning",
      "Optimize application performance and ensure security best practices",
    ],
    requirements: [
      "5+ years of experience in full-stack development",
      "Strong proficiency in React, Node.js, and TypeScript",
      "Experience with modern databases (PostgreSQL, MongoDB)",
      "Knowledge of cloud platforms (AWS, GCP, or Azure)",
      "Experience with CI/CD pipelines and DevOps practices",
      "Strong problem-solving skills and attention to detail",
      "Excellent communication and teamwork abilities",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements and remote options",
      "Professional development budget ($2,000/year)",
      "Unlimited PTO and flexible hours",
      "Top-tier equipment and home office setup",
      "Team retreats and company events",
    ],
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
  },
  {
    id: "2",
    title: "Product Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90k - $130k",
    experience: "3-5 years",
    posted: "1 week ago",
    description:
      "Join our marketing team as a Product Marketing Manager and help drive the go-to-market strategy for our innovative products. You'll work closely with product, sales, and marketing teams to position our solutions in the market.",
    responsibilities: [
      "Develop and execute go-to-market strategies for new product launches",
      "Create compelling product messaging and positioning",
      "Collaborate with sales team to develop sales enablement materials",
      "Conduct market research and competitive analysis",
      "Manage product marketing campaigns across multiple channels",
      "Analyze campaign performance and optimize for better results",
    ],
    requirements: [
      "3-5 years of product marketing experience, preferably in B2B SaaS",
      "Strong analytical skills and data-driven mindset",
      "Excellent written and verbal communication skills",
      "Experience with marketing automation tools (HubSpot, Marketo)",
      "Knowledge of digital marketing channels and tactics",
      "Bachelor's degree in Marketing, Business, or related field",
      "Ability to work in a fast-paced, collaborative environment",
    ],
    benefits: [
      "Competitive salary and performance bonuses",
      "Comprehensive health and wellness benefits",
      "Flexible work schedule and hybrid options",
      "Professional development opportunities",
      "Stock options and equity participation",
      "Modern office space in downtown NYC",
      "Catered lunches and team events",
    ],
    skills: ["Product Marketing", "B2B SaaS", "HubSpot", "Analytics", "Content Strategy", "Campaign Management"],
  },
  {
    id: "3",
    title: "Senior Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $170k",
    experience: "5+ years",
    posted: "3 days ago",
    description:
      "We're seeking a Senior Product Manager to lead the development of our core platform features. You'll work with engineering, design, and business stakeholders to define product strategy and drive execution.",
    responsibilities: [
      "Define product vision and strategy for key platform features",
      "Work with engineering teams to plan and prioritize development",
      "Conduct user research and gather customer feedback",
      "Create detailed product requirements and specifications",
      "Analyze product metrics and user behavior data",
      "Collaborate with design team on user experience improvements",
    ],
    requirements: [
      "5+ years of product management experience in B2B software",
      "Strong analytical and problem-solving skills",
      "Experience with agile development methodologies",
      "Proficiency in product management tools (Jira, Figma, Analytics)",
      "Excellent stakeholder management and communication skills",
      "Technical background or ability to work closely with engineers",
      "Customer-focused mindset with experience in user research",
    ],
    benefits: [
      "Competitive salary and equity package",
      "100% remote work with flexible hours",
      "Health, dental, and vision insurance",
      "Home office setup allowance ($1,500)",
      "Professional development budget",
      "Annual company retreat",
      "Unlimited PTO policy",
    ],
    skills: ["Product Strategy", "Agile", "User Research", "Analytics", "Jira", "Figma"],
  },
  {
    id: "4",
    title: "UX/UI Designer",
    department: "Design",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$80k - $120k",
    experience: "3-5 years",
    posted: "5 days ago",
    description:
      "Join our design team to create beautiful, intuitive user experiences for our products. You'll work on everything from user research to visual design, helping shape how users interact with our platform.",
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Collaborate with product managers and engineers",
      "Maintain and evolve our design system",
      "Present design concepts to stakeholders",
    ],
    requirements: [
      "3-5 years of UX/UI design experience",
      "Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)",
      "Strong portfolio demonstrating design process and outcomes",
      "Experience with user research and testing methodologies",
      "Understanding of front-end development principles",
      "Excellent visual design and typography skills",
      "Strong communication and presentation abilities",
    ],
    benefits: [
      "Competitive salary and creative freedom",
      "Health and wellness benefits",
      "Flexible work arrangements",
      "Design conference and workshop budget",
      "Latest design tools and equipment",
      "Collaborative studio environment",
      "Regular design team outings",
    ],
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Typography", "Usability Testing"],
  },
]

export async function getJob(id) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return jobs.find((job) => job.id === id) || null
}

export async function getJobs() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return jobs
}

export async function getJobsByDepartment(department) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return jobs.filter((job) => job.department.toLowerCase() === department.toLowerCase())
}
