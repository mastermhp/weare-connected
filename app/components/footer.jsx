"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Top Section: Prominent Logo Banner */}
      <div className="bg-slate-950/50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Link href="/" aria-label="Connected Home">
            <Image
              src="/whiteLogo.png"
              alt="Connected Logo"
              width={384}
              height={64}
              className="object-cover h-full w-full"
            />
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Call to Action Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-syne text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Innovate?</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Let's discuss how Connected can help bring your bold ideas to life.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:opacity-90 text-white font-semibold px-8 py-3 rounded-lg group"
          >
            <Link href="/contact" className="flex items-center">
              Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Links and Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 md:mb-16 text-sm">
          <div>
            <h3 className="font-syne text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/ventures", label: "Ventures" },
                { href: "/careers", label: "Careers" },
                { href: "/blog", label: "Blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-purple-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-syne text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {[
                { href: "/press-kit", label: "Press Kit" },
                { href: "/case-studies", label: "Case Studies" },
                { href: "/help-center", label: "Help Center" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-purple-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-syne text-lg font-semibold text-white mb-4">Connect</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>San Francisco, CA</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                <a href="mailto:hello@connected.com" className="hover:text-purple-400 transition-colors">
                  hello@connected.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                <a href="tel:+14155550123" className="hover:text-purple-400 transition-colors">
                  +1 (415) 555-0123
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Social Links */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row-reverse justify-between items-center gap-6">
          <div className="flex space-x-5">
            {[
              { icon: Instagram, href: "https://instagram.com/connected", label: "Instagram" },
              { icon: Twitter, href: "https://twitter.com/connected", label: "Twitter" },
              { icon: Linkedin, href: "https://linkedin.com/company/connected", label: "LinkedIn" },
              { icon: Facebook, href: "https://facebook.com/connected", label: "Facebook" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <div className="flex gap-x-6 text-gray-400 text-sm">
            <span>&copy; {new Date().getFullYear()} Connected.</span>
            <Link href="/privacy" className="hover:text-purple-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-purple-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
