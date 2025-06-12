"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setIsScrolled(window.scrollY > 20)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  if (!isMounted) {
    return null
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-black/5"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-10 w-48 transition-transform duration-300 group-hover:scale-105">
              <Image src="/logo.png" alt="Connected" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { href: "/about", label: "About" },
              { href: "/ventures", label: "Ventures" },
              { href: "/blog", label: "Blog" },
              { href: "/careers", label: "Careers" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all duration-300 group"
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden relative w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-300"
            onClick={toggleMenu}
          >
            <div className="relative w-6 h-6">
              <span
                className={cn(
                  "absolute block h-0.5 w-6 bg-gray-700 transition-all duration-300",
                  isMenuOpen ? "top-3 rotate-45" : "top-1",
                )}
              />
              <span
                className={cn(
                  "absolute block h-0.5 w-6 bg-gray-700 transition-all duration-300",
                  isMenuOpen ? "opacity-0" : "top-3",
                )}
              />
              <span
                className={cn(
                  "absolute block h-0.5 w-6 bg-gray-700 transition-all duration-300",
                  isMenuOpen ? "top-3 -rotate-45" : "top-5",
                )}
              />
            </div>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-20 z-40 transition-all duration-300",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={toggleMenu} />

        {/* Menu Panel */}
        <div
          className={cn(
            "relative bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-2xl transition-transform duration-300",
            isMenuOpen ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div className="container mx-auto px-6 py-8">
            <nav className="space-y-1">
              {[
                { href: "/about", label: "About" },
                { href: "/ventures", label: "Ventures" },
                { href: "/blog", label: "Blog" },
                { href: "/careers", label: "Careers" },
                { href: "/contact", label: "Contact" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-300 transform hover:translate-x-2"
                  onClick={toggleMenu}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/contact" onClick={toggleMenu}>
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
