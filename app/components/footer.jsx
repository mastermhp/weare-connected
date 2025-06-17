"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Top Section: Prominent Logo Banner with Unique Background */}
      <div className="bg-slate-950/50 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-orange-500/20 to-purple-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/30 to-slate-950/60"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center relative z-10">
          <Link href="/" aria-label="Connected Home">
            <Image
              src="/whitelogo.png"
              alt="Connected Logo"
              width={384}
              height={64}
              className="h-auto w-48 sm:w-60 md:w-72 lg:w-80 xl:w-96 brightness-0 invert drop-shadow-2xl"
            />
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8">
        {/* Links and Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16 text-sm">
          <div>
            <h3 className="font-syne text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/ventures", label: "Ventures" },
                { href: "/careers", label: "Careers" },
                { href: "/blog", label: "Blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-purple-400 transition-colors text-sm sm:text-base">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-syne text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Resources</h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: "/press-kit", label: "Press Kit" },
                { href: "/case-studies", label: "Case Studies" },
                { href: "/help-center", label: "Help Center" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-purple-400 transition-colors text-sm sm:text-base">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="font-syne text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Connect</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">San Francisco, CA</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:hello@connected.com"
                  className="hover:text-purple-400 transition-colors text-sm sm:text-base"
                >
                  hello@connected.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <a href="tel:+14155550123" className="hover:text-purple-400 transition-colors text-sm sm:text-base">
                  +1 (415) 555-0123
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Social Links */}
        <div className="pt-6 sm:pt-8 border-t border-gray-700 flex flex-col md:flex-row-reverse justify-between items-center gap-4 sm:gap-6">
          <div className="flex space-x-4 sm:space-x-5">
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
                <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-x-6 text-gray-400 text-xs sm:text-sm text-center">
            <span>&copy; {new Date().getFullYear()} Connected.</span>
            <div className="flex gap-x-4 sm:gap-x-6 justify-center">
              <Link href="/privacy" className="hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
